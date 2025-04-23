"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowLeft, ArrowRight, Search, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

// Collection data
const collections = [
  {
    id: "quantum",
    name: "Quantum Series",
    description: "Our flagship collection featuring quantum entanglement technology",
    watches: [
      {
        id: "q1",
        name: "Quantum Chronograph X1",
        price: 17500,
        image: "/watch-quantum-x1.svg",
        features: ["Quantum Core", "Holographic Display", "Neural Interface"],
        isNew: true,
        rating: 4.9,
      },
      {
        id: "q2",
        name: "Quantum Diver Pro",
        price: 19800,
        image: "/watch-quantum-diver.svg",
        features: ["1000m Water Resistance", "Pressure Adaptive Case", "Quantum Core"],
        isNew: false,
        rating: 4.8,
      },
      {
        id: "q3",
        name: "Quantum Skeleton",
        price: 22500,
        image: "/watch-quantum-skeleton.svg",
        features: ["Transparent Mechanism", "Quantum Core", "Gravity Defying Balance"],
        isNew: true,
        rating: 5.0,
      },
      {
        id: "q4",
        name: "Quantum GMT",
        price: 18200,
        image: "/watch-quantum-gmt.svg",
        features: ["Multi-Dimension Time", "Quantum Core", "Timezone Synchronization"],
        isNew: false,
        rating: 4.7,
      },
    ],
  },
  {
    id: "neural",
    name: "Neural Collection",
    description: "Advanced neural interface timepieces that respond to thought patterns",
    watches: [
      {
        id: "n1",
        name: "Neural Commander",
        price: 24500,
        image: "/watch-neural-commander.svg",
        features: ["Advanced Neural Interface", "Thought Control", "Quantum Core"],
        isNew: true,
        rating: 4.9,
      },
      {
        id: "n2",
        name: "Neural Minimalist",
        price: 21000,
        image: "/watch-neural-minimalist.svg",
        features: ["Sleek Design", "Neural Interface", "Ambient Display"],
        isNew: false,
        rating: 4.8,
      },
      {
        id: "n3",
        name: "Neural Sport",
        price: 19500,
        image: "/watch-neural-sport.svg",
        features: ["Athletic Tracking", "Neural Interface", "Biometric Sensors"],
        isNew: true,
        rating: 4.7,
      },
    ],
  },
  {
    id: "infinity",
    name: "Infinity Line",
    description: "Limited edition pieces that push the boundaries of watchmaking",
    watches: [
      {
        id: "i1",
        name: "Infinity Tourbillon",
        price: 95000,
        image: "/watch-infinity-tourbillon.svg",
        features: ["Anti-Gravity Tourbillon", "Quantum Core", "Sapphire Crystal Case"],
        isNew: true,
        rating: 5.0,
      },
      {
        id: "i2",
        name: "Infinity Celestial",
        price: 78000,
        image: "/watch-infinity-celestial.svg",
        features: ["Star Map Display", "Astronomical Tracking", "Quantum Core"],
        isNew: false,
        rating: 4.9,
      },
      {
        id: "i3",
        name: "Infinity Perpetual",
        price: 120000,
        image: "/watch-infinity-perpetual.svg",
        features: ["Perpetual Calendar", "Quantum Core", "Meteorite Dial"],
        isNew: false,
        rating: 5.0,
      },
    ],
  },
]

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
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

export default function CollectionsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredWatches, setFilteredWatches] = useState<any[]>([])
  const [inView, setInView] = useState(false)

  // Filter watches based on search query and active tab
  useEffect(() => {
    let result: any[] = []

    if (activeTab === "all") {
      result = collections.flatMap((collection) => collection.watches)
    } else {
      const collection = collections.find((c) => c.id === activeTab)
      result = collection ? collection.watches : []
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (watch) =>
          watch.name.toLowerCase().includes(query) ||
          watch.features.some((feature: string) => feature.toLowerCase().includes(query)),
      )
    }

    setFilteredWatches(result)
  }, [activeTab, searchQuery])

  // Set in view after component mounts for animations
  useEffect(() => {
    setInView(true)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-24">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-gray-400 hover:text-cyan-400 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to home
          </Link>
        </div>

        <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={fadeIn} className="mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
              Our Collections
            </span>
          </h1>
          <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto">
            Explore our range of quantum-powered timepieces, each representing the pinnacle of horological innovation
            and futuristic design.
          </p>
        </motion.div>

        <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={fadeIn} className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search watches..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-800/50 border-white/10 focus:border-cyan-500 focus:ring-cyan-500/20 rounded-xl"
              />
            </div>
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
              <TabsList className="bg-gray-800/50 border border-white/10 rounded-xl p-1">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-gradient-to-r from-cyan-500 to-purple-600 data-[state=active]:text-white rounded-lg"
                >
                  All Collections
                </TabsTrigger>
                {collections.map((collection) => (
                  <TabsTrigger
                    key={collection.id}
                    value={collection.id}
                    className="data-[state=active]:bg-gradient-to-r from-cyan-500 to-purple-600 data-[state=active]:text-white rounded-lg"
                  >
                    {collection.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredWatches.map((watch) => (
            <motion.div
              key={watch.id}
              variants={cardVariants}
              whileHover="hover"
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gray-900/50 backdrop-blur-sm transition-all hover:border-cyan-500/50"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {watch.isNew && (
                <div className="absolute top-4 left-4 z-10">
                  <Badge className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0">
                    New
                  </Badge>
                </div>
              )}

              <div className="aspect-square overflow-hidden">
                <Image
                  src={watch.image || "/placeholder.svg"}
                  alt={watch.name}
                  width={600}
                  height={600}
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              <div className="p-6 relative">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold">{watch.name}</h3>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span className="ml-1 text-sm">{watch.rating}</span>
                  </div>
                </div>

                <ul className="mb-4">
                  {watch.features.map((feature: string, index: number) => (
                    <li key={index} className="text-sm text-gray-400 flex items-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-cyan-400 mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-cyan-400">${watch.price.toLocaleString()}</span>
                  <Link href={`/collections/${watch.id}`}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="rounded-full hover:bg-cyan-500/20 hover:text-cyan-400 group-hover:translate-x-1 transition-transform"
                    >
                      Details <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredWatches.length === 0 && (
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeIn}
            className="text-center py-16"
          >
            <p className="text-xl text-gray-400">No watches found matching your search.</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("")
                setActiveTab("all")
              }}
              className="mt-4 border-white/10 hover:bg-white/5 rounded-xl"
            >
              Clear filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
