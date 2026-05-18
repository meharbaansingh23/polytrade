Perfect, now I have all the references. Here's what I'm taking from each:
Stake header → balance amount + dropdown in the centre-right area, "Wallet" as a separate CTA button next to it, clean top nav
Kalshi detail → left side has the chart + market info, right side has a sticky trade panel (YES/NO toggle, dollar input, odds + payout if correct, big Buy button)
Here's the refined full Figma Make prompt:

POLYTRADE — Hyperlocal Prediction Market | Full Web Redesign
Design a full desktop web application called Polytrade. Dark fintech aesthetic. Deep navy backgrounds (#0A0E1A, #0F1629, #161D2E). Electric teal-green accent (#00D4AA). White primary text. Inter font throughout. Clean, modern, no gradients except subtle ones on CTAs.

SCREEN 1 — HOME (Logged Out) — Desktop Web, 1440px wide
Header (fixed, 64px tall, full width, dark #0A0E1A, subtle bottom border):

Far left: "Polytrade" wordmark in white, bold
Far right: "Connect" button — teal-green fill, white text, 36px height, rounded pill

Hero section (centered, max-width 900px, 80px top padding):

H1: "Your local knowledge. Real money." — large, white, bold
Subtext below: "Trade on real local events. Win USDC if you're right." — muted gray
40px spacing below

Region tabs (centered, pill-style toggle):

"🇿🇦 South Africa" — active state: teal-green filled pill
"🇵🇭 Philippines" — inactive: outlined pill, gray text
Tabs sit on a dark segmented control background

Market grid below tabs (max-width 1200px, centered, 24px padding sides):

3-column grid layout
10–12 market cards total (4 rows of 3, last row can be 2)
Cards: #161D2E background, 12px radius, 1px border (#1E2A40), 20px internal padding
Each card contains:

Market question — bold white, 15px, 2 lines max, truncated
YES pill (teal-green bg, white text "YES 67¢") + NO pill (dark red bg, white text "NO 33¢") — side by side, small rounded pills
Thin probability bar below pills — teal-green fill for YES%, dark gray for NO%
Bottom row: "Vol: $4,200" left-aligned muted gray · "Closes Aug 31" right-aligned muted gray
Subtle right chevron top-right corner of card
Cards are hover-interactive (slightly lighter bg on hover)



Sample markets for South Africa tab:

Will the Lagos toll gate reopen before August 31, 2025? — YES 67¢ / NO 33¢ — Vol $4,200
Will Kenya implement a fuel subsidy by June 2026? — YES 45¢ / NO 55¢ — Vol $8,500
Will Cape Town water restrictions ease by December 2025? — YES 72¢ / NO 28¢ — Vol $3,100
Will South Africa's load shedding end before March 2026? — YES 38¢ / NO 62¢ — Vol $11,200
Will the Gautrain expand to Soweto by 2027? — YES 29¢ / NO 71¢ — Vol $2,800
Will Nigeria's naira stabilize below ₦1,500/USD by October? — YES 41¢ / NO 59¢ — Vol $6,700
Will Ghana's inflation drop below 15% by September 2025? — YES 55¢ / NO 45¢ — Vol $4,900
Will the Nairobi expressway toll be removed by year end? — YES 22¢ / NO 78¢ — Vol $3,300
Will South Africa host the 2027 Rugby World Cup? — YES 81¢ / NO 19¢ — Vol $9,400
Will Eskom be privatized before 2027? — YES 18¢ / NO 82¢ — Vol $7,600
Will Nigeria hold gubernatorial elections without postponement? — YES 63¢ / NO 37¢ — Vol $5,100
Will Kenya's SGR extend to Uganda by December 2026? — YES 34¢ / NO 66¢ — Vol $4,400


SCREEN 2 — HOME (Logged In) — Desktop Web
Header (same 64px, full width):

Far left: "Polytrade" wordmark
Center-right (Stake-style): balance display showing "$124.50 USDC" with a small dropdown arrow — white text, slightly larger font, subtle pill background — this is clickable
Right of balance: "Wallet" button — teal-green fill, white text, rounded pill (same as Stake's Wallet CTA)
Far right: user avatar circle (initials "MB"), notification bell icon

Everything else identical to logged-out home. Markets are fully interactive.

SCREEN 3 — WALLET MODAL (triggered by clicking balance or Wallet button)
Centered modal, 480px wide, dark card (#161D2E), rounded 16px, backdrop blur overlay.
Top:

"Your Wallet" — bold white title
"$124.50 USDC" — large centered, 32px, white
Two buttons side by side: "Deposit +" (teal fill) · "Withdraw" (outlined teal)

Open Positions section:

Section label: "Open Positions" — muted gray, 12px caps
Table rows, each: market name truncated · YES/NO badge · X shares · $XX.XX value

"Lagos toll gate..." · YES (green badge) · 50 shares · $33.50
"Kenya fuel subsidy..." · NO (red badge) · 30 shares · $19.20
"SA load shedding..." · YES (green badge) · 20 shares · $7.60



Deposit flow (sub-state when Deposit clicked):

"Send USDC or USDT to this address:" label
Wallet address in monospace box — full address — copy icon right
"Polygon Network" small badge below address
Divider line
"Confirm your transfer:" subheading
Transaction hash input: placeholder "Paste TxID / transaction hash"
Amount selector: pill buttons — $10 · $25 · $50 · $100 · Custom
"Submit" button — full width teal
Info note: "⏱ Manual verification within 2 hours"


SCREEN 4 — MARKET DETAIL PAGE — Desktop Web, 1440px
Header: same as logged-in header
Sub-nav breadcrumb below header: "← Markets / South Africa / Lagos Toll Gate"
Main content area — two column layout (Kalshi-style):
Left column (65% width):
Market hero card (dark bg, 24px padding):

Category tag: "INFRASTRUCTURE" — small teal caps label
Market title: "Will the Lagos toll gate reopen before August 31, 2025?" — H1, white, bold, large
Metadata row: "Vol: $4,200" · "Resolves Aug 31, 2025" · "Source: Lagos State Govt" — muted gray, small

Probability display:

Large: "67%" in teal-green, 48px bold
Subtext: "chance of YES" — muted gray
Small green upward arrow + "+3.2 today" change indicator

Price chart area (Kalshi-style):

Clean line chart, teal-green line on dark background
Y-axis: 0% to 100% probability
X-axis: timeline from market open to close date
Time filter pills: 6H · 1D · 1W · 1M · ALL — small, right-aligned above chart
Chart fills ~400px height

Below chart:

"About this market" — expandable section, gray border, description text
"Resolution criteria" — expandable section

Right column (35% width, sticky on scroll — Kalshi-style trade panel):
Sticky trade card (dark #1A2236, 16px border radius, 1px border, 20px padding):
Top mini-header inside card:

Small market thumbnail image placeholder (dark square, 40x40)
Market name truncated next to it — small white text
"Buy Yes" — teal text label

YES / NO toggle:

Two pill buttons side by side full width
"Yes 67¢" — active: teal-green fill, white text
"No 33¢" — inactive: dark fill, muted text
Selecting one highlights it

Input section:

Label: "Dollars" with small dropdown arrow (like Kalshi)
Large dollar input field: "$10" — white large text, right-aligned inside input box — teal border when focused
Below input in muted small text: "Earn returns if correct"

Summary rows (like Kalshi):

"Odds" row: right-aligned "67% chance"
"Payout if Yes" row: right-aligned "$14.92" — teal-green, bold, larger

"Buy" button — full width, teal-green fill, white text, 52px height, 8px radius, bold
Below button: tiny disclaimer "By trading you agree to our Terms"

SCREEN 5 — BUY CONFIRMATION MODAL
Centered modal, 420px wide, dark card.

Title: "Confirm Trade"
Market name: truncated, muted
Trade summary table:

Position: YES (green badge)
Amount: $10.00 USDC
Shares: 14.9 shares
Payout if correct: $14.92 USDC
Potential profit: +$4.92 (+49%)


Divider
"Balance after trade: $114.50 USDC"
"Confirm Trade" button — full width teal
"Cancel" — small text link below


SCREEN 6 — SIGN IN MODAL
Centered, 380px wide modal, dark card, backdrop blur.

"Welcome to Polytrade" title — bold white
"Continue with Google" — white bg button, Google icon, dark text, full width
Divider: "or continue with email"
Email input — dark input, placeholder "your@email.com"
"Send OTP" button — teal fill, full width
OTP state: 6 digit boxes side by side, "Verify & Continue" button below
Footer: "By joining you agree to Terms of Service"


DESIGN SYSTEM NOTES
Colors:

Background: #0A0E1A
Card: #161D2E
Trade panel: #1A2236
Accent / CTA: #00D4AA
YES green: #00C896
NO red: #E05252
Text primary: #FFFFFF
Text secondary: #6B7A99
Border: #1E2A40

Typography: Inter throughout

H1: 32px bold
H2: 24px semibold
Body: 15px regular
Small/meta: 12px regular
Numbers/prices: tabular-nums variant

Spacing: 8px base grid
Border radius: cards 12px, buttons 8px, pills 20px, modals 16px
Shadows: subtle dark box-shadow on cards and modals