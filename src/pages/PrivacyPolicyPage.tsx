import React from 'react';
import './PrivacyPolicyPage.css';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="privacy-policy-page">
      <div className="container">
        <div className="privacy-header">
          <h1>Privacy Policy</h1>
          <p className="effective-date">Effective Date: June 2025</p>
        </div>

        <div className="privacy-content">
          <div className="intro-section">
            <p>
              At Sunrise Scents, we value your privacy and are committed to protecting your personal information. 
              This Privacy Policy describes how your information is collected, used, and shared when you visit 
              or make a purchase from <a href="https://www.sunrisescents.com" target="_blank" rel="noopener noreferrer">www.sunrisescents.com</a> (the "Site").
            </p>
          </div>

          <section className="policy-section">
            <h2>1. Personal Information We Collect</h2>
            <p>When we talk about "Personal Information," we refer to both:</p>
            
            <div className="subsection">
              <h3>Device Information</h3>
              <p>Automatically collected when you browse the Site. Includes:</p>
              <ul>
                <li>IP address</li>
                <li>Web browser and time zone</li>
                <li>Cookies installed on your device</li>
                <li>Referring URLs, search terms, pages visited, and browsing behavior</li>
              </ul>
              <p>Collected using:</p>
              <ul>
                <li>Cookies (learn more or opt out: <a href="http://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer">www.allaboutcookies.org</a>)</li>
                <li>Log files, tags, pixels, and web beacons</li>
              </ul>
            </div>

            <div className="subsection">
              <h3>Order Information</h3>
              <p>Collected when you place or attempt to place an order. Includes:</p>
              <ul>
                <li>Name, shipping/billing addresses</li>
                <li>Email address and phone number</li>
                <li>Payment info (credit/debit, PayPal, Afterpay)</li>
              </ul>
            </div>
          </section>

          <section className="policy-section">
            <h2>2. How We Use Your Personal Information</h2>
            <p>We use your data to:</p>
            <ul>
              <li>Fulfill orders and provide shipping confirmations</li>
              <li>Communicate with you (e.g., order status, customer service)</li>
              <li>Detect fraud and unauthorized activity</li>
              <li>Send promotional or abandoned cart reminders (if opted-in)</li>
              <li>Optimize the Site experience using analytics</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>3. Sharing Your Information</h2>
            <p>We share your data only as needed to run our business:</p>
            <ul>
              <li><strong>Stripe, PayPal</strong> – payment processors</li>
              <li><strong>USPS, UPS, DHL</strong> – shipping carriers</li>
              <li><strong>Google Analytics</strong> – performance and customer behavior analytics (<a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy</a>)
                <ul>
                  <li>Opt out: <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">https://tools.google.com/dlpage/gaoptout</a></li>
                </ul>
              </li>
            </ul>
            <p>We may also disclose your data:</p>
            <ul>
              <li>To comply with laws or legal requests</li>
              <li>To enforce our rights or protect our users</li>
            </ul>
          </section>

          <section className="policy-section">
            <h2>4. Targeted Advertising & Behavioral Tracking</h2>
            <p>We may use your information to serve targeted ads across platforms like:</p>
            <ul>
              <li><strong>Facebook:</strong> <a href="https://www.facebook.com/settings/?tab=ads" target="_blank" rel="noopener noreferrer">https://www.facebook.com/settings/?tab=ads</a></li>
              <li><strong>Google:</strong> <a href="https://www.google.com/settings/ads/anonymous" target="_blank" rel="noopener noreferrer">https://www.google.com/settings/ads/anonymous</a></li>
              <li><strong>Bing:</strong> <a href="https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads" target="_blank" rel="noopener noreferrer">Microsoft Advertising</a></li>
            </ul>
            <p>You can also opt out at: <a href="http://optout.aboutads.info" target="_blank" rel="noopener noreferrer">http://optout.aboutads.info</a></p>
          </section>

          <section className="policy-section">
            <h2>5. Email & SMS Marketing</h2>
            <p>By entering your phone number or email at checkout or via opt-in:</p>
            <ul>
              <li>You agree to receive transactional and marketing messages (e.g., order updates, product offers, cart reminders)</li>
              <li>Message frequency may vary; data/message rates may apply</li>
              <li>Reply STOP to unsubscribe from texts</li>
              <li>Use the unsubscribe link in our emails at any time</li>
            </ul>
            <p>
              We may use third-party platforms to send messages and share your info with them only to deliver those services. 
              We do not sell or lease your phone number or email.
            </p>
          </section>

          <section className="policy-section">
            <h2>6. Your Responsibilities</h2>
            <p>
              You agree to provide accurate and up-to-date information when using our Site, especially when completing 
              transactions or signing up for marketing.
            </p>
            <p>
              We reserve the right to deny service or revoke access for fraudulent or misleading behavior.
            </p>
          </section>

          <section className="policy-section">
            <h2>7. California Residents (CCPA)</h2>
            <p>If you're a California resident, you have the right to:</p>
            <ul>
              <li>Know what personal info we collect and how it's used</li>
              <li>Request access, correction, or deletion of your data</li>
              <li>Opt out of having your personal data shared with third parties for direct marketing</li>
            </ul>
            <p>To submit a request, contact us at: <a href="mailto:customersupport@sunrisescents.com">customersupport@sunrisescents.com</a></p>
          </section>

          <section className="policy-section">
            <h2>8. Do Not Track (DNT) Signals</h2>
            <p>We do not alter our data collection practices in response to DNT signals from your browser.</p>
          </section>

          <section className="policy-section">
            <h2>9. Data Retention</h2>
            <p>We store your Order Information for as long as necessary to:</p>
            <ul>
              <li>Fulfill your purchase</li>
              <li>Comply with legal obligations</li>
              <li>Resolve disputes</li>
              <li>Enforce agreements</li>
            </ul>
            <p>You may request deletion by contacting <a href="mailto:customersupport@sunrisescents.com">customersupport@sunrisescents.com</a>.</p>
          </section>

          <section className="policy-section">
            <h2>10. Business Transfers</h2>
            <p>
              If Sunrise Scents is acquired or merged, your personal information may be transferred to the new entity 
              to ensure service continuity.
            </p>
          </section>

          <section className="policy-section">
            <h2>11. Changes to This Policy</h2>
            <p>
              We may update this policy to reflect changes in operations, law, or technology. Changes will be posted 
              here with a new effective date.
            </p>
          </section>

          <section className="policy-section">
            <h2>12. Contact Us</h2>
            <div className="contact-info">
              <p>📧 <a href="mailto:customersupport@sunrisescents.com">customersupport@sunrisescents.com</a></p>
              <p>📬 Sunrise Scents<br/>
                 PO Box 241<br/>
                 Quechee, Vermont 05059
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
