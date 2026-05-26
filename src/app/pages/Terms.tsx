import { Link } from 'react-router';
import { PublicHeader } from '../components/PublicHeader';
import { Footer } from '../components/Footer';

const H = ({ children }: { children: React.ReactNode }) => (
  <h2
    className="mt-9 mb-3"
    style={{
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 600,
      fontSize: '18px',
      color: '#1D1D1D',
    }}
  >
    {children}
  </h2>
);

const P = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: '15px', color: '#3D3D3D', lineHeight: '1.8', marginBottom: '12px' }}>
    {children}
  </p>
);

const Table = ({ headers, rows }: { headers: string[]; rows: string[][] }) => (
  <div className="overflow-x-auto my-4">
    <table
      style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #F0F0F0', borderRadius: '12px', overflow: 'hidden', fontSize: '14px' }}
    >
      <thead>
        <tr style={{ background: '#FAFAFA' }}>
          {headers.map(h => (
            <th
              key={h}
              style={{
                padding: '10px 14px',
                textAlign: 'left',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 600,
                color: '#1D1D1D',
                borderBottom: '1px solid #F0F0F0',
              }}
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} style={{ borderBottom: i < rows.length - 1 ? '1px solid #F0F0F0' : 'none' }}>
            {row.map((cell, j) => (
              <td
                key={j}
                style={{
                  padding: '10px 14px',
                  fontFamily: "'Inter Tight', sans-serif",
                  color: '#3D3D3D',
                  verticalAlign: 'top',
                }}
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default function Terms() {
  return (
    <div style={{ background: '#FFFFFF', minHeight: '100vh' }}>
      <PublicHeader />
      <main className="max-w-[800px] mx-auto px-4 md:px-8 py-12 md:py-16">

        <Link
          to="/"
          style={{ fontSize: '14px', color: '#FF4C00', textDecoration: 'none', display: 'inline-block', marginBottom: '32px' }}
        >
          ← Back to Home
        </Link>

        <h1
          className="mb-2"
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            fontSize: '32px',
            color: '#1D1D1D',
            letterSpacing: '-0.5px',
          }}
        >
          Terms and Conditions
        </h1>
        <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: '13px', color: '#6B6B6B', marginBottom: '28px' }}>
          Last Updated: 25 May 2026 &bull; Version 1.0
        </p>

        {/* Important Notice Box */}
        <div
          style={{
            background: '#FFF0EB',
            borderLeft: '4px solid #FF4C00',
            borderRadius: '8px',
            padding: '16px 20px',
            marginBottom: '32px',
          }}
        >
          <p
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontSize: '15px',
              color: '#3D3D3D',
              lineHeight: '1.7',
              margin: 0,
            }}
          >
            <strong style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#1D1D1D' }}>IMPORTANT NOTICE: </strong>
            These Terms and Conditions ("Terms") govern your access to and use of the PolyTrade platform. By accessing or using the Platform, you agree to be legally bound by these Terms. If you do not agree, do not access or use the Platform. These Terms contain a binding arbitration clause and class action waiver. Please read them carefully.
          </p>
        </div>

        {/* ── Clause 1 ── */}
        <H>1. Introduction and Acceptance</H>
        <P>
          These Terms and Conditions ("Terms") constitute a legally binding agreement between you ("User," "you," or "your") and PolyTrade ("PolyTrade," "we," "us," or "our"), governing your use of the PolyTrade prediction market platform, website, mobile application, and all related services (collectively, the "Platform").
        </P>
        <P>
          By creating an account, accessing the Platform, depositing funds, or placing any trade, you confirm that you have read, understood, and agree to be bound by these Terms in their entirety, together with our Privacy Policy, which is incorporated herein by reference. Your continued use of the Platform constitutes ongoing acceptance of any amendments to these Terms.
        </P>
        <P>
          If you are using the Platform on behalf of a legal entity, you represent and warrant that you have the authority to bind that entity to these Terms, and all references to "you" include that entity.
        </P>

        {/* ── Clause 2 ── */}
        <H>2. Definitions</H>
        <P>In these Terms, the following definitions apply unless the context requires otherwise:</P>
        <Table
          headers={['Term', 'Definition']}
          rows={[
            ['Platform', 'The PolyTrade website, mobile application, APIs, and all associated services.'],
            ['User / you', 'Any individual or entity who accesses or uses the Platform.'],
            ['Market', 'A binary prediction market with a YES or NO outcome listed on the Platform.'],
            ['Share', 'A unit representing a position in a Market, priced between $0.01 and $0.99 USDT.'],
            ['USDT', 'Tether USD stablecoin (USDT), the sole currency used on the Platform.'],
            ['Position', 'A User\'s holding of YES or NO Shares in one or more Markets.'],
            ['Resolution Date', 'The date on which a Market outcome is determined and settled.'],
            ['Resolution Source', 'The official data source used to determine a Market\'s outcome.'],
            ['Payout', 'The USDT amount credited to a User upon winning resolution of a Market.'],
            ['Content', 'All text, graphics, data, software, and other material available on the Platform.'],
            ['Intellectual Property Rights', 'All patents, trademarks, copyrights, trade secrets, and other proprietary rights.'],
            ['Restricted Jurisdiction', 'India, the United States of America, China, and any other jurisdiction where use of the Platform is prohibited by applicable law.'],
          ]}
        />

        {/* ── Clause 3 ── */}
        <H>3. Platform Description and Eligibility</H>
        <P>
          PolyTrade operates prediction markets that allow Users to purchase YES or NO Shares on the outcome of real-world events in specified countries and categories. Markets are resolved based on publicly verifiable information from the designated Resolution Source. Winning Shares pay out $1.00 USDT per share; losing Shares expire worthless.
        </P>
        <P>
          <strong>Eligibility.</strong> To use the Platform you must: (a) be at least 18 years of age, or the age of majority in your jurisdiction if higher; (b) not be a resident of, or physically located in, a Restricted Jurisdiction at the time of use; (c) have the legal capacity to enter into binding contracts; (d) not be prohibited from using the Platform under any applicable law or regulation. By using the Platform you represent and warrant that all of the above conditions are satisfied.
        </P>
        <P>
          PolyTrade reserves the right to verify eligibility at any time and to suspend or terminate any account where eligibility requirements are not met. Access may be restricted in additional jurisdictions at PolyTrade's sole discretion.
        </P>

        {/* Clause 4 omitted */}

        {/* ── Clause 5 ── */}
        <H>5. User Accounts and Security</H>
        <P>
          To access most features of the Platform, you must register for a user account using a valid email address. You agree to provide accurate and current information at registration and to keep such information updated. You are responsible for maintaining the confidentiality of your login credentials and for all activity that occurs under your account.
        </P>
        <P>
          You must immediately notify PolyTrade if you become aware of any unauthorised use of your account or any breach of security. PolyTrade will not be liable for any loss or damage arising from your failure to comply with this obligation. You may not share your account with any third party or create multiple accounts.
        </P>
        <P>
          PolyTrade reserves the right to suspend or terminate any account at its sole discretion, including where it reasonably suspects fraudulent activity, violation of these Terms, or where required by applicable law.
        </P>

        {/* ── Clause 6 ── */}
        <H>6. Deposits, Balances and Withdrawals</H>
        <P>
          The Platform accepts deposits exclusively in USDT via the Polygon (MATIC) network. You are responsible for ensuring that deposits are sent to the correct wallet address and on the correct network. PolyTrade is not responsible for funds sent to incorrect addresses or on unsupported networks.
        </P>
        <P>
          Deposits are subject to manual verification by PolyTrade operations staff. Once confirmed, funds are credited to your Platform balance. Typical verification time is under two hours; delays may occur during periods of high volume. PolyTrade does not guarantee any specific processing time.
        </P>
        <P>
          Withdrawals are processed manually to the Polygon wallet address specified by you. The minimum withdrawal amount is $10.00 USDT. Withdrawals are processed within four hours of submission during normal operating hours. PolyTrade reserves the right to suspend withdrawals where required by law or where fraud is suspected. You are solely responsible for providing an accurate and valid destination wallet address; PolyTrade cannot reverse transactions sent to incorrect addresses.
        </P>

        {/* ── Clause 7 ── */}
        <H>7. Prediction Markets and Trading</H>
        <P>
          Markets on the Platform present a binary question with a YES or NO outcome. Users may purchase YES or NO Shares at the prevailing market price, which reflects the implied probability of the outcome (e.g., a price of 67¢ means 67% probability of YES). Shares are priced between $0.01 and $0.99. The total price of YES and NO shares for any position always sums to $1.00.
        </P>
        <P>
          Upon resolution, the winning side receives $1.00 USDT per Share held. The losing side receives $0.00. Resolutions are based solely on the designated Resolution Source and made at PolyTrade's final discretion. In the event of a disputed, ambiguous, or delayed resolution, PolyTrade may extend the Resolution Date, declare a no-resolution, or resolve using the best available evidence.
        </P>
        <P>
          PolyTrade does not guarantee liquidity in any Market. Markets may be paused, suspended, or voided if PolyTrade determines that the resolution criteria cannot be fairly satisfied or that the integrity of the market has been compromised. In such cases, all positions will be refunded at their purchase price.
        </P>

        {/* ── Clause 8 ── */}
        <H>8. Fees and Charges</H>
        <P>
          PolyTrade currently charges no fees on deposits, withdrawals, or trades. PolyTrade reserves the right to introduce transaction fees, spread, or other charges in the future. Users will be notified at least 14 days in advance of any fee change via the Platform or email. Your continued use of the Platform after such notice constitutes acceptance of the new fee structure.
        </P>
        <P>
          You are responsible for any blockchain network fees (gas fees) associated with depositing or withdrawing USDT on the Polygon network. These fees are determined by the network and are beyond PolyTrade's control.
        </P>

        {/* ── Clause 9 ── */}
        <H>9. Prohibited Conduct</H>
        <P>You agree not to engage in any of the following activities:</P>
        <P>
          (a) <strong>Market manipulation:</strong> trading in a manner designed to artificially influence market prices, including wash trading, spoofing, or coordinated manipulation with other users; (b) <strong>Fraud:</strong> providing false information to PolyTrade, impersonating another person, or using stolen payment methods; (c) <strong>Multiple accounts:</strong> creating or operating more than one account per individual; (d) <strong>Restricted jurisdiction usage:</strong> accessing the Platform from or on behalf of a Restricted Jurisdiction using VPNs, proxies, or other circumvention tools; (e) <strong>Automated trading abuse:</strong> using bots, scripts, or automated systems in a manner that disrupts the Platform or creates an unfair advantage; (f) <strong>Reverse engineering:</strong> decompiling, disassembling, or reverse engineering any part of the Platform; (g) <strong>Unlawful activity:</strong> using the Platform to launder money, finance terrorism, evade taxes, or engage in any other illegal activity.
        </P>
        <P>
          PolyTrade may suspend, terminate, or reverse transactions associated with prohibited conduct without prior notice and may report such activity to relevant authorities.
        </P>

        {/* ── Clause 10 ── */}
        <H>10. Intellectual Property Rights</H>
        <P>
          All Intellectual Property Rights in and to the Platform, including but not limited to the software, source code, design, logos, trademarks, and Content, are owned by or licensed to PolyTrade. These Terms do not grant you any rights in or to PolyTrade's Intellectual Property except for a limited, non-exclusive, non-transferable licence to access and use the Platform solely for your personal, non-commercial purposes in accordance with these Terms.
        </P>
        <P>
          You may not reproduce, distribute, modify, create derivative works of, publicly display, or otherwise exploit any PolyTrade Intellectual Property without prior written consent. The PolyTrade name, logo, and all related marks are trademarks of PolyTrade and may not be used without express written permission.
        </P>

        {/* ── Clause 11 ── */}
        <H>11. Risk Warning and Disclaimer</H>
        <P>
          <strong>Prediction market trading involves substantial risk of loss.</strong> The value of your positions may decrease rapidly and you may lose the entire amount you invest. Past market outcomes are not indicative of future results. You should only trade with funds you can afford to lose.
        </P>
        <P>
          The Platform is not a financial exchange, broker, investment adviser, or regulated financial service. Nothing on the Platform constitutes financial, investment, legal, or tax advice. PolyTrade does not recommend any particular Market, position, or strategy. You are solely responsible for your trading decisions.
        </P>
        <P>
          Prediction markets may be affected by: (a) market price volatility; (b) low liquidity or inability to exit a position; (c) technology failures including network outages and smart contract risks; (d) regulatory changes that may restrict or prohibit access; (e) errors in Resolution Source data or resolution disputes; (f) cybersecurity incidents. PolyTrade accepts no liability for losses arising from any of these risks.
        </P>

        {/* ── Clause 12 ── */}
        <H>12. Limitation of Liability</H>
        <P>
          To the maximum extent permitted by applicable law, PolyTrade and its directors, officers, employees, affiliates, agents, and licensors shall not be liable for any indirect, incidental, special, consequential, exemplary, or punitive damages, including but not limited to loss of profits, loss of data, loss of goodwill, or service interruption, arising out of or in connection with your use of or inability to use the Platform.
        </P>
        <P>
          PolyTrade's total aggregate liability to you for any claims arising under or in connection with these Terms shall not exceed the greater of: (a) the total fees paid by you to PolyTrade in the twelve months preceding the claim; or (b) USD $100.
        </P>
        <P>
          The Platform is provided "as is" and "as available" without warranties of any kind, whether express or implied, including merchantability, fitness for a particular purpose, title, or non-infringement. PolyTrade does not warrant that the Platform will be uninterrupted, error-free, or free of viruses or other harmful components.
        </P>

        {/* ── Clause 13 ── */}
        <H>13. Indemnification</H>
        <P>
          You agree to indemnify, defend, and hold harmless PolyTrade and its directors, officers, employees, agents, affiliates, and licensors from and against any and all claims, liabilities, damages, losses, costs, and expenses (including reasonable legal fees) arising out of or relating to: (a) your use of the Platform; (b) your violation of these Terms; (c) your violation of any applicable law or regulation; (d) your violation of any third-party rights; or (e) any content you submit to or through the Platform.
        </P>
        <P>
          PolyTrade reserves the right, at your expense, to assume exclusive defence and control of any matter subject to indemnification by you, and you agree to cooperate with PolyTrade's defence of such claims.
        </P>

        {/* ── Clause 14 ── */}
        <H>14. Dispute Resolution and Arbitration</H>
        <P>
          In the event of any dispute, claim, or controversy arising out of or relating to these Terms or the Platform ("Dispute"), the parties agree to first attempt to resolve the Dispute informally by contacting PolyTrade at the address provided below. If the Dispute is not resolved within 30 days, either party may initiate binding arbitration.
        </P>
        <P>
          <strong>Binding Arbitration.</strong> Any unresolved Dispute shall be finally and exclusively resolved by binding arbitration administered under the rules of a mutually agreed arbitral institution. The arbitration shall be conducted by a single arbitrator, in the English language. The arbitral award shall be final and binding and may be enforced in any court of competent jurisdiction.
        </P>
        <P>
          <strong>Class Action Waiver.</strong> You agree that any arbitration shall be conducted in your individual capacity only and not as a class action or other representative action. You expressly waive any right to file a class action or seek relief on a class basis. If this waiver is found unenforceable, the entire arbitration provision shall be null and void.
        </P>
        <P>
          Notwithstanding the foregoing, either party may seek emergency injunctive or other equitable relief from a court of competent jurisdiction to prevent irreparable harm pending the outcome of arbitration.
        </P>

        {/* ── Clause 15 ── */}
        <H>15. Governing Law</H>
        <P>
          These Terms shall be governed by and construed in accordance with applicable law, without regard to conflict-of-laws principles. To the extent that arbitration does not apply, you irrevocably submit to the exclusive jurisdiction of the courts specified in any applicable arbitral rules for resolution of any Dispute.
        </P>
        <P>
          Notwithstanding the foregoing, PolyTrade may seek injunctive or other relief in any court of competent jurisdiction to protect its Intellectual Property Rights or confidential information.
        </P>

        {/* ── Clause 16 ── */}
        <H>16. General Provisions</H>
        <P>
          <strong>Entire Agreement.</strong> These Terms, together with the Privacy Policy and any other policies incorporated by reference, constitute the entire agreement between you and PolyTrade with respect to the Platform and supersede all prior agreements and understandings.
        </P>
        <P>
          <strong>Amendments.</strong> PolyTrade may amend these Terms at any time by posting the revised Terms on the Platform with an updated "Last Updated" date. Material changes will be notified via email or prominent in-Platform notice. Your continued use after the effective date of changes constitutes acceptance.
        </P>
        <P>
          <strong>Severability.</strong> If any provision of these Terms is found to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect.
        </P>
        <P>
          <strong>Waiver.</strong> PolyTrade's failure to enforce any right or provision of these Terms shall not constitute a waiver of such right or provision.
        </P>
        <P>
          <strong>Assignment.</strong> You may not assign or transfer any rights or obligations under these Terms without PolyTrade's prior written consent. PolyTrade may freely assign these Terms in connection with a merger, acquisition, or sale of assets.
        </P>
        <P>
          <strong>Contact.</strong> For questions about these Terms, please contact us at: legal@polytrade.live
        </P>

      </main>
      <Footer />
    </div>
  );
}
