import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-gray-400 hover:text-cyan-400 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to home
        </Link>

        <div className="max-w-3xl mx-auto mt-12 mb-24">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
              Frequently Asked Questions
            </span>
          </h1>

          <div className="rounded-2xl border border-white/10 bg-gray-900/50 backdrop-blur-sm p-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-white/10">
                <AccordionTrigger className="text-white hover:text-cyan-400">
                  How does the Quantum Core technology work?
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  Our Quantum Core utilizes a microscopic quantum entanglement chamber that maintains coherence with
                  atomic clocks worldwide. This allows for accuracy to within 0.0000001 seconds per year without
                  requiring traditional synchronization methods.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-white/10">
                <AccordionTrigger className="text-white hover:text-cyan-400">
                  What is the battery life of a Chrono 2030 watch?
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  Chrono 2030 watches don't use traditional batteries. Our self-sustaining power system harnesses energy
                  from temperature differentials, kinetic movement, and ambient light, providing unlimited power for the
                  lifetime of the watch.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-white/10">
                <AccordionTrigger className="text-white hover:text-cyan-400">
                  Are Chrono 2030 watches water-resistant?
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  Yes, all our watches feature advanced hydrophobic nano-coating and molecular-bonded seals, providing
                  water resistance to 500 meters. The Quantum Diver series extends this to 1000 meters with
                  pressure-adaptive case technology.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border-white/10">
                <AccordionTrigger className="text-white hover:text-cyan-400">
                  How do I set up the neural interface?
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  The neural interface uses non-invasive electromagnetic sensors to detect subtle neural patterns.
                  Simply wear the watch for 7 days to allow the AI to calibrate to your thought patterns. Once
                  calibrated, you can control watch functions through focused intention.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border-white/10">
                <AccordionTrigger className="text-white hover:text-cyan-400">
                  What warranty comes with a Chrono 2030 watch?
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  All Chrono 2030 watches come with a 10-year comprehensive warranty covering both mechanical and
                  electronic components. Our Quantum Core movement is guaranteed for 25 years. Additionally, all watches
                  include lifetime software updates and neural interface recalibration.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="border-white/10">
                <AccordionTrigger className="text-white hover:text-cyan-400">
                  How do I care for my Chrono 2030 watch?
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  The self-cleaning nano-surface requires minimal maintenance. Simply rinse with water after exposure to
                  salt water. The quantum components are hermetically sealed and require no maintenance. We recommend a
                  professional inspection every 5 years to ensure optimal performance.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7" className="border-white/10">
                <AccordionTrigger className="text-white hover:text-cyan-400">
                  Can I upgrade my existing Chrono 2030 watch?
                </AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  Yes, our modular design philosophy allows for component upgrades as new technologies emerge. Visit any
                  Chrono 2030 boutique for upgrade options. Software and neural interface updates are delivered
                  wirelessly and automatically.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  )
}
