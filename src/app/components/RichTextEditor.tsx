import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  List, ListOrdered,
  AlignLeft, AlignCenter, AlignRight,
  Link2, ImageIcon,
  Undo2, Redo2,
} from 'lucide-react';
import './RichTextEditor.css';

interface RichTextEditorProps {
  defaultContent?: string;
  onChange: (html: string) => void;
}

function Sep() {
  return <div className="w-px h-5 bg-[#F0F0F0] mx-0.5" />;
}

function Btn({
  onClick,
  active = false,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onMouseDown={e => { e.preventDefault(); onClick(); }}
      title={title}
      className="w-8 h-8 flex items-center justify-center rounded-[6px] border-0 cursor-pointer transition-colors text-[13px] font-[700] shrink-0"
      style={{
        background: active ? '#FFF0EB' : 'transparent',
        color: active ? '#FF4C00' : '#1D1D1D',
      }}
      onMouseEnter={e => {
        if (!active) e.currentTarget.style.background = '#FAFAFA';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = active ? '#FFF0EB' : 'transparent';
      }}
    >
      {children}
    </button>
  );
}

export function RichTextEditor({ defaultContent = '', onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Image.configure({ inline: false, allowBase64: false }),
      Link.configure({ openOnClick: false, HTMLAttributes: { rel: 'noopener noreferrer' } }),
      Placeholder.configure({ placeholder: 'Write your post here…' }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: defaultContent,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'tiptap-editor',
      },
    },
  });

  if (!editor) return null;

  const setLink = () => {
    const prev = editor.getAttributes('link').href as string | undefined;
    const url = window.prompt('Enter link URL:', prev || 'https://');
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  const addImage = () => {
    const url = window.prompt('Enter image URL:', 'https://');
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  return (
    <div
      className="rounded-[12px] overflow-hidden"
      style={{ border: '1px solid #F0F0F0' }}
    >
      {/* Toolbar */}
      <div
        className="flex flex-wrap items-center gap-0.5 px-2 py-2"
        style={{ background: '#fff', borderBottom: '1px solid #F0F0F0' }}
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

        <Btn onClick={setLink} active={editor.isActive('link')} title="Link">
          <Link2 className="w-3.5 h-3.5" />
        </Btn>
        <Btn onClick={addImage} active={false} title="Insert Image">
          <ImageIcon className="w-3.5 h-3.5" />
        </Btn>

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
  );
}
