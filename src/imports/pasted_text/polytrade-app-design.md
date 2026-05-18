POLYTRADE — Hyperlocal Prediction Market Platform
Design a complete mobile-first web application called Polytrade — a hyperlocal prediction market platform where users trade YES/NO positions on real local events using USDC/USDT stablecoins.

VISUAL IDENTITY
Dark theme. Deep navy/black backgrounds (#0A0E1A, #0F1629). Electric blue-green accent (#00D4AA or similar teal-green). White primary text. Muted gray secondary text. Red/green for NO/YES indicators. Clean, modern fintech aesthetic — think Robinhood meets Polymarket. Mobile-first but works on desktop. Rounded cards, subtle glassmorphism on modals. Typography: Inter or similar sans-serif.

SCREEN 1 — LANDING / HOME (logged out)
Header bar:

Left: "Polytrade" wordmark/logo in white
Right: "Connect" button — outlined, teal-green border, white text

Hero section below header:

Tagline: "Your local knowledge. Real money."
Subtext: "Trade on real events in your city. Win if you're right."
Two pill/tab buttons side by side: "🇿🇦 South Africa" and "🇵🇭 Philippines" — teal underline on active tab

Market feed (cards list below tabs):
Each market card contains:

Market question in bold (e.g. "Will the Lagos toll gate reopen before August 2025?")
YES price pill (green, e.g. "YES 67¢") and NO price pill (red, e.g. "NO 33¢")
Horizontal probability bar — green fill on left showing YES%, gray on right showing NO%
Volume indicator: small text "Vol: $4,200"
Closes: "Closes Aug 31" in muted text
Subtle right arrow chevron
Cards have dark card background (#161D2E), 12px border radius, subtle border

Show 4-5 market cards in the feed.

SCREEN 2 — SIGN UP / LOGIN MODAL
Triggered by clicking "Connect" in header. Full-screen overlay or centered modal with dark background blur.
Modal card (centered, ~380px wide):

Title: "Join Polytrade"
"Continue with Google" button — white background, Google icon, dark text
Divider: "or"
Email input field: placeholder "Enter your email"
"Send OTP" button — full width, teal-green fill
Below: small text "By continuing you agree to our Terms"

Second state (OTP entry):

"Enter the 6-digit code sent to [email]"
6 individual OTP input boxes side by side
"Verify & Continue" button
"Resend code" text link


SCREEN 3 — HOME (logged in)
Header bar:

Left: "Polytrade" wordmark
Center: Balance display — "$124.50 USDC" in white, slightly larger, clickable (subtle underline or cursor pointer indicator)
Right: User avatar circle (initials) + small dropdown arrow

Everything else same as Screen 1 but now the market cards are fully interactive-looking.

SCREEN 4 — WALLET MODAL
Triggered by clicking balance in header. Centered modal, glassmorphism card effect.
Top section:

"Your Wallet" title
Total balance: "$124.50 USDC" large and centered
Two buttons side by side: "Deposit" (teal fill) and "Withdraw" (outlined)

Holdings section below:

List of open positions
Each row: Market name truncated, side badge (YES in green / NO in red), shares count, current value
Example rows:

"Will Manila subway open..." · YES · 50 shares · $33.50
"Will Kenya fuel subsidy..." · NO · 30 shares · $19.20



Deposit sub-state (when Deposit clicked):

Instruction text: "Send USDC or USDT to the address below"
Wallet address box: monospace font, full address, copy icon on right
Network badge: "Polygon Network"
Divider
"I've sent the funds" section:

Input: "Paste your transaction hash (TxID)"
Dropdown: "Amount sent" — $10 / $25 / $50 / $100 / Custom
Submit button: "Submit for Verification"


Info note at bottom: "⏱ Manual verification within 2 hours. Funds will appear in your wallet."


SCREEN 5 — MARKET DETAIL PAGE
Full page, accessed by tapping a market card.
Top: Back arrow + "South Africa Markets" breadcrumb
Market header card:

Full question: "Will the Lagos toll gate reopen before August 31, 2025?"
Resolution source: "Source: Lagos State Government Official Announcement"
Closes: "Resolves Aug 31, 2025"
Volume: "Total Volume: $4,200"

Live probability display (centerpiece):

Large centered percentage: "67%" in teal-green
Subtext: "Chance of YES"
Horizontal bar: wide, green/gray split at 67%

YES / NO trade panels — two cards side by side:
YES card (left, green tint border):

"YES" label large
"67¢ per share"
"Pays $1.00 if YES wins"
"Potential return: +49%"
Input field: "Number of shares" with +/- buttons
Below input: "Cost: $33.50 USDC"
"Buy YES" button — full width, green fill

NO card (right, red tint border):

"NO" label large
"33¢ per share"
"Pays $1.00 if NO wins"
"Potential return: +203%"
Input field: "Number of shares" with +/- buttons
Below input: "Cost: $16.50 USDC"
"Buy NO" button — full width, red fill

Below trade panels:

"About this market" expandable section
"Resolution criteria" expandable section


SCREEN 6 — BUY CONFIRMATION MODAL
Appears after clicking Buy YES or Buy NO.
Modal card:

Title: "Confirm Trade"
Summary card:

Market: "Lagos toll gate reopens before Aug 31" (truncated)
Position: "YES" badge in green
Shares: "50 shares"
Cost: "$33.50 USDC"
Pays if correct: "$50.00 USDC"
Potential profit: "+$16.50 (+49%)"


Divider
Wallet balance after: "Balance after: $91.00 USDC"
Two buttons: "Confirm" (teal fill, full width) and "Cancel" (text link below)


SCREEN 7 — RESOLVED MARKET (example)
Market card in feed shows "RESOLVED" badge in top right — gray background, muted.
Detail page for resolved market:

Same layout but trade panels replaced with:

Large banner: "✅ YES Won" (green) or "❌ NO Won" (red)
If user had position: "You held 50 YES shares → Paid out $49.00 USDC (after 2% fee)"
If no position: "This market has closed"




LAYOUT & SPACING NOTES
Mobile frame: 390px wide. All screens designed for iPhone 14 size.
Card padding: 16px internal.
Screen padding: 16px horizontal gutters.
Tab bar is sticky top below header.
Header height: 56px.
Bottom safe area padding: 34px.
All interactive elements minimum 44px touch target.
Modals use backdrop blur + dark overlay.

COMPONENT VARIANTS TO INCLUDE

Market card: default / hovered / resolved states
Buy button: default / loading / disabled (insufficient balance)
Tab: active / inactive
Price pill: YES (green) / NO (red)
Balance header: logged out / logged in