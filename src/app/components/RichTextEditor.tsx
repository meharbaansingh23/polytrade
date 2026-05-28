import { useRef, useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableHeader } from '@tiptap/extension-table-header';
import { TableCell } from '@tiptap/extension-table-cell';
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  List, ListOrdered,
  AlignLeft, AlignCenter, AlignRight,
  Link2, ImageIcon, Table2,
  Undo2, Redo2, Loader2,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import './RichTextEditor.css';

interface RichTextEditorProps {
  defaultContent?: string;
  onChange: (html: string) => void;
}

function Sep() {
  return <div className="w-px h-5 bg-[#F0F0F0] mx-0.5 shrink-0" />;
}

function Btn({
  onClick,
  active = false,
  disabled = false,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onMouseDown={e => { e.preventDefault(); if (!disabled) onClick(); }}
      title={title}
      disabled={disabled}
      className="w-8 h-8 flex items-center justify-center rounded-[6px] border-0 cursor-pointer transition-colors text-[13px] font-[700] shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
      style={{
        background: active ? '#FFF0EB' : 'transparent',
        color: active ? '#FF4C00' : '#1D1D1D',
      }}
      onMouseEnter={e => {
        if (!active && !disabled) e.currentTarget.style.background = '#FAFAFA';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = active ? '#FFF0EB' : 'transparent';
      }}
    >
      {children}
    </button>
  );
}

const TABLE_MENU_ITEMS = [
  { label: 'Insert Table',      action: (e: any) => e.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run() },
  { label: 'Add Row Above',     action: (e: any) => e.chain().focus().addRowBefore().run() },
  { label: 'Add Row Below',     action: (e: any) => e.chain().focus().addRowAfter().run() },
  { label: 'Add Column Left',   action: (e: any) => e.chain().focus().addColumnBefore().run() },
  { label: 'Add Column Right',  action: (e: any) => e.chain().focus().addColumnAfter().run() },
  null, // divider
  { label: 'Delete Row',        action: (e: any) => e.chain().focus().deleteRow().run() },
  { label: 'Delete Column',     action: (e: any) => e.chain().focus().deleteColumn().run() },
  { label: 'Delete Table',      action: (e: any) => e.chain().focus().deleteTable().run() },
];

export function RichTextEditor({ defaultContent = '', onChange }: RichTextEditorProps) {
  // Image upload
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [imageUploading, setImageUploading] = useState(false);

  // Table dropdown
  const [showTableMenu, setShowTableMenu] = useState(false);
  const tableMenuRef = useRef<HTMLDivElement>(null);

  // Link popover
  const [showLinkPopover, setShowLinkPopover] = useState(false);
  const [linkInputUrl, setLinkInputUrl] = useState('');
  const linkContainerRef = useRef<HTMLDivElement>(null);

  // Close table menu on outside click
  useEffect(() => {
    if (!showTableMenu) return;
    const handler = (e: MouseEvent) => {
      if (tableMenuRef.current && !tableMenuRef.current.contains(e.target as Node)) {
        setShowTableMenu(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showTableMenu]);

  // Close link popover on outside click
  useEffect(() => {
    if (!showLinkPopover) return;
    const handler = (e: MouseEvent) => {
      if (linkContainerRef.current && !linkContainerRef.current.contains(e.target as Node)) {
        setShowLinkPopover(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showLinkPopover]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Image.configure({ inline: false, allowBase64: false }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          rel: 'noopener noreferrer',
          target: '_blank',
          class: 'tiptap-link',
        },
      }),
      Placeholder.configure({ placeholder: 'Write your post here…' }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Table.configure({ resizable: false }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: defaultContent,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: { class: 'tiptap-editor' },
    },
  });

  if (!editor) return null;

  // ── Image upload ──────────────────────────────────────────────────────────
  const handleImageFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { alert('Image must be under 5 MB'); return; }

    setImageUploading(true);
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    const { data, error } = await supabase.storage
      .from('blog-images')
      .upload(fileName, file, { cacheControl: '3600', upsert: false });

    if (error || !data) {
      alert('Image upload failed, try again');
      setImageUploading(false);
      if (imageInputRef.current) imageInputRef.current.value = '';
      return;
    }
    const { data: urlData } = supabase.storage.from('blog-images').getPublicUrl(data.path);
    editor.chain().focus().setImage({ src: urlData.publicUrl }).run();
    setImageUploading(false);
    if (imageInputRef.current) imageInputRef.current.value = '';
  };

  // ── Link popover ──────────────────────────────────────────────────────────
  const openLinkPopover = () => {
    const existing = editor.getAttributes('link').href as string || '';
    setLinkInputUrl(existing);
    setShowLinkPopover(v => !v);
  };

  const applyLink = () => {
    if (!linkInputUrl.trim()) {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
    } else {
      editor.chain().focus().extendMarkRange('link')
        .setLink({ href: linkInputUrl.trim(), target: '_blank' })
        .run();
    }
    setShowLinkPopover(false);
  };

  const removeLink = () => {
    editor.chain().focus().extendMarkRange('link').unsetLink().run();
    setShowLinkPopover(false);
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div>
      {/* Hidden file input for inline image upload */}
      <input
        ref={imageInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        className="hidden"
        onChange={handleImageFileSelect}
      />

      <div className="rounded-[12px] overflow-visible" style={{ border: '1px solid #F0F0F0' }}>
        {/* Toolbar */}
        <div
          className="flex flex-wrap items-center gap-0.5 px-2 py-2"
          style={{ background: '#fff', borderBottom: '1px solid #F0F0F0', borderRadius: '12px 12px 0 0' }}
        >
          <Btn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Bold">
            <Bold className="w-3.5 h-3.5" />
          </Btn>
          <Btn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Italic">
            <Italic className="w-3.5 h-3.5" />
          </Btn>
          <Btn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')} title="Underline">
            <UnderlineIcon className="w-3.5 h-3.5" />
          </Btn>
          <Btn onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive('strike')} title="Strikethrough">
            <Strikethrough className="w-3.5 h-3.5" />
          </Btn>

          <Sep />

          {([1, 2, 3] as const).map(level => (
            <Btn
              key={level}
              onClick={() => editor.chain().focus().toggleHeading({ level }).run()}
              active={editor.isActive('heading', { level })}
              title={`Heading ${level}`}
            >
              H{level}
            </Btn>
          ))}

          <Sep />

          <Btn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Bullet List">
            <List className="w-3.5 h-3.5" />
          </Btn>
          <Btn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Numbered List">
            <ListOrdered className="w-3.5 h-3.5" />
          </Btn>

          <Sep />

          <Btn onClick={() => editor.chain().focus().setTextAlign('left').run()} active={editor.isActive({ textAlign: 'left' })} title="Align Left">
            <AlignLeft className="w-3.5 h-3.5" />
          </Btn>
          <Btn onClick={() => editor.chain().focus().setTextAlign('center').run()} active={editor.isActive({ textAlign: 'center' })} title="Align Center">
            <AlignCenter className="w-3.5 h-3.5" />
          </Btn>
          <Btn onClick={() => editor.chain().focus().setTextAlign('right').run()} active={editor.isActive({ textAlign: 'right' })} title="Align Right">
            <AlignRight className="w-3.5 h-3.5" />
          </Btn>

          <Sep />

          {/* Link button with inline popover */}
          <div className="relative" ref={linkContainerRef}>
            <Btn onClick={openLinkPopover} active={editor.isActive('link') || showLinkPopover} title="Link">
              <Link2 className="w-3.5 h-3.5" />
            </Btn>
            {showLinkPopover && (
              <div
                className="absolute top-10 left-0 z-[200] bg-white rounded-[10px] p-3 flex flex-col gap-2"
                style={{
                  border: '1px solid #F0F0F0',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                  minWidth: '260px',
                }}
              >
                <input
                  type="url"
                  value={linkInputUrl}
                  onChange={e => setLinkInputUrl(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); applyLink(); } if (e.key === 'Escape') setShowLinkPopover(false); }}
                  placeholder="https://..."
                  autoFocus
                  className="h-9 w-full bg-[#FAFAFA] border border-[#F0F0F0] rounded-[6px] px-3 text-[13px] text-[#1D1D1D] focus:outline-none focus:border-[#FF4C00] transition-all"
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onMouseDown={e => { e.preventDefault(); applyLink(); }}
                    className="flex-1 h-8 bg-[#FF4C00] text-white rounded-[6px] border-0 cursor-pointer text-[12px] font-[600] hover:bg-[#E64400] transition-colors"
                  >
                    Apply
                  </button>
                  <button
                    type="button"
                    onMouseDown={e => { e.preventDefault(); removeLink(); }}
                    className="flex-1 h-8 bg-white border border-[#F0F0F0] text-[#DC2626] rounded-[6px] cursor-pointer text-[12px] font-[600] hover:bg-[#FEF2F2] transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Image upload button */}
          <Btn
            onClick={() => !imageUploading && imageInputRef.current?.click()}
            active={false}
            disabled={imageUploading}
            title="Insert Image"
          >
            {imageUploading
              ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
              : <ImageIcon className="w-3.5 h-3.5" />
            }
          </Btn>

          <Sep />

          {/* Table button with dropdown */}
          <div className="relative" ref={tableMenuRef}>
            <Btn
              onClick={() => setShowTableMenu(v => !v)}
              active={editor.isActive('table') || showTableMenu}
              title="Table"
            >
              <Table2 className="w-3.5 h-3.5" />
            </Btn>
            {showTableMenu && (
              <div
                className="absolute top-10 left-0 z-[200] bg-white rounded-[10px] py-1"
                style={{
                  border: '1px solid #F0F0F0',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                  minWidth: '180px',
                }}
              >
                {TABLE_MENU_ITEMS.map((item, i) =>
                  item === null ? (
                    <div key={i} style={{ height: '1px', background: '#F0F0F0', margin: '4px 0' }} />
                  ) : (
                    <button
                      key={item.label}
                      type="button"
                      onMouseDown={e => {
                        e.preventDefault();
                        item.action(editor);
                        setShowTableMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 text-[13px] text-[#1D1D1D] bg-transparent border-0 cursor-pointer hover:bg-[#FFF0EB] hover:text-[#FF4C00] transition-colors"
                    >
                      {item.label}
                    </button>
                  )
                )}
              </div>
            )}
          </div>

          <Sep />

          <Btn onClick={() => editor.chain().focus().undo().run()} active={false} title="Undo">
            <Undo2 className="w-3.5 h-3.5" />
          </Btn>
          <Btn onClick={() => editor.chain().focus().redo().run()} active={false} title="Redo">
            <Redo2 className="w-3.5 h-3.5" />
          </Btn>
        </div>

        {/* Editor area */}
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
