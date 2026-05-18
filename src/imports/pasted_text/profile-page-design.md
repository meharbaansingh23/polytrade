Love the thinking — since this is a prediction market, not a betting platform, the language should reflect that. Some options:
Instead of "Bets" consider:

Positions — most accurate financially (you hold a YES/NO position)
Trades — clean, fintech-native
Predictions — on-brand, tells the story ("My Predictions")
Portfolio — elevates it, feels serious

I'd go with "My Positions" — it's the language Kalshi and Polymarket use, feels credible, and naturally splits into Active and Settled.
Here's the Figma Make prompt:

Add a Profile page to the Polytrade platform, accessible by clicking the user avatar in the top-right header. This is a full page, not a modal.
ROUTE: Clicking avatar → navigates to /profile page. Back arrow returns to home.

PROFILE PAGE LAYOUT | 1440px desktop, light theme
Page background: #F7F5FF with dot grid texture (same as home).
Header: identical to logged-in home header.
Page content — max-width 1100px, centered, padding-top 48px:

TOP SECTION — User Identity Card
Full width card: bg #FFFFFF, border 1px #E4DFF5, border-radius 20px, padding 32px, box-shadow 0 1px 3px rgba(0,0,0,0.06)
Left side (flex row, gap 24px, align-center):

Avatar circle: 64px, bg #7C3AED, white initials "MB" Inter Tight 24px weight 700
User info column:

Display name: "Mehar B." Inter Tight 22px weight 800 #0D0D1A
Email: "mehar@email.com" Inter Tight 14px weight 400 #6B7280
Joined badge: small pill bg #EDE9FE, border 1px #C9C0EC, text "✦ Member since May 2025" Inter Tight 11px weight 600 #7C3AED, padding 4px 12px, border-radius 100px



Right side (flex row, gap 32px, margin-left auto):
Three stat blocks, each center-aligned:

Block 1: "Total Traded" label (Inter Tight 11px weight 600 #9CA3AF uppercase letter-spacing 1px) · "$1,240.00" value (Inter Tight 22px weight 800 #0D0D1A)
Block 2: "Positions Won" · "14" (Inter Tight 22px weight 800 #059669)
Block 3: "P&L" · "+$87.40" (Inter Tight 22px weight 800 #059669) — red if negative
Thin 1px #E4DFF5 vertical dividers between blocks


MY POSITIONS SECTION
Section header row (margin-top 40px, flex space-between align-center):

Left: "My Positions" Inter Tight 24px weight 800 #0D0D1A
Right: two tab pills in a toggle (bg #FFFFFF, border 1px #E4DFF5, border-radius 100px, padding 4px):

"Active" tab: bg #7C3AED, text #FFFFFF, Inter Tight 13px weight 600, padding 8px 20px, border-radius 100px
"Settled" tab: bg transparent, text #6B7280, Inter Tight 13px weight 500, padding 8px 20px




ACTIVE POSITIONS TAB (default view)
Subtitle below header: "Positions you currently hold — exit anytime before resolution" Inter Tight 13px #9CA3AF, margin-top 4px
Table-style list (margin-top 20px). Each row is a card:
Card: bg #FFFFFF, border 1px #E4DFF5, border-radius 14px, padding 20px 24px, margin-bottom 12px, box-shadow 0 1px 3px rgba(0,0,0,0.04)
Hover: box-shadow 0 4px 16px rgba(124,58,237,0.08), border-color #C9C0EC
Each active position card layout (flex row, align-center, gap 16px):
Column 1 — Market (flex 1, largest):

Category tag: "INFRASTRUCTURE" Inter Tight 10px weight 700 #9CA3AF uppercase letter-spacing 1px
Market question: "Will the Lagos toll gate reopen before August 31, 2025?" Inter Tight 15px weight 600 #0D0D1A, margin-top 4px, max 1 line truncated
Resolves: "Resolves Aug 31, 2025" Inter Tight 12px #9CA3AF, margin-top 4px

Column 2 — Position:

YES or NO badge (large version):

YES: bg #ECFDF5, border 1px #6EE7B7, text #059669, Inter Tight 14px weight 700, padding 6px 16px, border-radius 100px
NO: bg #FEF2F2, border 1px #FCA5A5, text #DC2626, same



Column 3 — Shares:

"50 shares" Inter Tight 15px weight 600 #0D0D1A
"@ 67¢ each" Inter Tight 12px #9CA3AF below

Column 4 — Cost:

"Cost" label Inter Tight 11px #9CA3AF uppercase
"$33.50" Inter Tight 16px weight 700 #0D0D1A

Column 5 — Current Value:

"Current Value" label Inter Tight 11px #9CA3AF uppercase
"$36.20" Inter Tight 16px weight 700 #059669 (green if up, red if down from cost)
"+$2.70 (8%)" Inter Tight 12px weight 500 #059669 below

Column 6 — Action:

"View Market →" Inter Tight 13px weight 600 #7C3AED, cursor pointer, no underline default, underline on hover

Show 4 active position cards:

Lagos toll gate · YES · 50 shares · Cost $33.50 · Current $36.20 · +$2.70
Kenya fuel subsidy · NO · 30 shares · Cost $19.20 · Current $17.80 · -$1.40 (red)
SA load shedding · YES · 20 shares · Cost $7.60 · Current $8.10 · +$0.50
SA Rugby World Cup · YES · 80 shares · Cost $64.80 · Current $71.20 · +$6.40


SETTLED POSITIONS TAB (when Settled clicked)
Subtitle: "Resolved markets — your final payouts" Inter Tight 13px #9CA3AF
Same card layout as active but Column 5 and 6 change:
Column 5 — Outcome:

WON: large pill bg #ECFDF5, border 1px #6EE7B7, text #059669, Inter Tight 13px weight 700, "✓ WON"
LOST: large pill bg #FEF2F2, border 1px #FCA5A5, text #DC2626, "✗ LOST"

Column 6 — Payout:

If WON: "Paid out" label Inter Tight 11px #9CA3AF · "$49.00 USDC" Inter Tight 16px weight 700 #059669 · "+$15.50 profit" Inter Tight 12px #059669
If LOST: "Expired" label · "$0.00" Inter Tight 16px weight 700 #DC2626 · "-$19.20 lost" Inter Tight 12px #DC2626

No "View Market →" link on settled — replace with "Resolved Aug 31" Inter Tight 12px #9CA3AF
Show 4 settled position cards:

Cape Town water restrictions · YES · 40 shares · WON · Paid $39.20 · +$10.80
Ghana inflation drop · NO · 25 shares · LOST · $0.00 · -$11.25
Nairobi expressway toll · NO · 60 shares · WON · Paid $58.80 · +$20.80
Nigeria naira stabilize · YES · 15 shares · LOST · $0.00 · -$6.15


BOTTOM SUMMARY BAR (visible on both tabs)
Full width card below position list: bg #FFFFFF, border 1px #E4DFF5, border-radius 16px, padding 24px, margin-top 24px
Flex row, space-between, 4 stat blocks with vertical dividers:

"Active Positions" · "4 open" (#0D0D1A weight 700)
"Total Invested" · "$125.10 USDC" (#0D0D1A weight 700)
"Unrealised P&L" · "+$8.20 (6.5%)" (#059669 weight 700)
"Total Won (All time)" · "$98.00 USDC" (#059669 weight 700)


PROTOTYPE FLOWS:

Avatar click → Profile page
"Active" tab → shows active positions
"Settled" tab → shows settled positions
"View Market →" on any active card → navigates to that market detail page
Back arrow or Polytrade logo → returns to home


DESIGN CONSISTENCY CHECKLIST:

All colors from the established light purple system
Inter Tight throughout, same weight hierarchy
No dark backgrounds anywhere
Card hover states with purple glow
Same header as logged-in home
Dot grid on page background