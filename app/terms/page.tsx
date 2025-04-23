import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function TermsPage() {
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
              Terms of Service
            </span>
          </h1>

          <div className="rounded-2xl border border-white/10 bg-gray-900/50 backdrop-blur-sm p-8">
            <div className="space-y-6 text-gray-300">
              <section>
                <h2 className="text-xl font-bold mb-3 text-white">1. Acceptance of Terms</h2>
                <p>
                  By accessing and using the Chrono 2030 website and services, you acknowledge that you have read,
                  understood, and agree to be bound by these Terms of Service. If you do not agree with any part of
                  these terms, you may not use our services.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-3 text-white">2. Products and Services</h2>
                <p>
                  Chrono 2030 offers luxury timepieces featuring advanced quantum technology. All product descriptions,
                  specifications, and pricing are subject to change without notice. We reserve the right to discontinue
                  any product at any time.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-3 text-white">3. Neural Interface Technology</h2>
                <p>
                  Our neural interface technology is designed to be non-invasive and safe for general use. By purchasing
                  and using products with neural interface capabilities, you acknowledge that you have been informed of
                  potential risks and agree to follow all calibration and usage guidelines provided.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-3 text-white">4. Purchasing and Payment</h2>
                <p>
                  All prices are listed in USD unless otherwise specified. Payment must be made through our secure
                  payment system. We accept major credit cards, cryptocurrency, and Neural Pay where available. All
                  transactions are encrypted and secure.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-3 text-white">5. Shipping and Delivery</h2>
                <p>
                  Standard shipping is complimentary worldwide. Delivery times vary by region. Quantum teleportation
                  shipping is available in select regions for an additional fee. Risk of loss transfers upon delivery.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-3 text-white">6. Warranty and Returns</h2>
                <p>
                  All Chrono 2030 timepieces come with a 10-year limited warranty. Please refer to our Warranty Policy
                  for complete details. Unused products in original condition may be returned within 30 days for a full
                  refund. Custom orders are non-refundable.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-3 text-white">7. Intellectual Property</h2>
                <p>
                  All content on the Chrono 2030 website, including text, graphics, logos, and software, is the property
                  of Chrono 2030 and protected by international copyright laws. Our Quantum Core technology and neural
                  interface systems are protected by multiple patents.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-3 text-white">8. Privacy</h2>
                <p>
                  Your privacy is important to us. Our Privacy Policy details how we collect, use, and protect your
                  personal information, including neural pattern data collected through our interface technology.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-3 text-white">9. Limitation of Liability</h2>
                <p>
                  Chrono 2030 shall not be liable for any indirect, incidental, special, consequential, or punitive
                  damages resulting from your use or inability to use our products or services. Our liability is limited
                  to the purchase price of the product.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-3 text-white">10. Governing Law</h2>
                <p>
                  These Terms of Service shall be governed by and construed in accordance with the laws of the
                  International Quantum Commerce Treaty of 2028, without regard to its conflict of law provisions.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-3 text-white">11. Changes to Terms</h2>
                <p>
                  We reserve the right to modify these Terms of Service at any time. Changes will be effective
                  immediately upon posting to our website. Your continued use of our services after any changes
                  indicates your acceptance of the new terms.
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
