This is looking much better already — the typography hierarchy, category labels, and card structure are solid. Now let's completely reinvent the visual identity. Light theme, purple, background texture. Here's the full new prompt:

POLYTRADE — Full Visual Rebrand | Light Theme | Purple Accent
You are redesigning Polytrade from scratch with a completely new visual identity. Throw away the dark theme entirely. This is a light, airy, premium fintech platform — think Stripe meets Robinhood meets a modern African/Asian consumer app. Warm whites, deep purple accents, subtle background texture. World-class design.

TYPOGRAPHY
Font: Inter Tight exclusively.

Hero H1: 64px, weight 900, letter-spacing -3px, color #0D0D1A
H2 section headers: 28px, weight 800, letter-spacing -1px
Card titles: 15px, weight 650, letter-spacing -0.3px
Prices: tabular-nums, weight 800
Labels/meta: 11px, weight 600, letter-spacing 1.5px, uppercase
Body: 14px, weight 400, line-height 1.6


NEW COLOR SYSTEM — Light Purple Theme
Page background: #F7F5FF (very light lavender-white, not pure white)
Surface white (cards): #FFFFFF
Surface elevated (modals): #FFFFFF
Surface tinted (inputs, hover): #F0EDFF
Border subtle: #E4DFF5
Border medium: #C9C0EC
Border active: #7C3AED
Primary purple: #7C3AED (deep violet-purple — Stripe/Brex energy)
Purple light: #EDE9FE (for pill backgrounds, tinted areas)
Purple dark: #5B21B6 (hover states, pressed)
Purple glow: rgba(124, 58, 237, 0.12)
YES color: #059669 (strong emerald green — confident, not neon)
YES bg: #ECFDF5
YES border: #6EE7B7
NO color: #DC2626 (strong red)
NO bg: #FEF2F2
NO border: #FCA5A5
Text primary: #0D0D1A (near black, warm)
Text secondary: #6B7280
Text tertiary: #9CA3AF
Text on purple: #FFFFFF
Success: #059669
Warning: #D97706
Error: #DC2626

BACKGROUND TEXTURE & VISUAL ELEMENTS
The page background (#F7F5FF) should have subtle visual depth:

Very faint dot grid pattern across the entire background (dots at 24px spacing, #DDD8F5, opacity 40%) — like Linear.app or Craft
Hero section: large soft purple radial gradient blob behind the headline, very low opacity (rgba(124,58,237,0.06)), roughly 800px diameter, centered
Two additional decorative blobs: one top-right corner (smaller, rgba(124,58,237,0.04)) and one bottom-left (rgba(59,130,246,0.04) — slight blue tint)
Cards cast a real but soft shadow: 0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)
Cards on hover: shadow lifts — 0 8px 32px rgba(124,58,237,0.12), transform translateY(-3px)


SCREEN 1 — HOME LOGGED OUT | 1440px desktop
Header — 68px, sticky, bg #FFFFFF, border-bottom 1px #E4DFF5, box-shadow 0 1px 0 #E4DFF5:

Far left: Polytrade logomark (small purple diamond/polygon geometric mark) + "Polytrade" wordmark Inter Tight 20px weight 800 color #0D0D1A
Far right — two buttons side by side with 12px gap:

"Log in" — Inter Tight 14px weight 600, color #6B7280, bg transparent, border 1px #E4DFF5, border-radius 8px, 36px height, 16px horizontal padding. Hover: border #C9C0EC, text #0D0D1A
"Sign up" — Inter Tight 14px weight 600, color #FFFFFF, bg #7C3AED, border-radius 8px, 36px height, 20px horizontal padding. Hover: bg #5B21B6. Subtle box-shadow: 0 2px 8px rgba(124,58,237,0.3)



Hero section — centered, max-width 840px, padding-top 96px, padding-bottom 56px:

Eyebrow pill above headline: small rounded pill, bg #EDE9FE, border 1px #C9C0EC, text "✦ Prediction Markets · Live Now" — Inter Tight 12px weight 600, color #7C3AED, padding 6px 14px, border-radius 100px
H1 (two lines): "Your local knowledge." / "Real money." — Inter Tight 64px weight 900, letter-spacing -3px, color #0D0D1A. "Real money." has a subtle purple underline decoration (wavy or straight 3px line in #7C3AED under the text)
Subtext: "Trade YES or NO on real events in your city. Win USDC if you're right." — Inter Tight 16px weight 400, #6B7280, max-width 480px centered, line-height 1.6
32px below: three trust badges inline centered:

"🔒 Non-custodial" · "⚡ Instant payouts" · "🌍 Africa & Philippines"
Each: Inter Tight 13px weight 500, #6B7280, separated by · dots



Region tabs — centered, 40px below trust badges:
Segmented control: bg #FFFFFF, border 1px #E4DFF5, border-radius 100px, padding 4px, inline-flex

Active "🇿🇦 South Africa": bg #7C3AED, text #FFFFFF, Inter Tight 14px weight 600, border-radius 100px, padding 8px 20px, box-shadow 0 2px 8px rgba(124,58,237,0.25)
Inactive "🇵🇭 Philippines": bg transparent, text #6B7280, Inter Tight 14px weight 500, padding 8px 20px

Stats bar — centered, 12px below tabs:
"12 Active Markets · $47,200 Total Volume · 312 Traders" — Inter Tight 12px weight 500, #9CA3AF, letter-spacing 0.3px
Market grid — max-width 1280px, centered, 24px horizontal padding, margin-top 40px:
3-column CSS grid, gap 20px, 12 cards
Market card anatomy:
Container: bg #FFFFFF, border 1px #E4DFF5, border-radius 16px, padding 22px, cursor pointer, box-shadow 0 1px 3px rgba(0,0,0,0.06)
Hover: box-shadow 0 8px 32px rgba(124,58,237,0.12), border-color #C9C0EC, transform translateY(-3px), transition all 200ms ease
Inside:

Category tag: Inter Tight 10px weight 700, letter-spacing 1.5px, uppercase, color #9CA3AF. No background — just text
Chevron → top-right, color #C9C0EC, only on hover becomes #7C3AED
Question: Inter Tight 15px weight 700, color #0D0D1A, letter-spacing -0.3px, 2-line clamp, margin-top 6px, line-height 1.45
YES/NO pills (margin-top 14px):

YES: bg #ECFDF5, border 1px #6EE7B7, text #059669, Inter Tight 13px weight 700, padding 4px 12px, border-radius 100px
NO: bg #FEF2F2, border 1px #FCA5A5, text #DC2626, same sizing
Gap 8px


Probability bar (margin-top 10px): height 4px, border-radius 100px, bg #F3F4F6. Green fill for YES portion. Red fill extends from right for NO portion.
Bottom row (margin-top 12px, flex space-between):

"Vol $4,200" — Inter Tight 12px weight 500, #9CA3AF
"Closes Aug 31" — Inter Tight 12px weight 500, #9CA3AF



12 cards — same market data as before, categories:

Lagos toll gate — INFRASTRUCTURE — YES 67¢ / NO 33¢
Kenya fuel subsidy — ECONOMICS — YES 45¢ / NO 55¢
Cape Town water — ENVIRONMENT — YES 72¢ / NO 28¢
SA load shedding — ENERGY — YES 38¢ / NO 62¢
Gautrain Soweto — INFRASTRUCTURE — YES 29¢ / NO 71¢
Nigeria naira — ECONOMICS — YES 41¢ / NO 59¢
Ghana inflation — ECONOMICS — YES 55¢ / NO 45¢
Nairobi expressway — INFRASTRUCTURE — YES 22¢ / NO 78¢
SA Rugby World Cup — SPORTS — YES 81¢ / NO 19¢
Eskom privatization — ENERGY — YES 18¢ / NO 82¢
Nigeria elections — POLITICS — YES 63¢ / NO 37¢
Kenya SGR — INFRASTRUCTURE — YES 34¢ / NO 66¢


SCREEN 2 — HOME LOGGED IN | 1440px
Header changes only — everything else identical:

Far left: Polytrade logo (same)
Center: wallet balance display — bg #F0EDFF, border 1px #C9C0EC, border-radius 10px, padding 8px 18px, inline-flex items-center gap 10px:

"$124.50" — Inter Tight 17px weight 800, #0D0D1A
"USDC" — Inter Tight 12px weight 600, #7C3AED
Thin vertical divider 1px #C9C0EC
"Deposit" — Inter Tight 13px weight 600, #7C3AED, no bg, cursor pointer, hover underline
Small dropdown chevron #9CA3AF


Far right: notification bell (#9CA3AF) + user avatar (32px circle, bg #7C3AED, white initials Inter Tight 13px weight 700)
"Sign up" and "Log in" buttons replaced by the above


SCREEN 3 — WALLET / DEPOSIT MODAL
560px wide modal, bg #FFFFFF, border 1px #E4DFF5, border-radius 24px, padding 36px, box-shadow 0 20px 64px rgba(0,0,0,0.12), backdrop blur on overlay (bg rgba(13,13,26,0.4))
Top section:

"Wallet" — Inter Tight 22px weight 800, #0D0D1A
Balance: "$124.50 USDC" — Inter Tight 36px weight 900, color #7C3AED, margin-top 4px
Two action buttons side by side (margin-top 20px):

"Deposit USDC/USDT" — bg #7C3AED, text white, Inter Tight 14px weight 600, border-radius 10px, 40px height, flex 1. Shadow: 0 2px 8px rgba(124,58,237,0.3)
"Withdraw" — bg #F7F5FF, border 1px #E4DFF5, text #6B7280, same size, flex 1



Open Positions (below divider 1px #E4DFF5, margin-top 24px):

Section label: "OPEN POSITIONS" Inter Tight 11px weight 700 letter-spacing 1.5px #9CA3AF
Each row: market name (truncated, 14px weight 600 #0D0D1A) · YES/NO badge · "50 shares" (#9CA3AF) · "$33.50" (weight 700 #0D0D1A)

YES badge: bg #ECFDF5, text #059669, 11px weight 700
NO badge: bg #FEF2F2, text #DC2626



Deposit state (when Deposit clicked) — replaces content:
Top: "Deposit USDC or USDT" title, back arrow
Wallet address box: bg #F7F5FF, border 1px #E4DFF5, border-radius 12px, padding 16px:

"Send to this address:" label — 11px caps muted
Address in Inter Tight 13px monospace weight 600 #0D0D1A, word-break: break-all
Copy button right — bg #EDE9FE, text #7C3AED, 28px height, border-radius 6px, "Copy" text

Network badge: "Polygon Network" — small pill, bg #F0EDFF, border 1px #C9C0EC, purple text, margin-top 8px
Divider + "Confirm your transfer" label
Transaction hash input: full width, bg #F7F5FF, border 1px #E4DFF5 → focus border #7C3AED with purple glow, 44px height, border-radius 10px, placeholder "Paste transaction hash (TxID)"
Amount selector: "Amount sent" label above. Row of pill buttons: $10 · $25 · $50 · $100 · Custom. Default none selected. Selected: bg #7C3AED, text white. Unselected: bg #F7F5FF, border 1px #E4DFF5, text #6B7280
"Submit for Verification" — full width, bg #7C3AED, text white, 48px height, border-radius 10px, margin-top 20px
Info note: "⏱ Funds appear within 2 hours after manual verification" — 12px #9CA3AF, centered, margin-top 12px

SCREEN 4 — MARKET DETAIL PAGE | 1440px
Header: logged-in version
Breadcrumb: "← Markets / South Africa" — 13px #9CA3AF, margin 24px 0
Two column layout, max-width 1280px, gap 40px:
Left (63%):
Market hero (no card — just on page bg):

Category: "INFRASTRUCTURE" — purple eyebrow, 11px caps weight 700
Title: "Will the Lagos toll gate reopen before August 31, 2025?" — Inter Tight 40px weight 900, letter-spacing -1.5px, #0D0D1A
Meta: Vol $4,200 · Resolves Aug 31, 2025 · Source: Lagos State Govt — 13px #9CA3AF

Probability hero:

"67%" — Inter Tight 80px weight 900, color #7C3AED, letter-spacing -3px, line-height 1
"probability of YES" — 14px #6B7280
"+3.2 today" green badge

Price chart: white card (#FFFFFF), border 1px #E4DFF5, border-radius 16px, padding 24px, 380px height. Purple (#7C3AED) line on light background, subtle purple area fill below line. Time filters top right: 6H 1D 1W 1M ALL — small pill toggles, active purple.
Expandable sections below chart (white cards, same style): About this market · Resolution criteria
Right (37%, sticky top: 88px):
Trade panel: bg #FFFFFF, border 1px #E4DFF5, border-radius 20px, padding 28px, box-shadow 0 4px 24px rgba(124,58,237,0.08)
Market mini-ref: truncated name, 13px #9CA3AF
YES / NO toggle (margin-top 16px):
Full width, two buttons, gap 8px, border-radius 10px each

YES selected: bg #ECFDF5, border 2px #059669, text #059669, Inter Tight 15px weight 800. Inside: "YES · 67¢"
NO unselected: bg #F9FAFB, border 1px #E4DFF5, text #9CA3AF. Inside: "NO · 33¢"

Amount input (margin-top 16px): white card, border 1px #E4DFF5, border-radius 12px, padding 16px 20px:

"Amount" label — 11px caps #9CA3AF
"$10" — Inter Tight 28px weight 900 #0D0D1A, right-aligned
"= 14.9 shares" — 12px #9CA3AF below

Summary (margin-top 16px, rows separated by 1px #F3F4F6):

"Odds" — "67% chance"
"Payout if YES wins" — "$14.92 USDC" Inter Tight 20px weight 800 #059669

Buy button: full width, 56px height, bg #7C3AED, text white, Inter Tight 16px weight 700, border-radius 12px, box-shadow 0 4px 16px rgba(124,58,237,0.35). Hover: bg #5B21B6, shadow increases.
Disclaimer: 11px #9CA3AF centered below

SCREEN 5 — SIGN UP MODAL
400px wide, centered, bg #FFFFFF, border-radius 24px, padding 36px, shadow heavy.

Logomark centered top
"Create your account" — Inter Tight 26px weight 900, #0D0D1A, centered
Subtext: "Start trading in under 2 minutes" — 14px #6B7280
"Continue with Google" — full width 48px, white bg, border 1px #E4DFF5, shadow 0 1px 4px rgba(0,0,0,0.08), Google logo + Inter Tight 14px weight 600 #0D0D1A
Divider "or"
Email input: full width, 44px, border 1px #E4DFF5, border-radius 10px, focus border #7C3AED, purple glow ring
"Send OTP" — full width, 48px, bg #7C3AED, white text, weight 700
OTP state: 6 input boxes 52px×52px, gap 8px, border 1px #E4DFF5, border-radius 10px, Inter Tight 22px weight 800 #0D0D1A centered. Active box: border 2px #7C3AED, bg #F0EDFF
"Verify & Continue" full width purple button
Footer: "Already have an account? Log in" — 13px #6B7280, "Log in" in #7C3AED weight 600


SCREEN 6 — CONFIRM TRADE MODAL
440px, same card style.

"Confirm your trade" — 22px weight 800
Tinted summary card inside modal: bg #F7F5FF, border-radius 12px, padding 20px:

Market name truncated — muted
Position: YES badge (green)
Amount: $10.00 USDC
Shares: 14.9
Payout if correct: $14.92 (green, bold)
Profit: +$4.92 (+49%)


"Balance after: $114.50 USDC" centered muted below card
"Confirm Trade" full width purple button
"Cancel" muted text link below


QUALITY MANDATE
Make this the best-looking fintech web app generated in Figma Make. It should:

Feel trustworthy enough for someone to deposit real crypto
Be warm and approachable for first-time traders in Lagos and Manila
Have breathing room — generous whitespace, nothing cramped
Use purple with restraint — accent, not wallpaper
Typography hierarchy must be razor sharp at every level
The dot grid background should feel subtle and sophisticated, not decorative
Cards should feel like physical objects with real depth
Every interactive element must have a visible, satisfying state change