Fix the Wallet Modal — Light Theme + Full Withdraw Flow
The wallet modal is currently rendering in dark theme. Fix it to match the light purple design system already implemented on the home screen. Then build the complete withdraw flow.

WALLET MODAL — LIGHT THEME FIX
Modal container: bg #FFFFFF, border 1px #E4DFF5, border-radius 24px, padding 36px, box-shadow 0 20px 64px rgba(0,0,0,0.12). Backdrop overlay: rgba(13,13,26,0.4) with blur.
"Your Wallet" title: Inter Tight 22px weight 800, color #0D0D1A
Balance "$124.50 USDT": Inter Tight 36px weight 900, color #7C3AED
Two buttons side by side:

"Deposit +" — bg #7C3AED, text #FFFFFF, Inter Tight 14px weight 600, border-radius 10px, 44px height, flex 1, box-shadow 0 2px 8px rgba(124,58,237,0.3)
"Withdraw" — bg #F7F5FF, border 1px #E4DFF5, text #6B7280, same sizing, flex 1. Hover: border #C9C0EC, text #0D0D1A

Divider: 1px #E4DFF5, margin-top 24px
"OPEN POSITIONS" label: Inter Tight 11px weight 700, letter-spacing 1.5px, color #9CA3AF, uppercase
Position rows (each row, flex space-between, padding 14px 0, border-bottom 1px #F3F4F6):

Left: market name truncated (Inter Tight 14px weight 600, #0D0D1A) + YES/NO badge inline

YES badge: bg #ECFDF5, border 1px #6EE7B7, text #059669, Inter Tight 11px weight 700, padding 3px 8px, border-radius 100px
NO badge: bg #FEF2F2, border 1px #FCA5A5, text #DC2626, same


Right: shares count (Inter Tight 13px #9CA3AF) + dollar value (Inter Tight 15px weight 700 #0D0D1A)


WITHDRAW FLOW — 3 STATES
When "Withdraw" button is clicked, the modal content transitions to the withdraw flow. Back arrow top-left returns to main wallet view.
STATE 1 — Withdraw Entry
Title: "Withdraw Funds" Inter Tight 22px weight 800 #0D0D1A
Subtitle: "Withdraw USDT or USDT to your external wallet" Inter Tight 14px #6B7280, margin-top 4px
Available balance row: bg #F7F5FF, border 1px #E4DFF5, border-radius 12px, padding 16px, margin-top 20px, flex space-between:

Left: "Available balance" — Inter Tight 12px weight 500 #9CA3AF, above "$124.50 USDT" Inter Tight 20px weight 800 #0D0D1A
Right: "Max" button — bg #EDE9FE, text #7C3AED, Inter Tight 12px weight 600, padding 6px 12px, border-radius 6px, cursor pointer

Amount input (margin-top 16px):

Label: "Amount to withdraw" Inter Tight 12px weight 600 #6B7280 uppercase letter-spacing 1px
Input box: bg #F7F5FF, border 1px #E4DFF5, border-radius 12px, padding 16px 20px, height 56px
Left inside: "$" Inter Tight 24px weight 700 #9CA3AF
Right inside: amount typed — Inter Tight 24px weight 800 #0D0D1A
Focus: border 2px #7C3AED, bg #FFFFFF, box-shadow 0 0 0 4px rgba(124,58,237,0.08)
Below input: "Min withdrawal: $10.00" Inter Tight 12px #9CA3AF

Quick amount pills (margin-top 12px, row): $10 · $25 · $50 · $100 · All

Unselected: bg #F7F5FF, border 1px #E4DFF5, text #6B7280, Inter Tight 13px weight 600, padding 8px 16px, border-radius 100px
Selected: bg #7C3AED, text #FFFFFF, box-shadow 0 2px 8px rgba(124,58,237,0.25)

Wallet address input (margin-top 20px):

Label: "Your wallet address (USDT/USDT)" same label style
Input box: same style as amount input, height 48px
Placeholder: "0x... or wallet address" Inter Tight 14px #9CA3AF
Paste button inside right: bg #EDE9FE, text #7C3AED, 28px height, border-radius 6px, "Paste" text Inter Tight 12px weight 600

Network selector (margin-top 12px):

Label: "Network" same label style
Row of 3 network pills: "Polygon" · "Base" · "Ethereum"
Selected (Polygon): bg #7C3AED, text white
Unselected: bg #F7F5FF, border 1px #E4DFF5, text #6B7280

Warning note (margin-top 16px): bg #FFFBEB, border 1px #FDE68A, border-radius 10px, padding 12px 16px:

"⚠️ Double-check your wallet address. Withdrawals cannot be reversed." Inter Tight 13px weight 500, color #92400E

"Continue" button: full width, 52px height, bg #7C3AED, text #FFFFFF, Inter Tight 15px weight 700, border-radius 12px, box-shadow 0 4px 16px rgba(124,58,237,0.3), margin-top 20px. Disabled state (when no amount or address): bg #E4DFF5, text #9CA3AF, no shadow, cursor not-allowed

STATE 2 — Withdraw Confirmation
Same modal, back arrow top-left.
Title: "Confirm Withdrawal" Inter Tight 22px weight 800 #0D0D1A
Summary card: bg #F7F5FF, border 1px #E4DFF5, border-radius 16px, padding 24px, margin-top 20px:

Each row flex space-between, border-bottom 1px #E4DFF5 except last, padding 12px 0:

"Amount" · "$50.00 USDT" (weight 700 #0D0D1A)
"Network" · "Polygon" (weight 600 #0D0D1A)
"To address" · "0x742d...3F4A" (Inter Tight 13px monospace weight 600 #0D0D1A, truncated middle)
"Fee" · "No fee" (weight 600, color #059669)
"You receive" · "$50.00 USDT" (Inter Tight 17px weight 800, color #7C3AED — larger, prominent)



Processing time note: "⏱ Manual processing within 4 hours" Inter Tight 13px #9CA3AF, centered, margin-top 16px
Two buttons stacked:

"Confirm Withdrawal" full width 52px bg #7C3AED text white, border-radius 12px, shadow
"Go back" full width 44px bg transparent border 1px #E4DFF5 text #6B7280, border-radius 12px, margin-top 8px


STATE 3 — Withdraw Submitted
Same modal size. No back arrow.
Center-aligned content vertically in modal:
Success icon: 72px circle, bg #ECFDF5, border 2px #6EE7B7, centered. Inside: checkmark ✓ in #059669, 32px.
"Withdrawal Submitted" Inter Tight 24px weight 800 #0D0D1A, centered, margin-top 20px
"Your $50.00 USDT withdrawal has been submitted and will be processed within 4 hours." Inter Tight 14px weight 400 #6B7280, centered, max-width 320px, line-height 1.6
Details pill row (margin-top 20px, centered):

"Polygon Network" pill: bg #F0EDFF, border 1px #C9C0EC, text #7C3AED, Inter Tight 12px weight 600, padding 6px 14px, border-radius 100px
"To: 0x742d...3F4A" same pill style, margin-left 8px

Updated balance (margin-top 24px): bg #F7F5FF, border 1px #E4DFF5, border-radius 12px, padding 16px, centered:

"New balance" Inter Tight 11px weight 600 #9CA3AF uppercase
"$74.50 USDT" Inter Tight 22px weight 800 #0D0D1A

"Back to Markets" button: full width, 52px, bg #7C3AED, text white, Inter Tight 15px weight 700, border-radius 12px, shadow, margin-top 24px

All three withdraw states should be navigable as prototype flows: Entry → Confirmation → Submitted → closes modal back to home.