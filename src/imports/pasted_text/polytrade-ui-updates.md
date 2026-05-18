Add two things to the Polytrade platform: a dropdown menu on the user avatar, and a Transaction History page.

PART 1 — AVATAR DROPDOWN MENU
When the user clicks the "MB" avatar circle in the top-right header, show a dropdown menu. This replaces any existing click behavior on the avatar.
Dropdown container: bg #FFFFFF, border 1px #E4DFF5, border-radius 16px, padding 8px, box-shadow 0 8px 32px rgba(0,0,0,0.12), width 220px, positioned absolute top 56px right 16px, z-index 1000.
Top section (padding 12px 16px, border-bottom 1px #F3F4F6):

User name "Mehar B." Inter Tight 14px weight 700 #0D0D1A
Email "mehar@email.com" Inter Tight 12px weight 400 #9CA3AF, margin-top 2px

Menu items (each item: padding 10px 16px, border-radius 10px, cursor pointer, flex row gap 12px align-center):
Hover state: bg #F7F5FF
Item 1 — My Positions:

Icon: small chart/position icon, color #7C3AED
Label: "My Positions" Inter Tight 14px weight 600 #0D0D1A
Click: navigates to /profile page

Item 2 — Transaction History:

Icon: list/receipt icon, color #7C3AED
Label: "Transaction History" Inter Tight 14px weight 600 #0D0D1A
Click: navigates to /transactions page

Item 3 — Settings (non-functional for now):

Icon: gear icon, color #9CA3AF
Label: "Settings" Inter Tight 14px weight 600 #6B7280

Divider: 1px #F3F4F6, margin 4px 0
Item 4 — Log Out:

Icon: arrow-right-from-box logout icon, color #DC2626
Label: "Log out" Inter Tight 14px weight 600 #DC2626
Click: returns to logged-out home screen, clears header to show Log in / Sign up buttons


PART 2 — TRANSACTION HISTORY PAGE
Full page at /transactions. Light theme, same dot grid background #F7F5FF. Same logged-in header.
Page layout — max-width 1100px, centered, padding-top 48px:
Page header row (flex space-between align-center):

Left: "Transaction History" Inter Tight 32px weight 800 #0D0D1A
Right: Export button — bg #FFFFFF, border 1px #E4DFF5, border-radius 10px, padding 8px 16px, Inter Tight 13px weight 600 #6B7280, "↓ Export CSV". Hover: border #C9C0EC

Filter tabs (margin-top 24px):
Horizontal tab row, inline-flex, bg #FFFFFF, border 1px #E4DFF5, border-radius 12px, padding 4px, gap 4px:

"All" — active: bg #7C3AED, text #FFFFFF, Inter Tight 13px weight 600, padding 8px 20px, border-radius 8px
"Deposits" — inactive: bg transparent, text #6B7280, same sizing
"Withdrawals" — inactive
"Trades" — inactive
"Payouts" — inactive

Clicking each tab filters the table below. Active tab always purple filled.
Summary cards row (margin-top 24px, grid 4 columns, gap 16px):
Each mini card: bg #FFFFFF, border 1px #E4DFF5, border-radius 14px, padding 20px, box-shadow 0 1px 3px rgba(0,0,0,0.04):

Card 1: "Total Deposited" label (11px caps #9CA3AF) · "$500.00 USDC" (Inter Tight 22px weight 800 #0D0D1A)
Card 2: "Total Withdrawn" · "$250.00 USDC" (#0D0D1A)
Card 3: "Total Won" · "$98.00 USDC" (#059669 green)
Card 4: "Net P&L" · "+$87.40 USDC" (#059669 green) — red if negative

Transaction table (margin-top 24px):
Container: bg #FFFFFF, border 1px #E4DFF5, border-radius 16px, overflow hidden, box-shadow 0 1px 3px rgba(0,0,0,0.04)
Table header row: bg #F7F5FF, border-bottom 1px #E4DFF5, padding 14px 24px, flex row:

"Date" — Inter Tight 11px weight 700 #9CA3AF uppercase letter-spacing 1px, flex 1.2
"Type" — same style, flex 0.8
"Description" — same, flex 3
"Amount" — same, flex 1, text-align right
"Status" — same, flex 1.2, text-align center
"TxID / Reference" — same, flex 1.5, text-align right

Each transaction row: padding 16px 24px, border-bottom 1px #F3F4F6, flex row align-center, hover bg #F9F8FF:
Column specs:

Date: Inter Tight 13px weight 500 #6B7280, format "May 11, 2025"
Type badge (pill):

DEPOSIT: bg #EDE9FE, text #7C3AED, Inter Tight 11px weight 700
WITHDRAWAL: bg #FEF2F2, text #DC2626
TRADE: bg #F0F9FF, text #0284C7
PAYOUT: bg #ECFDF5, text #059669
All pills: padding 4px 10px, border-radius 100px


Description: Inter Tight 14px weight 600 #0D0D1A (main text) + Inter Tight 12px #9CA3AF below (subtext)
Amount: Inter Tight 15px weight 700, green for incoming (+), red for outgoing (-), right-aligned
Status badge (pill):

Confirmed: bg #ECFDF5, border 1px #6EE7B7, text #059669, "✓ Confirmed"
Pending: bg #FEF9EC, border 1px #FDE68A, text #D97706, "⏱ Pending"
Failed: bg #FEF2F2, border 1px #FCA5A5, text #DC2626, "✗ Failed"
All: Inter Tight 11px weight 600, padding 4px 10px, border-radius 100px, centered


TxID: Inter Tight 12px weight 500 #9CA3AF monospace, truncated "0x742d...3F4A", right-aligned. Click copies full ID — "Copy" appears on row hover in #7C3AED

Show these 12 transactions (mixed types):

May 11, 2025 · DEPOSIT · "USDC Deposit via Polygon" / "Wallet 0x742d...3F4A" · +$100.00 · Confirmed · 0x742d...3F4A
May 10, 2025 · TRADE · "Bought YES — Lagos toll gate" / "50 shares @ 67¢" · -$33.50 · Confirmed · TRD-10042
May 10, 2025 · TRADE · "Bought NO — Kenya fuel subsidy" / "30 shares @ 64¢" · -$19.20 · Confirmed · TRD-10041
May 9, 2025 · PAYOUT · "Won — Cape Town water restrictions" / "40 YES shares resolved" · +$39.20 · Confirmed · PAY-9831
May 8, 2025 · TRADE · "Bought YES — SA load shedding" / "20 shares @ 38¢" · -$7.60 · Confirmed · TRD-10038
May 7, 2025 · WITHDRAWAL · "USDC Withdrawal to Polygon" / "Wallet 0xA3f1...9B2C" · -$50.00 · Confirmed · 0xA3f1...9B2C
May 5, 2025 · TRADE · "Bought YES — SA Rugby World Cup" / "80 shares @ 81¢" · -$64.80 · Confirmed · TRD-10029
May 3, 2025 · PAYOUT · "Won — Nairobi expressway toll" / "60 NO shares resolved" · +$58.80 · Confirmed · PAY-9814
Apr 28, 2025 · DEPOSIT · "USDC Deposit via Polygon" / "Wallet 0x742d...3F4A" · +$200.00 · Confirmed · 0x9Bc2...7E1A
Apr 20, 2025 · TRADE · "Bought NO — Ghana inflation" / "25 shares @ 45¢" · -$11.25 · Confirmed · TRD-9987
Apr 15, 2025 · DEPOSIT · "USDT Deposit via Polygon" / "Wallet 0x742d...3F4A" · +$200.00 · Pending · 0xD4e8...2F9B
Apr 10, 2025 · WITHDRAWAL · "USDC Withdrawal to Polygon" / "Wallet 0xA3f1...9B2C" · -$100.00 · Failed · 0xF2a1...8C3D

Pagination row (margin-top 0, padding 16px 24px, border-top 1px #E4DFF5, flex space-between align-center):

Left: "Showing 12 of 12 transactions" Inter Tight 13px #9CA3AF
Right: pagination — ← Prev · 1 · → Next — Inter Tight 13px weight 600, active page: bg #7C3AED text white 28px circle, inactive: #6B7280


PROTOTYPE FLOWS:

Avatar click → dropdown appears
Dropdown "My Positions" → /profile page
Dropdown "Transaction History" → /transactions page
Dropdown "Log out" → logged-out home
Back arrow or Polytrade logo on transactions page → home
Tab filters on transactions page → filter table to show only that type (wire at least Deposits and Withdrawals tabs)
"Pending" status row (row 11) → clicking status opens small tooltip: "This deposit is awaiting manual verification by our team."


DESIGN CONSISTENCY:

All colors from established light purple system
Inter Tight throughout
No dark backgrounds on page
Same header as all other logged-in screens
Dot grid on page background


That gives you the full avatar dropdown plus a complete Stake-style transaction history page with all types covered.