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

const H3 = ({ children }: { children: React.ReactNode }) => (
  <h3
    className="mt-5 mb-2"
    style={{
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 600,
      fontSize: '15px',
      color: '#1D1D1D',
    }}
  >
    {children}
  </h3>
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

export default function Privacy() {
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
          Privacy Policy
        </h1>
        <p style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: '13px', color: '#6B6B6B', marginBottom: '32px' }}>
          Last Updated: 25 May 2026 &bull; Version 1.0
        </p>

        {/* ── Clause 1 ── */}
        <H>1. Introduction</H>
        <P>
          PolyTrade ("we," "us," or "our") is committed to protecting the privacy of our users. This Privacy Policy describes how we collect, use, disclose, retain, and protect personal information when you use the PolyTrade platform, website, mobile application, and related services (collectively, the "Platform").
        </P>
        <P>
          This policy applies to all users of the Platform regardless of location. We process personal data in accordance with applicable privacy and data protection laws, including the General Data Protection Regulation (GDPR) where applicable, the UK GDPR, and other equivalent legislation.
        </P>
        <P>
          By using the Platform you acknowledge that you have read and understood this Privacy Policy. If you do not agree with our data practices, please do not use the Platform.
        </P>

        {/* ── Clause 2 ── */}
        <H>2. Information We Collect</H>
        <P>
          We collect personal information in the following categories. Information marked as required is necessary to provide the core Platform services; optional information improves your experience but is not mandatory.
        </P>
        <H3>2.1 Categories of Personal Data</H3>
        <Table
          headers={['Category', 'Examples', 'Required?']}
          rows={[
            ['Account Information', 'Email address, username, password (hashed)', 'Required'],
            ['Financial Information', 'USDT wallet addresses, deposit and withdrawal amounts, transaction history', 'Required'],
            ['Usage Data', 'Pages visited, features used, click patterns, session duration, IP address', 'Automatic'],
            ['Device & Technical Data', 'Browser type and version, operating system, device identifiers, time zone', 'Automatic'],
            ['Communications', 'Emails and messages sent to our support team, feedback submitted through the Platform', 'Where provided'],
            ['Geolocation Data', 'Country-level location derived from IP address (used for restricted jurisdiction checks)', 'Automatic'],
          ]}
        />
        <H3>2.2 Information We Do Not Collect</H3>
        <P>
          PolyTrade does not currently require or collect government-issued identity documents, passport or ID card scans, facial photographs or biometric data, proof of address documents, or source-of-funds documentation. We do not perform automated identity verification or liveness checks.
        </P>
        <H3>2.3 Children's Data</H3>
        <P>
          The Platform is not directed to individuals under the age of 18. We do not knowingly collect personal information from minors. If we become aware that we have collected data from a person under 18, we will delete it promptly.
        </P>

        {/* ── Clause 3 ── */}
        <H>3. Lawful Basis for Processing</H>
        <P>
          Where the GDPR applies, we rely on the following lawful bases to process your personal data:
        </P>
        <Table
          headers={['Processing Activity', 'Lawful Basis', 'Details']}
          rows={[
            ['Account creation and authentication', 'Contract', 'Necessary to provide the Platform services you have requested.'],
            ['Processing deposits and withdrawals', 'Contract', 'Necessary to execute financial transactions on your behalf.'],
            ['Displaying market data and trade history', 'Contract', 'Necessary to provide core Platform functionality.'],
            ['Platform security and fraud prevention', 'Legitimate interests', 'We have a legitimate interest in preventing fraud and protecting Platform integrity.'],
            ['Analytics and Platform improvement', 'Legitimate interests', 'We have a legitimate interest in understanding how the Platform is used to improve it.'],
            ['Marketing communications (optional)', 'Consent', 'We only send marketing emails where you have opted in. You may withdraw consent at any time.'],
            ['Restricted jurisdiction enforcement', 'Legitimate interests / Legal obligation', 'We check country-level IP location to prevent access from Restricted Jurisdictions.'],
            ['Responding to legal requests', 'Legal obligation', 'We may be required by law to disclose certain data to regulatory or law enforcement authorities.'],
          ]}
        />

        {/* Clause 4 omitted */}

        {/* ── Clause 5 ── */}
        <H>5. How We Use Your Information</H>
        <P>We use the personal information we collect for the following purposes:</P>
        <P>
          (a) <strong>Providing the Platform:</strong> creating and managing your account, processing deposits and withdrawals, displaying markets and trade history, and resolving disputes; (b) <strong>Security:</strong> detecting and preventing fraud, abuse, and unauthorised access; (c) <strong>Communications:</strong> sending transactional emails (account confirmations, deposit/withdrawal notifications, market resolutions), service announcements, and — where you have consented — marketing communications; (d) <strong>Analytics:</strong> understanding how users interact with the Platform to improve features, performance, and user experience; (e) <strong>Legal compliance:</strong> complying with applicable laws, responding to legal requests, and enforcing our Terms and Conditions; (f) <strong>Jurisdiction enforcement:</strong> detecting and blocking access from Restricted Jurisdictions.
        </P>
        <P>
          We do not use your personal data for automated decision-making that produces legal or similarly significant effects, except for the automated blocking of access from Restricted Jurisdictions based on IP geolocation.
        </P>

        {/* ── Clause 6 ── */}
        <H>6. Sharing of Your Information</H>
        <P>
          We do not sell, rent, or trade your personal information to third parties for their marketing purposes. We may share your information in the following circumstances:
        </P>
        <P>
          (a) <strong>Service providers:</strong> we engage trusted third-party vendors to assist with email delivery, analytics, hosting, and security. These vendors are contractually bound to process data only on our instructions and in accordance with applicable law; (b) <strong>Business transfers:</strong> if PolyTrade is acquired by or merged with another company, your information may be transferred as part of that transaction, subject to the same protections described in this Policy; (c) <strong>Legal requirements:</strong> we may disclose your information where required by applicable law, court order, or governmental authority; (d) <strong>Protection of rights:</strong> we may disclose information where necessary to protect the rights, property, or safety of PolyTrade, our users, or the public.
        </P>
        <P>
          We will notify you of any material change to how we share your information, subject to legal constraints.
        </P>

        {/* ── Clause 7 ── */}
        <H>7. International Data Transfers</H>
        <P>
          PolyTrade may transfer your personal data to countries outside your jurisdiction, including countries that may not provide the same level of data protection as your home country. Where we transfer data internationally, we implement appropriate safeguards such as Standard Contractual Clauses approved by relevant data protection authorities, or we transfer to countries that have been deemed to provide an adequate level of protection.
        </P>
        <P>
          You may request information about the specific safeguards we have in place for international transfers by contacting us at privacy@polytrade.live.
        </P>

        {/* ── Clause 8 ── */}
        <H>8. Data Retention</H>
        <P>
          We retain your personal information for as long as necessary to fulfil the purposes for which it was collected, including providing Platform services, complying with legal obligations, resolving disputes, and enforcing our agreements.
        </P>
        <P>
          In general: account information is retained for the duration of your account plus a period of up to five years after account closure; financial transaction records are retained for a minimum of five years to comply with financial recordkeeping requirements; analytics and usage data is retained for up to 24 months in identifiable form; support communications are retained for up to three years.
        </P>
        <P>
          When data is no longer required, we delete or anonymise it in accordance with our data retention schedule.
        </P>

        {/* ── Clause 9 ── */}
        <H>9. Your Rights</H>
        <P>
          Depending on your location and applicable law, you may have the following rights with respect to your personal data:
        </P>
        <Table
          headers={['Right', 'Description']}
          rows={[
            ['Access', 'Request a copy of the personal data we hold about you.'],
            ['Rectification', 'Request correction of inaccurate or incomplete personal data.'],
            ['Erasure', 'Request deletion of your personal data, subject to certain legal exceptions.'],
            ['Restriction', 'Request that we restrict processing of your data in certain circumstances.'],
            ['Data Portability', 'Receive your personal data in a structured, machine-readable format.'],
            ['Objection', 'Object to processing based on legitimate interests or for direct marketing.'],
            ['Withdraw Consent', 'Where processing is based on consent, withdraw that consent at any time without affecting the lawfulness of prior processing.'],
          ]}
        />
        <P>
          To exercise any of these rights, please contact us at privacy@polytrade.live. We will respond within 30 days. We may ask you to verify your identity before processing your request. Certain rights may be limited where we have legal obligations to retain data.
        </P>

        {/* ── Clause 10 ── */}
        <H>10. Cookies and Tracking Technologies</H>
        <P>
          We use cookies and similar tracking technologies to enhance your experience on the Platform, analyse usage patterns, and support Platform functionality.
        </P>
        <P>
          <strong>Essential cookies</strong> are necessary for the Platform to function and cannot be disabled. <strong>Analytics cookies</strong> help us understand how users interact with the Platform (e.g., via Google Analytics). <strong>Preference cookies</strong> remember your settings and choices.
        </P>
        <P>
          You can control and manage cookies through your browser settings. Disabling certain cookies may affect Platform functionality. Where required by law, we will request your consent before placing non-essential cookies.
        </P>

        {/* ── Clause 11 ── */}
        <H>11. Security</H>
        <P>
          We implement industry-standard technical and organisational measures to protect your personal data against unauthorised access, disclosure, alteration, or destruction. These measures include encryption of data in transit (TLS), secure credential storage (password hashing), access controls limiting data access to authorised personnel, and regular security reviews.
        </P>
        <P>
          However, no method of transmission over the internet or electronic storage is completely secure. While we strive to protect your personal information, we cannot guarantee its absolute security. You are responsible for keeping your account credentials confidential.
        </P>
        <P>
          In the event of a personal data breach that is likely to result in a high risk to your rights and freedoms, we will notify you without undue delay as required by applicable law.
        </P>

        {/* ── Clause 12 ── */}
        <H>12. Children's Privacy</H>
        <P>
          The Platform is intended for use by adults aged 18 and over. We do not knowingly collect personal data from individuals under 18. If you are a parent or guardian and believe your child has provided personal data to PolyTrade without your consent, please contact us at privacy@polytrade.live and we will take steps to delete such data promptly.
        </P>

        {/* ── Clause 13 ── */}
        <H>13. Third-Party Links and Services</H>
        <P>
          The Platform may contain links to third-party websites, services, or resources. This Privacy Policy applies solely to the PolyTrade Platform. We are not responsible for the privacy practices or content of any third-party sites. We encourage you to read the privacy policies of any third-party services you access through or in connection with the Platform.
        </P>
        <P>
          Third-party services we may use include Google Analytics (analytics), Supabase (database infrastructure), and email delivery providers. Each third party processes data in accordance with its own privacy policy and applicable law.
        </P>

        {/* ── Clause 14 ── */}
        <H>14. Changes to This Privacy Policy</H>
        <P>
          We may update this Privacy Policy from time to time to reflect changes in our data practices, legal requirements, or Platform features. We will post the updated policy on the Platform with a new "Last Updated" date. For material changes, we will provide advance notice via email or a prominent in-Platform notice.
        </P>
        <P>
          Your continued use of the Platform after the effective date of any changes constitutes your acceptance of the updated Privacy Policy.
        </P>

        {/* ── Clause 15 ── */}
        <H>15. Contact Us</H>
        <P>
          If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact our data privacy team:
        </P>
        <P>
          <strong>Email:</strong> privacy@polytrade.live<br />
          <strong>Data Controller:</strong> PolyTrade<br />
          <strong>Response time:</strong> We aim to respond to all privacy inquiries within 30 days.
        </P>

        {/* ── Clause 16 ── */}
        <H>16. Complaints</H>
        <P>
          If you believe we have processed your personal data in breach of applicable law, you have the right to lodge a complaint with the relevant data protection supervisory authority in your jurisdiction. In the European Economic Area, this is the data protection authority of the EU member state in which you reside or work. In the UK, this is the Information Commissioner's Office (ICO).
        </P>
        <P>
          We encourage you to contact us directly in the first instance so that we can address your concern before you escalate to a supervisory authority.
        </P>

        {/* ── Clause 17 ── */}
        <H>17. Jurisdiction-Specific Provisions</H>
        <P>
          <strong>European Economic Area and UK.</strong> Where the GDPR or UK GDPR applies to your use of the Platform, you have the rights described in Clause 9 and may lodge complaints as described in Clause 16. Our lawful bases for processing are set out in Clause 3.
        </P>
        <P>
          <strong>California (CCPA/CPRA).</strong> California residents have the right to know what personal data we collect and how it is used, the right to delete personal data, the right to opt out of the sale of personal data (we do not sell personal data), and the right to non-discrimination for exercising privacy rights. To exercise these rights, contact privacy@polytrade.live.
        </P>
        <P>
          <strong>Other jurisdictions.</strong> Users in other jurisdictions may have additional privacy rights under local law. We will endeavour to honour rights requests consistent with applicable law in your jurisdiction.
        </P>

      </main>
      <Footer />
    </div>
  );
}
