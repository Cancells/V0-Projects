"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { ShoppingBag, User } from "lucide-react"
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
\
