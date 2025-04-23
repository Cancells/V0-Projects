import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-gray-400 hover:text-cyan-400 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to home
        </Link>

        <div className="max-w-4xl mx-auto mt-12 mb-24">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
              Privacy Policy
            </span>
          </h1>

          <div className="rounded-2xl border border-white/10 bg-gray-900/50 backdrop-blur-sm p-8">
            <div className="space-y-6 text-gray-300">
              <section>
                <h2 className="text-xl font-bold mb-3 text-white">1. Introduction</h2>
                <p>
                  At Chrono 2030, we take your privacy seriously. This Privacy Policy explains how we collect, use,
                  disclose, and safeguard your information when you visit our website, use our services, or purchase our
                  products. Please read this policy carefully.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-3 text-white">2. Information We Collect</h2>
                <p className="mb-3">We may collect the following types of information:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Personal Information:</strong> Name, email address, shipping address, payment information,
                    and phone number.
                  </li>
                  <li>
                    <strong>Neural Pattern Data:</strong> If you use our products with neural interface capabilities, we
                    collect anonymized neural pattern data used exclusively for improving interface functionality.
                  </li>
                  <li>
                    <strong>Usage Data:</strong> Information about how you use our website and products, including
                    browsing patterns, feature usage, and interaction data.
                  </li>
                  <li>
                    <strong>Device Information:</strong> IP address, browser type, operating system, and device
                    identifiers.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-3 text-white">3. How We Use Your Information</h2>
                <p className="mb-3">We use the collected information for various purposes, including:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Processing and fulfilling orders</li>
                  <li>Providing customer support</li>
                  <li>Improving our products and services</li>
                  <li>Personalizing your experience</li>
                  <li>Sending promotional communications (with your consent)</li>
                  <li>Enhancing neural interface functionality</li>
                  <li>Ensuring the security of our systems</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-3 text-white">4. Neural Data Protection</h2>
                <p>
                  Neural pattern data is encrypted using quantum cryptography and stored separately from personal
                  identifiers. This data is never sold to third parties and is used solely for improving the
                  functionality of our neural interface technology. You can opt out of neural data collection at any
                  time through your account settings.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-3 text-white">5. Data Sharing and Disclosure</h2>
                <p className="mb-3">We may share your information with:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Service providers who assist in our operations</li>
                  <li>Payment processors to complete transactions</li>
                  <li>Shipping partners to deliver products</li>
                  <li>Legal authorities when required by law</li>
                </ul>
                <p className="mt-3">
                  We do not sell, rent, or trade your personal information to third parties for marketing purposes.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-3 text-white">6. Data Security</h2>
                <p>
                  We implement advanced security measures, including quantum encryption, to protect your information.
                  However, no method of transmission over the Internet or electronic storage is 100% secure, and we
                  cannot guarantee absolute security.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-3 text-white">7. Your Rights</h2>
                <p className="mb-3">Depending on your location, you may have the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access the personal information we hold about you</li>
                  <li>Correct inaccurate or incomplete information</li>
                  <li>Delete your personal information</li>
                  <li>Restrict or object to processing of your information</li>
                  <li>Data portability</li>
                  <li>Withdraw consent at any time</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-3 text-white">8. Cookies and Tracking</h2>
                <p>
                  We use cookies and similar tracking technologies to enhance your browsing experience, analyze site
                  traffic, and personalize content. You can control cookie preferences through your browser settings.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-3 text-white">9. Children's Privacy</h2>
                <p>
                  Our services are not intended for individuals under 18 years of age. We do not knowingly collect
                  personal information from children. If we learn we have collected information from a child, we will
                  delete that information.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-3 text-white">10. Changes to This Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. The updated version will be indicated by an
                  updated "Last Updated" date. We encourage you to review this Privacy Policy periodically.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-3 text-white">11. Contact Us</h2>
                <p>
                  If you have questions or concerns about this Privacy Policy, please contact our Privacy Officer at
                  privacy@chrono2030.com or through our secure neural messaging system.
                </p>
              </section>

              <p className="mt-8 text-sm text-gray-400">Last updated: April 23, 2030</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
