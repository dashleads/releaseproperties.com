import { Link } from 'react-router-dom'

function Terms() {
  return (
    <div className="bg-white">
      {/* Hero Banner */}
      <div className="bg-navy-900 pt-24 pb-16 lg:pt-28 lg:pb-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <div className="section-label justify-center mb-4 text-amber-400 before:bg-amber-400">
            Legal
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-navy-300">Last Updated: January 2025</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
        <div className="prose prose-navy max-w-none">
          <section className="mb-10">
            <h2 className="font-serif text-2xl font-semibold text-navy-900 mb-4">1. Acceptance of Terms</h2>
            <p className="text-navy-600 leading-relaxed mb-4">
              By accessing and using the Release Properties website ("Website") and services ("Services"), you agree
              to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use
              our Website or Services.
            </p>
            <p className="text-navy-600 leading-relaxed">
              These Terms constitute a legally binding agreement between you and 14163729 Canada Inc., doing business as
              "Release Properties" ("Company," "we," "us," or "our"). We reserve the right to modify these Terms at any
              time, and such modifications will be effective immediately upon posting on the Website.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-2xl font-semibold text-navy-900 mb-4">2. Description of Services</h2>
            <p className="text-navy-600 leading-relaxed mb-4">
              Release Properties provides a platform for property owners to receive cash offers on their real estate
              properties, including but not limited to:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-navy-600">
              <li>Single-family homes</li>
              <li>Multi-family properties</li>
              <li>Vacant land</li>
              <li>Commercial properties</li>
            </ul>
            <p className="text-navy-600 leading-relaxed">
              Our Services are available to property owners in the United States and Canada. We evaluate properties
              and provide no-obligation cash offers based on various factors including market conditions, property
              condition, and location.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-2xl font-semibold text-navy-900 mb-4">3. User Eligibility</h2>
            <p className="text-navy-600 leading-relaxed mb-4">To use our Services, you must:</p>
            <ul className="list-disc pl-6 space-y-2 text-navy-600">
              <li>Be at least 18 years of age</li>
              <li>Have the legal authority to sell or inquire about the property in question</li>
              <li>Provide accurate and truthful information about yourself and the property</li>
              <li>Be a resident of the United States or Canada</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-2xl font-semibold text-navy-900 mb-4">4. User Responsibilities</h2>
            <p className="text-navy-600 leading-relaxed mb-4">By using our Services, you agree to:</p>
            <ul className="list-disc pl-6 space-y-2 text-navy-600">
              <li>Provide accurate, current, and complete information when submitting property inquiries</li>
              <li>Not submit false, misleading, or fraudulent information</li>
              <li>Not use our Services for any unlawful purpose</li>
              <li>Not attempt to interfere with the proper functioning of the Website</li>
              <li>Not impersonate any person or entity</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-2xl font-semibold text-navy-900 mb-4">5. Property Offers</h2>
            <p className="text-navy-600 leading-relaxed mb-4">Any cash offer provided by Release Properties:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-navy-600">
              <li>Is based on the information provided and may be subject to change upon property inspection</li>
              <li>Is not a binding contract until a formal purchase agreement is signed by both parties</li>
              <li>May be withdrawn at any time prior to signing a formal agreement</li>
              <li>Does not constitute a guarantee to purchase any property</li>
            </ul>
            <p className="text-navy-600 leading-relaxed">
              We reserve the right to decline to make an offer on any property for any reason.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-2xl font-semibold text-navy-900 mb-4">6. Communications Consent</h2>
            <p className="text-navy-600 leading-relaxed mb-4">
              By submitting your contact information and checking the SMS consent box on our Website, you expressly
              consent to receive the following communications from 14163729 Canada Inc. DBA "Release Properties":
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-navy-600">
              <li>Phone calls (including automated calls) at the phone number provided</li>
              <li>Text messages (SMS/MMS) at the phone number provided</li>
              <li>Emails at the email address provided</li>
            </ul>
            <p className="text-navy-600 leading-relaxed mb-4">These communications may include:</p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-navy-600">
              <li>Information about your property inquiry and cash offer</li>
              <li>Updates regarding our Services</li>
              <li>Marketing and promotional materials</li>
            </ul>
            <p className="text-navy-600 leading-relaxed mb-4">
              Message frequency varies. Standard message and data rates may apply. Consent to receive text messages is
              not a condition of purchasing any property or receiving our services.
            </p>
            <p className="text-navy-600 leading-relaxed mb-4">
              You may opt out of text messages at any time by replying STOP to any message. After opting out, you will
              receive one confirmation message. You may opt out of emails by clicking the unsubscribe link. For help,
              reply HELP to any text message or contact us at deals@releaseproperties.com.
            </p>
            <p className="text-navy-600 leading-relaxed mb-4">
              Mobile information, including phone numbers and SMS opt-in data and consent, will not be shared with
              third parties or affiliates for marketing or promotional purposes.
            </p>
            <p className="text-navy-600 leading-relaxed">
              Wireless carriers are not liable for delayed or undelivered messages. You acknowledge that message
              delivery is subject to effective transmission by your wireless carrier and that carrier performance
              is outside of our control.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-2xl font-semibold text-navy-900 mb-4">7. Intellectual Property</h2>
            <p className="text-navy-600 leading-relaxed mb-4">
              All content on this Website, including but not limited to text, graphics, logos, images, and software,
              is the property of Release Properties or its content suppliers and is protected by copyright, trademark,
              and other intellectual property laws.
            </p>
            <p className="text-navy-600 leading-relaxed">
              You may not reproduce, distribute, modify, or create derivative works from any content on this Website
              without our express written permission.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-2xl font-semibold text-navy-900 mb-4">8. Disclaimer of Warranties</h2>
            <p className="text-navy-600 leading-relaxed mb-4">
              THE WEBSITE AND SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER
              EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-navy-600">
              <li>WARRANTIES OF MERCHANTABILITY</li>
              <li>FITNESS FOR A PARTICULAR PURPOSE</li>
              <li>NON-INFRINGEMENT</li>
              <li>ACCURACY OR COMPLETENESS OF INFORMATION</li>
            </ul>
            <p className="text-navy-600 leading-relaxed">
              We do not warrant that the Website will be uninterrupted, error-free, or free of viruses or other
              harmful components.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-2xl font-semibold text-navy-900 mb-4">9. Limitation of Liability</h2>
            <p className="text-navy-600 leading-relaxed mb-4">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, RELEASE PROPERTIES AND ITS OFFICERS, DIRECTORS, EMPLOYEES, AND
              AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES
              ARISING OUT OF OR RELATED TO:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-navy-600">
              <li>Your use of or inability to use the Website or Services</li>
              <li>Any errors or omissions in the Website content</li>
              <li>Any unauthorized access to or use of our servers</li>
              <li>Any property transactions that may or may not result from using our Services</li>
            </ul>
            <p className="text-navy-600 leading-relaxed">
              In no event shall our total liability exceed the amount you paid to us, if any, for using our Services.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-2xl font-semibold text-navy-900 mb-4">10. Indemnification</h2>
            <p className="text-navy-600 leading-relaxed">
              You agree to indemnify, defend, and hold harmless Release Properties and its officers, directors,
              employees, agents, and affiliates from and against any claims, damages, losses, liabilities, costs, and
              expenses (including reasonable attorneys' fees) arising out of or related to your use of the Website or
              Services, your violation of these Terms, or your violation of any rights of another party.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-2xl font-semibold text-navy-900 mb-4">11. Governing Law</h2>
            <p className="text-navy-600 leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which
              Release Properties operates, without regard to conflict of law principles. Any disputes arising under
              these Terms shall be resolved in the courts of competent jurisdiction.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-2xl font-semibold text-navy-900 mb-4">12. Severability</h2>
            <p className="text-navy-600 leading-relaxed">
              If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall
              continue in full force and effect.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-2xl font-semibold text-navy-900 mb-4">13. Entire Agreement</h2>
            <p className="text-navy-600 leading-relaxed">
              These Terms, together with our Privacy Policy, constitute the entire agreement between you and Release
              Properties regarding your use of the Website and Services.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-serif text-2xl font-semibold text-navy-900 mb-4">14. Contact Information</h2>
            <p className="text-navy-600 leading-relaxed mb-4">
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <div className="bg-navy-50 border border-navy-200 p-6">
              <p className="font-semibold text-navy-900">14163729 Canada Inc. DBA "Release Properties"</p>
              <p className="text-navy-600">18 King Street East, Suite 1400</p>
              <p className="text-navy-600">Toronto, ON M5C 1C4</p>
              <p className="text-navy-600 mt-2">Phone: +1 (645) 232-4654</p>
              <p className="text-navy-600">Email: deals@releaseproperties.com</p>
            </div>
          </section>
        </div>

        {/* Navigation */}
        <div className="mt-12 pt-8 border-t border-navy-200 flex justify-between items-center text-sm">
          <Link to="/privacy" className="text-amber-600 hover:text-amber-700 font-medium inline-flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Privacy Policy
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

export default Terms
