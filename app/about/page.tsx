import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function AboutPage() {
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
              About Chrono 2030
            </span>
          </h1>

          <div className="space-y-8 text-gray-300">
            <div className="rounded-2xl border border-white/10 bg-gray-900/50 backdrop-blur-sm p-8">
              <h2 className="text-2xl font-bold mb-4 text-white">Our Vision</h2>
              <p>
                Founded in 2025, Chrono 2030 emerged from a vision to redefine the concept of timekeeping for the
                quantum age. We believe that a timepiece should not merely tell time, but connect you to it in ways
                previously unimaginable.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-gray-900/50 backdrop-blur-sm p-8">
              <h2 className="text-2xl font-bold mb-4 text-white">Quantum Innovation</h2>
              <p className="mb-4">
                Our proprietary Quantum Core technology represents the pinnacle of horological engineering. By
                harnessing principles of quantum mechanics, we've created movements that achieve unprecedented accuracy.
              </p>
              <p>
                Each Chrono 2030 timepiece contains a microscopic quantum entanglement chamber, allowing your watch to
                synchronize with atomic clocks worldwide through quantum coherence rather than traditional signals.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-gray-900/50 backdrop-blur-sm p-8">
              <h2 className="text-2xl font-bold mb-4 text-white">Craftsmanship</h2>
              <p className="mb-4">
                While our technology looks to the future, our dedication to craftsmanship honors the timeless tradition
                of watchmaking. Each component is meticulously crafted by master artisans using both advanced
                fabrication techniques and traditional hand-finishing.
              </p>
              <p>
                The marriage of cutting-edge technology with centuries-old craftsmanship creates timepieces that are not
                just instruments of precision, but works of art to be passed down through generations.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-gray-900/50 backdrop-blur-sm p-8">
              <h2 className="text-2xl font-bold mb-4 text-white">Sustainability</h2>
              <p>
                Our commitment to the future extends beyond technology. All Chrono 2030 timepieces are crafted from
                sustainable materials, including recycled precious metals and lab-grown gemstones. Our manufacturing
                facilities operate on 100% renewable energy, and our self-sustaining power systems eliminate the need
                for battery disposal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
