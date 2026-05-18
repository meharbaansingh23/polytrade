POLYTRADE — Premium Redesign | Full Creative Direction
You are designing a world-class prediction market platform called Polytrade. This should look better than Kalshi, Polymarket, and Stake combined. Think: the precision of a Bloomberg terminal meets the visual warmth of a premium consumer fintech app. Every pixel should feel intentional. This is not a generic dark app — this is a brand.

TYPOGRAPHY
Font: Inter Tight throughout. This is non-negotiable.

Hero headline: Inter Tight 56px, weight 800, letter-spacing -2px
Section headers: Inter Tight 20px, weight 700, letter-spacing -0.5px
Card titles: Inter Tight 15px, weight 600, letter-spacing -0.3px
Prices/numbers: Inter Tight, tabular-nums, weight 700
Meta/labels: Inter Tight 12px, weight 500, letter-spacing 0.5px uppercase
Body: Inter Tight 14px, weight 400


BRAND IDENTITY & COLOR SYSTEM
Primary background: #080C18 (near black, deep navy)
Surface 1 (cards): #0E1425
Surface 2 (elevated cards, modals): #131929
Surface 3 (inputs, hover): #1A2235
Border subtle: #1E2B42
Border active: #2A3F5F
Accent — Polytrade Teal: #00E5B0 (slightly brighter, more electric than before)
Accent glow: rgba(0, 229, 176, 0.15) — used for glow effects on active elements
Accent dark: #00B88A — for hover states
YES color: #00E5B0 (same as accent — teal-green)
NO color: #FF5C5C (bright coral red, not dull maroon)
Text primary: #F0F4FF (slightly cool white, not harsh pure white)
Text secondary: #8896B3
Text tertiary: #4D5F7A
Text on accent: #080C18
Gradient — hero background: radial gradient from #0D1830 at center to #080C18 at edges
Gradient — card hover: subtle linear gradient from #0E1425 to #111826

VISUAL LANGUAGE
Borders: 1px, always #1E2B42 — cards feel "etched" not floating
Border radius: cards 14px, buttons 10px, pills 100px, modals 20px, inputs 10px
Shadows: no harsh drop shadows — use subtle inner glow: inset 0 1px 0 rgba(255,255,255,0.04)
Active/selected states: teal glow — box-shadow: 0 0 0 2px rgba(0,229,176,0.4)
Hover: background shifts to Surface 3, border brightens slightly
Probability bars: 4px height, rounded ends, teal fill for YES, #FF5C5C for NO background
Micro-details that elevate quality:

YES/NO pills have very subtle gradient on fill (not flat)
Price numbers use tabular-nums so they don't jump
Cards have a 1px top border that's slightly lighter — creates "lid" effect
Active tab has a teal underline + teal text, not just filled background
All interactive elements have 200ms ease transitions


SCREEN 1 — HOME LOGGED OUT | 1440px desktop
Header — 68px, sticky, #080C18, border-bottom 1px #1E2B42:

Left: "Polytrade" wordmark — Inter Tight 22px weight 800, pure white. To its right: a small geometric mark (two overlapping triangles suggesting a chart/trade) in teal — this is the logo
Right: "Connect" — Inter Tight 14px weight 600, background #00E5B0, text #080C18, border-radius 10px, 36px height, 20px horizontal padding. Slight glow on hover.

Hero section — centered, max-width 800px, padding-top 96px, padding-bottom 64px:

Eyebrow label above headline: "PREDICTION MARKETS · LIVE NOW" — Inter Tight 11px weight 600, letter-spacing 2px, teal color, uppercase
H1: "Your local knowledge. Real money." — Inter Tight 56px weight 800, letter-spacing -2px, white. Line break after "knowledge." intentionally.
Subtext: "Trade YES or NO on real events happening in your city. Win USDC if you're right." — Inter Tight 16px weight 400, #8896B3, max-width 520px centered
No CTA button in hero — let the markets be the CTA

Region selector — centered, 32px below subtext:
Two tabs, clean pill toggle on dark background (#0E1425, border 1px #1E2B42, border-radius 100px, padding 4px):

Active tab "🇿🇦 South Africa": white background fill on pill, text #080C18, Inter Tight 14px weight 600
Inactive tab "🇵🇭 Philippines": no fill, text #8896B3, Inter Tight 14px weight 500
Transition is smooth 200ms

Market stats bar — centered, 20px below tabs:
Three quick stats inline, separated by dots:
"20 Active Markets · $47,200 Total Volume · 312 Traders"
Inter Tight 13px weight 500, #4D5F7A
Market grid — max-width 1280px, centered, 24px padding sides, margin-top 32px:
3-column CSS grid, gap 16px
12 cards total
Market card anatomy:
Container: Surface 1 (#0E1425), border 1px #1E2B42, border-radius 14px, padding 20px, cursor pointer
Top border accent: 1px solid rgba(255,255,255,0.05) — subtle lid
Hover: background #111826, border-color #2A3F5F, transform translateY(-2px), transition 200ms ease
Inside each card:

Top row: category tag left ("INFRASTRUCTURE" or "ECONOMICS" or "POLITICS" — Inter Tight 10px weight 600, letter-spacing 1.5px, #4D5F7A, uppercase) + chevron right (→ in #4D5F7A, only visible on hover)
Market question: Inter Tight 15px weight 600, #F0F4FF, letter-spacing -0.3px, 2-line clamp, margin-top 8px, line-height 1.4
Price pills row (margin-top 14px): YES pill + NO pill

YES pill: background rgba(0,229,176,0.12), border 1px rgba(0,229,176,0.3), text #00E5B0, Inter Tight 13px weight 700, padding 4px 10px, border-radius 100px
NO pill: background rgba(255,92,92,0.12), border 1px rgba(255,92,92,0.3), text #FF5C5C, Inter Tight 13px weight 700
Gap of 8px between pills


Probability bar (margin-top 12px): height 3px, border-radius 100px, full width. Teal fill for YES portion, #1E2B42 for remainder
Bottom row (margin-top 14px, flex space-between):

Left: "Vol $4,200" — Inter Tight 12px weight 500, #4D5F7A
Right: "Closes Aug 31" — Inter Tight 12px weight 500, #4D5F7A




SCREEN 2 — HOME LOGGED IN | 1440px
Header changes only:

Left: Polytrade logo (same)
Center: balance display (Stake-style) — pill container (#0E1425, border 1px #1E2B42, border-radius 10px, padding 8px 16px):

"$124.50" — Inter Tight 16px weight 700, white
"USDC" — Inter Tight 12px weight 500, #8896B3, margin-left 4px
Small dropdown chevron in #4D5F7A, margin-left 8px


Right of balance: "Wallet" button — same style as Connect (teal fill, dark text)
Far right: notification bell icon (#8896B3) + user avatar (32px circle, teal background, initials in dark text, Inter Tight 13px weight 700)


SCREEN 3 — MARKET DETAIL | 1440px (Kalshi-style two-column)
Full page below header.
Breadcrumb: "Markets / South Africa" — Inter Tight 13px, #4D5F7A, margin 24px 0
Two column layout, gap 32px, max-width 1280px centered:
Left column (63%):
Market header:

Category: "INFRASTRUCTURE" — teal eyebrow label
Title: "Will the Lagos toll gate reopen before August 31, 2025?" — Inter Tight 32px weight 800, letter-spacing -1px, white
Meta row: Vol $4,200 · Resolves Aug 31, 2025 · Source: Lagos State Govt — muted gray small

Live probability (Kalshi-style):

"67%" — Inter Tight 64px weight 800, teal-green
"chance of YES" — muted
"+3.2 today" with small green up arrow — Inter Tight 13px, green

Chart area:

Clean line chart, 400px height, teal line, dark bg
Time filters right-aligned: 6H 1D 1W 1M ALL — pill toggles
Subtle grid lines, y-axis 0-100%

Below chart: About / Resolution expandable sections with border dividers
Right column (37%, sticky):
Trade panel card — Surface 2 (#131929), border 1px #1E2B42, border-radius 16px, padding 24px:
Mini market reference at top:

"Lagos toll gate reopens before Aug 31?" — Inter Tight 13px, #8896B3, 2-line truncated

YES / NO selector:

Full width two-button toggle, gap 8px
YES active: bg rgba(0,229,176,0.15), border 1px #00E5B0, text #00E5B0, Inter Tight 15px weight 700
NO inactive: bg #0E1425, border 1px #1E2B42, text #8896B3
Price shown inside button: "Yes · 67¢" and "No · 33¢"

Amount input (Kalshi-style):

Input container: Surface 3 bg, border 1px #1E2B42, border-radius 10px, padding 16px, margin-top 16px
Left label: "Amount" — Inter Tight 12px weight 500, #8896B3
Right: "$10" — Inter Tight 24px weight 700, white, right-aligned
Below in small: "= 14.9 shares"

Summary rows (margin-top 16px, each row flex space-between, border-top 1px #1E2B42 except first):

"Odds" · "67% chance"
"Payout if YES" · "$14.92 USDC" (teal, larger, bold)

Buy button: full width, 52px height, bg #00E5B0, text #080C18, Inter Tight 16px weight 700, border-radius 10px, subtle glow on hover: box-shadow 0 0 20px rgba(0,229,176,0.3)
Small disclaimer below: Inter Tight 11px, #4D5F7A, centered

SCREEN 4 — SIGN IN MODAL
380px wide, Surface 2 bg, border 1px #1E2B42, border-radius 20px, padding 32px, backdrop blur 20px over dimmed overlay.

Logo mark + "Polytrade" centered at top
H2: "Welcome back" — Inter Tight 24px weight 800
Subtext: "Sign in to trade" — muted
"Continue with Google" — white bg, Google icon, dark text Inter Tight 14px weight 600, full width, 44px height, border-radius 10px
Divider: thin line + "or" centered
Email input: Surface 3 bg, border 1px #1E2B42, Inter Tight 14px, placeholder #4D5F7A, 44px height, border-radius 10px. On focus: border #00E5B0, glow
"Send OTP" — teal fill button, full width
OTP state: 6 boxes 48px × 48px each, gap 8px, Inter Tight 20px weight 700 centered, teal border on active box


SCREEN 5 — CONFIRM TRADE MODAL
420px wide, same modal card style.

"Confirm Trade" — Inter Tight 20px weight 800
Summary table (rows with space-between, 1px borders between):

Position: YES (teal badge)
Amount: $10.00 USDC
Shares: 14.9
Payout if correct: $14.92 USDC (teal)
Profit: +$4.92 (+49%) (teal)


Divider
"Balance after: $114.50 USDC" — centered, muted
"Confirm Trade" — full width teal button
"Cancel" — text link, muted, centered below


FINAL QUALITY BAR
This design should feel like it took a senior product designer 3 weeks. Every detail matters:

No generic placeholder grays — every color is from the defined system
No default browser styles anywhere
Spacing is mathematically consistent (8px grid)
Cards feel premium, not boxy
The teal accent feels electric, not washed out
Typography has clear hierarchy at every level
Interactions feel responsive and alive

This is the design reference for a real product being built for traders in Africa and the Philippines. Make it world-class.