import { Link } from 'react-router-dom'

function Privacy() {
  return (
    <div className="bg-white">
      {/* Hero Banner */}
      <div className="bg-navy-900 pt-24 pb-16 lg:pt-28 lg:pb-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <div className="section-label justify-center mb-4 text-amber-400 before:bg-amber-400">
            Legal
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-navy-300">Last Updated: January 2025</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <div className="prose prose-navy max-w-none">
          <section className="mb-10">
            <h2 className="font-serif text-2xl font-semibold text-navy-900 mb-4">1. Introduction</h2>
            <p className="text-navy-600 leading-relaxed mb-4">
              Release Properties ("Company," "we," "us," or "our") is committed to protecting your privacy. This
              Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our
              website and use our services.
            </p>
            <p className="text-navy-600 leading-relaxed">
              Please read this Privacy Policy carefully. By using our website and services, you consent to the
              practices described in this policy.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-2xl font-semibold text-navy-900 mb-4">2. Information We Collect</h2>

            <h3 className="font-serif text-xl font-medium text-navy-800 mb-3">2.1 Personal Information</h3>
            <p className="text-navy-600 leading-relaxed mb-4">
              When you submit a property inquiry through our website, we collect the following personal information:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-navy-600">
              <li><strong>Contact Information:</strong> Full name, email address, phone number</li>
              <li><strong>Property Information:</strong> Street address, city, state/province, ZIP/postal code, country</li>
              <li><strong>Communication Preferences:</strong> Your consent to receive calls, texts, and emails</li>
            </ul>

            <h3 className="font-serif text-xl font-medium text-navy-800 mb-3">2.2 Automatically Collected Information</h3>
            <p className="text-navy-600 leading-relaxed mb-4">
              When you visit our website, we may automatically collect certain information, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-navy-600">
              <li><strong>Device Information:</strong> Browser type, operating system, device type</li>
              <li><strong>Usage Data:</strong> Pages visited, time spent on pages, click patterns</li>
              <li><strong>Location Data:</strong> General geographic location based on IP address</li>
              <li><strong>Cookies and Tracking Technologies:</strong> See Section 7 for details</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-2xl font-semibold text-navy-900 mb-4">3. How We Use Your Information</h2>
            <p className="text-navy-600 leading-relaxed mb-4">We use the information we collect for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2 text-navy-600">
              <li><strong>Service Delivery:</strong> To evaluate your property and provide you with a cash offer</li>
              <li><strong>Communication:</strong> To contact you regarding your inquiry via phone, text, or email</li>
              <li><strong>Marketing:</strong> To send you promotional materials about our services (with your consent)</li>
              <li><strong>Improvement:</strong> To improve our website and services based on user behavior</li>
              <li><strong>Legal Compliance:</strong> To comply with applicable laws and regulations</li>
              <li><strong>Protection:</strong> To protect against fraudulent or illegal activity</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-2xl font-semibold text-navy-900 mb-4">
              4. Text Message (SMS) and Telephone Communications
            </h2>

            <div className="bg-amber-50 border border-amber-200 p-6 mb-6">
              <h3 className="font-serif text-lg font-medium text-navy-900 mb-3">TCPA Disclosure</h3>
              <p className="text-navy-600 leading-relaxed mb-4">
                By providing your phone number and checking the consent box on our form, you expressly consent to receive:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2 text-navy-600">
                <li>Telephone calls (including calls made using an automatic telephone dialing system or prerecorded voice)</li>
                <li>Text messages (SMS and MMS)</li>
              </ul>
              <p className="text-navy-600 leading-relaxed">
                These communications may be sent for: responding to your property inquiry, providing information about
                your cash offer, and sending marketing and promotional messages about our services.
              </p>
            </div>

            <h3 className="font-serif text-xl font-medium text-navy-800 mb-3">Message Frequency</h3>
            <p className="text-navy-600 leading-relaxed mb-6">
              Message frequency varies based on your inquiry and interactions with us. You may receive multiple
              messages during the offer process.
            </p>

            <h3 className="font-serif text-xl font-medium text-navy-800 mb-3">Message and Data Rates</h3>
            <p className="text-navy-600 leading-relaxed mb-6">
              Standard message and data rates may apply to any text messages we send or you send to us. Please check
              with your mobile carrier for details about your plan.
            </p>

            <h3 className="font-serif text-xl font-medium text-navy-800 mb-3">Opting Out</h3>
            <p className="text-navy-600 leading-relaxed mb-4">You may opt out of receiving text messages at any time by:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-navy-600">
              <li><strong>Replying STOP</strong> to any text message you receive from us</li>
              <li>Contacting us at contact@releaseproperties.com</li>
            </ul>
            <p className="text-navy-600 leading-relaxed mb-6">
              After opting out, you will receive a confirmation message. Opting out of text messages does not opt you
              out of phone calls or emails unless you specifically request this.
            </p>

            <h3 className="font-serif text-xl font-medium text-navy-800 mb-3">Help</h3>
            <p className="text-navy-600 leading-relaxed">
              For help with text messages, reply HELP to any message or contact us at contact@releaseproperties.com.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-2xl font-semibold text-navy-900 mb-4">5. Information Sharing and Disclosure</h2>
            <p className="text-navy-600 leading-relaxed mb-4">We may share your information in the following circumstances:</p>

            <h3 className="font-serif text-xl font-medium text-navy-800 mb-3">5.1 Service Providers</h3>
            <p className="text-navy-600 leading-relaxed mb-4">
              We may share your information with third-party service providers who perform services on our behalf, such as:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-navy-600">
              <li>Customer relationship management (CRM) systems</li>
              <li>Email and SMS marketing platforms</li>
              <li>Analytics providers</li>
              <li>Title companies and escrow services (during a transaction)</li>
            </ul>

            <h3 className="font-serif text-xl font-medium text-navy-800 mb-3">5.2 Business Transfers</h3>
            <p className="text-navy-600 leading-relaxed mb-6">
              If we are involved in a merger, acquisition, or sale of assets, your information may be transferred as
              part of that transaction.
            </p>

            <h3 className="font-serif text-xl font-medium text-navy-800 mb-3">5.3 Legal Requirements</h3>
            <p className="text-navy-600 leading-relaxed mb-6">
              We may disclose your information if required by law or in response to legal process, such as a subpoena
              or court order.
            </p>

            <h3 className="font-serif text-xl font-medium text-navy-800 mb-3">5.4 Protection of Rights</h3>
            <p className="text-navy-600 leading-relaxed">
              We may disclose your information to protect our rights, privacy, safety, or property, or that of our
              users or others.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-2xl font-semibold text-navy-900 mb-4">6. Data Security</h2>
            <p className="text-navy-600 leading-relaxed mb-4">
              We implement appropriate technical and organizational measures to protect your personal information
              against unauthorized access, alteration, disclosure, or destruction. These measures include:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-navy-600">
              <li>Encryption of data in transit using SSL/TLS</li>
              <li>Secure storage of personal information</li>
              <li>Limited access to personal information by employees</li>
              <li>Regular security assessments</li>
            </ul>
            <p className="text-navy-600 leading-relaxed">
              However, no method of transmission over the Internet or electronic storage is 100% secure. While we
              strive to protect your information, we cannot guarantee its absolute security.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-2xl font-semibold text-navy-900 mb-4">7. Cookies and Tracking Technologies</h2>
            <p className="text-navy-600 leading-relaxed mb-4">
              We use cookies and similar tracking technologies to collect information about your browsing activities.
              These technologies help us:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-navy-600">
              <li>Remember your preferences</li>
              <li>Understand how you use our website</li>
              <li>Improve our website and services</li>
              <li>Deliver targeted advertising</li>
            </ul>
            <p className="text-navy-600 leading-relaxed">
              You can control cookies through your browser settings. However, disabling cookies may limit your ability
              to use certain features of our website.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-2xl font-semibold text-navy-900 mb-4">8. Your Rights and Choices</h2>
            <p className="text-navy-600 leading-relaxed mb-4">
              Depending on your location, you may have certain rights regarding your personal information:
            </p>

            <h3 className="font-serif text-xl font-medium text-navy-800 mb-3">8.1 Access and Correction</h3>
            <p className="text-navy-600 leading-relaxed mb-6">
              You may request access to your personal information and ask us to correct any inaccuracies.
            </p>

            <h3 className="font-serif text-xl font-medium text-navy-800 mb-3">8.2 Deletion</h3>
            <p className="text-navy-600 leading-relaxed mb-6">
              You may request that we delete your personal information, subject to certain exceptions required by law.
            </p>

            <h3 className="font-serif text-xl font-medium text-navy-800 mb-3">8.3 Opt-Out</h3>
            <p className="text-navy-600 leading-relaxed mb-4">You may opt out of:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-navy-600">
              <li><strong>Text Messages:</strong> Reply STOP to any text message</li>
              <li><strong>Marketing Emails:</strong> Click the unsubscribe link in any email</li>
              <li><strong>Phone Calls:</strong> Request to be added to our do-not-call list</li>
            </ul>

            <h3 className="font-serif text-xl font-medium text-navy-800 mb-3">8.4 California Residents</h3>
            <p className="text-navy-600 leading-relaxed mb-6">
              California residents have additional rights under the California Consumer Privacy Act (CCPA), including
              the right to know what personal information is collected, the right to delete personal information, and
              the right to opt out of the sale of personal information. We do not sell your personal information.
            </p>

            <h3 className="font-serif text-xl font-medium text-navy-800 mb-3">8.5 Canadian Residents</h3>
            <p className="text-navy-600 leading-relaxed">
              Canadian residents have rights under the Personal Information Protection and Electronic Documents Act
              (PIPEDA), including the right to access and correct your personal information.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-2xl font-semibold text-navy-900 mb-4">9. Data Retention</h2>
            <p className="text-navy-600 leading-relaxed">
              We retain your personal information for as long as necessary to fulfill the purposes for which it was
              collected, including to satisfy legal, accounting, or reporting requirements. When we no longer need
              your information, we will securely delete or anonymize it.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-2xl font-semibold text-navy-900 mb-4">10. Third-Party Links</h2>
            <p className="text-navy-600 leading-relaxed">
              Our website may contain links to third-party websites. We are not responsible for the privacy practices
              of these websites. We encourage you to read the privacy policies of any third-party websites you visit.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-2xl font-semibold text-navy-900 mb-4">11. Children's Privacy</h2>
            <p className="text-navy-600 leading-relaxed">
              Our website and services are not intended for children under 18 years of age. We do not knowingly
              collect personal information from children. If we learn that we have collected personal information from
              a child under 18, we will delete that information promptly.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-2xl font-semibold text-navy-900 mb-4">12. Changes to This Privacy Policy</h2>
            <p className="text-navy-600 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the
              new Privacy Policy on this page and updating the "Last Updated" date. Your continued use of our website
              and services after any changes indicates your acceptance of the updated Privacy Policy.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-2xl font-semibold text-navy-900 mb-4">13. Contact Us</h2>
            <p className="text-navy-600 leading-relaxed mb-4">
              If you have any questions about this Privacy Policy or our privacy practices, please contact us at:
            </p>
            <div className="bg-navy-50 border border-navy-200 p-6">
              <p className="font-semibold text-navy-900">Release Properties</p>
              <p className="text-navy-600">Email: contact@releaseproperties.com</p>
            </div>
            <p className="text-navy-600 leading-relaxed mt-4">
              You may also exercise your privacy rights by contacting us at the email address above.
            </p>
          </section>
        </div>

        {/* Navigation */}
        <div className="mt-12 pt-8 border-t border-navy-200 flex justify-between items-center text-sm">
          <Link to="/terms" className="text-amber-600 hover:text-amber-700 font-medium inline-flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Terms of Service
          </Link>
          <Link to="/" className="text-amber-600 hover:text-amber-700 font-medium inline-flex items-center gap-2">
            Return to Home
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Privacy
