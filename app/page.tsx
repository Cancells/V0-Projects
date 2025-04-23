"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { ArrowRight, ShoppingBag, User } from "lucide-react"
import { Button } from "@/components/ui/button"

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6 },
  },
}

const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6 },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
  hover: {
    y: -10,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
}

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false)

  // Refs for scroll animations
  const featuredRef = useRef(null)
  const innovationRef = useRef(null)
  const testimonialsRef = useRef(null)
  const ctaRef = useRef(null)

  // Check if sections are in view
  const featuredInView = useInView(featuredRef, { once: true, amount: 0.2 })
  const innovationInView = useInView(innovationRef, { once: true, amount: 0.2 })
  const testimonialsInView = useInView(testimonialsRef, { once: true, amount: 0.2 })
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.2 })

  // Parallax effect for hero section
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 500], [0, 150])
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.5])

  // Handle scroll for navbar transparency
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "backdrop-blur-lg bg-black/70 border-b border-white/10" : "bg-transparent"}`}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold tracking-tighter">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600"
            >
              CHRONO 2030
            </motion.span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Link href="/collections" className="text-sm font-medium hover:text-cyan-400 transition-colors">
                Collection
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link href="/" className="text-sm font-medium hover:text-cyan-400 transition-colors">
                Innovation
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link href="/" className="text-sm font-medium hover:text-cyan-400 transition-colors">
                Craftsmanship
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link href="/" className="text-sm font-medium hover:text-cyan-400 transition-colors">
                Heritage
              </Link>
            </motion.div>
          </nav>
          <div className="flex items-center space-x-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Link href="/login" className="p-2 rounded-full hover:bg-white/10 transition-colors">
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Link href="/payment" className="p-2 rounded-full hover:bg-white/10 transition-colors">
                <ShoppingBag className="h-5 w-5" />
                <span className="sr-only">Cart</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative h-screen flex items-center overflow-hidden">
          <motion.div className="absolute inset-0 z-0" style={{ y: heroY, opacity: heroOpacity }}>
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/80 z-10" />
            <Image
              src="/placeholder.svg?height=1080&width=1920"
              alt="Luxury watch background"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
          <div className="container mx-auto px-4 z-10 pt-20">
            <div className="max-w-2xl">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl md:text-7xl font-bold leading-tight mb-6"
              >
                <span className="block">The Future of</span>
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600"
                >
                  Timekeeping
                </motion.span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-xl md:text-2xl text-gray-300 mb-8"
              >
                Precision engineering meets quantum technology. Experience watches that transcend time itself.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.1 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0 rounded-full px-8 py-6">
                  <Link href="/collections">Explore Collection</Link>
                </Button>
                <Button variant="outline" className="border-white/20 hover:bg-white/10 rounded-full px-8 py-6">
                  Our Technology
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Animated particles */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-cyan-500/20"
                style={{
                  width: Math.random() * 10 + 5,
                  height: Math.random() * 10 + 5,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, Math.random() * -100 - 50],
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  duration: Math.random() * 5 + 5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  ease: "easeInOut",
                  delay: Math.random() * 5,
                }}
              />
            ))}
          </div>
        </section>

        {/* Featured Watches */}
        <section id="featured-watches" ref={featuredRef} className="py-24 bg-gradient-to-b from-black to-gray-900">
          <div className="container mx-auto px-4">
            <motion.h2
              initial="hidden"
              animate={featuredInView ? "visible" : "hidden"}
              variants={fadeIn}
              className="text-3xl md:text-4xl font-bold mb-12 text-center"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
                Featured Timepieces
              </span>
            </motion.h2>
            <motion.div
              initial="hidden"
              animate={featuredInView ? "visible" : "hidden"}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {[1, 2, 3].map((item) => (
                <motion.div
                  key={item}
                  variants={cardVariants}
                  whileHover="hover"
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gray-900/50 backdrop-blur-sm transition-all hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/20"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="aspect-square overflow-hidden">
                    <Image
                      src={`/placeholder.svg?height=600&width=600&text=Luxury+Watch+${item}`}
                      alt={`Luxury watch ${item}`}
                      width={600}
                      height={600}
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">Quantum Chronograph {item}</h3>
                    <p className="text-gray-400 mb-4">Holographic display with quantum precision movement</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-cyan-400">${(15000 + item * 2500).toLocaleString()}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="rounded-full hover:bg-cyan-500/20 hover:text-cyan-400 group-hover:translate-x-1 transition-transform"
                      >
                        Details <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <motion.div
              initial="hidden"
              animate={featuredInView ? "visible" : "hidden"}
              variants={fadeIn}
              className="mt-12 text-center"
            >
              <Link href="/collections">
                <Button className="bg-white/10 hover:bg-white/20 rounded-full px-8 py-6">
                  View All Collections <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Innovation Section */}
        <section ref={innovationRef} className="py-24 bg-black">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div initial="hidden" animate={innovationInView ? "visible" : "hidden"} variants={fadeInLeft}>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
                    Quantum Precision Technology
                  </span>
                </h2>
                <p className="text-gray-300 mb-6">
                  Our proprietary Quantum Core movement achieves accuracy to within 0.0000001 seconds per year,
                  utilizing principles of quantum entanglement to synchronize with atomic clocks worldwide.
                </p>
                <motion.ul
                  initial="hidden"
                  animate={innovationInView ? "visible" : "hidden"}
                  variants={staggerContainer}
                  className="space-y-4 mb-8"
                >
                  {[
                    "Holographic displays",
                    "Biometric authentication",
                    "Self-sustaining power",
                    "Neural interface",
                  ].map((feature, index) => (
                    <motion.li key={index} variants={fadeIn} className="flex items-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={innovationInView ? { scale: 1 } : { scale: 0 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                        className="h-2 w-2 rounded-full bg-cyan-400 mr-3"
                      ></motion.div>
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </motion.ul>
                <Button className="rounded-full px-8 py-6 bg-white/10 hover:bg-white/20 border border-white/20">
                  Discover Our Technology
                </Button>
              </motion.div>
              <motion.div
                initial="hidden"
                animate={innovationInView ? "visible" : "hidden"}
                variants={fadeInRight}
                className="relative"
              >
                <motion.div
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                  className="absolute -inset-4 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-600/20 blur-xl"
                ></motion.div>
                <div className="relative rounded-2xl overflow-hidden border border-white/10">
                  <Image
                    src="/placeholder.svg?height=800&width=800&text=Watch+Technology"
                    alt="Watch technology"
                    width={800}
                    height={800}
                    className="object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section ref={testimonialsRef} className="py-24 bg-gradient-to-b from-gray-900 to-black">
          <div className="container mx-auto px-4">
            <motion.h2
              initial="hidden"
              animate={testimonialsInView ? "visible" : "hidden"}
              variants={fadeIn}
              className="text-3xl md:text-4xl font-bold mb-12 text-center"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
                What Our Clients Say
              </span>
            </motion.h2>
            <motion.div
              initial="hidden"
              animate={testimonialsInView ? "visible" : "hidden"}
              variants={staggerContainer}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {[
                {
                  name: "Alexander Chen",
                  title: "Tech Entrepreneur",
                  quote:
                    "The neural interface on my Quantum Chronograph has revolutionized how I interact with time itself.",
                },
                {
                  name: "Sophia Nakamura",
                  title: "Quantum Physicist",
                  quote:
                    "As someone who works with quantum mechanics daily, I appreciate the true innovation behind these timepieces.",
                },
                {
                  name: "Marcus Williams",
                  title: "Space Tourism Pioneer",
                  quote: "The only watch that maintains perfect accuracy whether I'm on Earth or orbiting Mars.",
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover={{ y: -10 }}
                  className="rounded-2xl border border-white/10 bg-gray-900/50 backdrop-blur-sm p-8 hover:border-purple-500/50 transition-all"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={testimonialsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                    transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 200 }}
                    className="flex items-center mb-6"
                  >
                    <div className="h-12 w-12 rounded-full bg-gradient-to-r from-cyan-400 to-purple-600 mr-4"></div>
                    <div>
                      <h3 className="font-bold">{testimonial.name}</h3>
                      <p className="text-sm text-gray-400">{testimonial.title}</p>
                    </div>
                  </motion.div>
                  <p className="text-gray-300">"{testimonial.quote}"</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section ref={ctaRef} className="py-24 bg-black relative overflow-hidden">
          <motion.div
            animate={{
              opacity: [0.2, 0.4, 0.2],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
            className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 to-purple-900/20"
          ></motion.div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial="hidden"
              animate={ctaInView ? "visible" : "hidden"}
              variants={fadeIn}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
                  The Future Awaits
                </span>
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Join the waitlist for our limited edition Quantum Infinity collection, launching next month.
              </p>
              <motion.div
                initial="hidden"
                animate={ctaInView ? "visible" : "hidden"}
                variants={staggerContainer}
                className="flex flex-col sm:flex-row justify-center gap-4"
              >
                <motion.div variants={fadeIn}>
                  <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0 rounded-full px-8 py-6">
                    Reserve Now
                  </Button>
                </motion.div>
                <motion.div variants={fadeIn}>
                  <Link href="/signup">
                    <Button variant="outline" className="border-white/20 hover:bg-white/10 rounded-full px-8 py-6">
                      Create Account
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* Animated particles */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-purple-500/20"
                style={{
                  width: Math.random() * 15 + 5,
                  height: Math.random() * 15 + 5,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, Math.random() * -150 - 50],
                  x: [0, Math.random() * 100 - 50],
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  duration: Math.random() * 8 + 5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  ease: "easeInOut",
                  delay: Math.random() * 5,
                }}
              />
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-black border-t border-white/10 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Link href="/" className="text-2xl font-bold tracking-tighter">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
                  CHRONO 2030
                </span>
              </Link>
              <p className="mt-4 text-gray-400">Redefining luxury timepieces for the quantum age.</p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Collections</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/collections" className="text-gray-400 hover:text-cyan-400 transition-colors">
                    Quantum Series
                  </Link>
                </li>
                <li>
                  <Link href="/collections" className="text-gray-400 hover:text-cyan-400 transition-colors">
                    Neural Collection
                  </Link>
                </li>
                <li>
                  <Link href="/collections" className="text-gray-400 hover:text-cyan-400 transition-colors">
                    Infinity Line
                  </Link>
                </li>
                <li>
                  <Link href="/collections" className="text-gray-400 hover:text-cyan-400 transition-colors">
                    Limited Editions
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-cyan-400 transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-gray-400 hover:text-cyan-400 transition-colors">
                    Innovation
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-gray-400 hover:text-cyan-400 transition-colors">
                    Sustainability
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-gray-400 hover:text-cyan-400 transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/faq" className="text-gray-400 hover:text-cyan-400 transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-gray-400 hover:text-cyan-400 transition-colors">
                    Shipping
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-gray-400 hover:text-cyan-400 transition-colors">
                    Returns
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-gray-400 hover:text-cyan-400 transition-colors">
                    Warranty
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} Chrono 2030. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-cyan-400 transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-cyan-400 transition-colors">
                Terms
              </Link>
              <Link href="/" className="text-gray-400 hover:text-cyan-400 transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
