"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowLeft, ChevronRight, CheckCircle, Heart, Minus, Plus, Share2, ShoppingBag, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

// Product data (in a real app, this would come from a database)
const products = {
  q1: {
    id: "q1",
    name: "Quantum Chronograph X1",
    price: 17500,
    collection: "Quantum Series",
    description:
      "The flagship of our Quantum Series, the Chronograph X1 represents the pinnacle of quantum timekeeping technology. Its revolutionary movement achieves accuracy to within 0.0000001 seconds per year through quantum entanglement with atomic clocks worldwide.",
    longDescription:
      "The Quantum Chronograph X1 is more than a timepiece—it's a revolution in horology. The watch features our proprietary Quantum Core movement, which utilizes principles of quantum mechanics to achieve unprecedented accuracy. The holographic display projects time in three dimensions, visible from any angle, while the neural interface allows for thought-controlled operation once calibrated to your unique neural patterns. The self-sustaining power system harnesses energy from temperature differentials, kinetic movement, and ambient light, eliminating the need for traditional charging or battery replacement.",
    features: [
      "Quantum Core Movement",
      "Holographic 3D Display",
      "Neural Interface",
      "Self-Sustaining Power",
      "Biometric Authentication",
    ],
    specifications: [
      { name: "Case Material", value: "Aerospace-grade titanium with quantum-resistant coating" },
      { name: "Case Diameter", value: "42mm" },
      { name: "Case Thickness", value: "11.5mm" },
      { name: "Water Resistance", value: "500 meters" },
      { name: "Movement", value: "Quantum Core X1" },
      { name: "Power Reserve", value: "Unlimited (self-sustaining)" },
      { name: "Crystal", value: "Synthetic sapphire with quantum anti-reflective coating" },
      { name: "Dial", value: "Holographic projection with customizable displays" },
      { name: "Strap", value: "Adaptive smart-fabric or titanium bracelet" },
      { name: "Functions", value: "Hours, minutes, seconds, chronograph, world time, neural interface" },
    ],
    images: [
      "/watch-quantum-x1.svg",
      "/watch-quantum-x1-side.svg",
      "/watch-quantum-x1.svg",
      "/watch-quantum-x1-detail.svg",
    ],
    colors: ["Black", "Silver", "Blue"],
    isNew: true,
    rating: 4.9,
    reviews: 124,
    inStock: true,
  },
  q2: {
    id: "q2",
    name: "Quantum Diver Pro",
    price: 19800,
    collection: "Quantum Series",
    description:
      "Designed for the depths of both Earth's oceans and the vacuum of space, the Quantum Diver Pro features pressure-adaptive case technology and unparalleled water resistance.",
    longDescription:
      "The Quantum Diver Pro redefines what's possible in a diving watch. Its revolutionary pressure-adaptive case technology automatically responds to external pressure changes, maintaining structural integrity at depths of up to 1000 meters. The watch features luminescent quantum dots that provide perfect visibility in even the darkest underwater environments. The Quantum Core movement ensures perfect timekeeping regardless of pressure or temperature extremes, while the integrated depth sensor and decompression calculator provide critical information for professional divers.",
    features: [
      "1000m Water Resistance",
      "Pressure Adaptive Case",
      "Quantum Core",
      "Decompression Calculator",
      "Luminescent Quantum Dots",
    ],
    specifications: [
      { name: "Case Material", value: "Ultra-dense carbon composite with titanium reinforcement" },
      { name: "Case Diameter", value: "45mm" },
      { name: "Case Thickness", value: "14mm" },
      { name: "Water Resistance", value: "1000 meters" },
      { name: "Movement", value: "Quantum Core Diver" },
      { name: "Power Reserve", value: "Unlimited (self-sustaining)" },
      { name: "Crystal", value: "Extra-thick sapphire with pressure distribution system" },
      { name: "Dial", value: "Quantum dot luminescence with depth indicator" },
      { name: "Strap", value: "Expandable titanium or high-density polymer" },
      { name: "Functions", value: "Hours, minutes, seconds, depth gauge, decompression calculator" },
    ],
    images: [
      "/watch-quantum-diver.svg",
      "/watch-quantum-diver.svg",
      "/watch-quantum-diver.svg",
      "/watch-quantum-diver.svg",
    ],
    colors: ["Black", "Navy", "Orange"],
    isNew: false,
    rating: 4.8,
    reviews: 86,
    inStock: true,
  },
  q3: {
    id: "q3",
    name: "Quantum Skeleton",
    price: 22500,
    collection: "Quantum Series",
    description:
      "A mesmerizing blend of traditional skeleton watchmaking and quantum technology, revealing the intricate dance of mechanical and quantum components.",
    longDescription:
      "The Quantum Skeleton represents the perfect marriage of traditional horological craftsmanship and cutting-edge quantum technology. The transparent case and dial reveal the mesmerizing interplay between mechanical components and the quantum core. The gravity-defying balance wheel appears to float within the movement, suspended by quantum levitation. Each component is hand-finished by master craftsmen, with beveled edges and polished surfaces that catch and reflect light in stunning ways. The watch features a hybrid movement that combines traditional mechanical elements with quantum technology, creating a timepiece that honors watchmaking heritage while embracing the future.",
    features: [
      "Transparent Mechanism",
      "Quantum Core",
      "Gravity Defying Balance",
      "Hand-Finished Components",
      "Quantum Levitation",
    ],
    specifications: [
      { name: "Case Material", value: "Transparent sapphire crystal with platinum accents" },
      { name: "Case Diameter", value: "40mm" },
      { name: "Case Thickness", value: "12mm" },
      { name: "Water Resistance", value: "50 meters" },
      { name: "Movement", value: "Quantum Core Skeleton" },
      { name: "Power Reserve", value: "Unlimited (self-sustaining)" },
      { name: "Crystal", value: "Domed sapphire with anti-reflective coating" },
      { name: "Dial", value: "Skeletonized with exposed quantum components" },
      { name: "Strap", value: "Hand-stitched alligator leather or platinum bracelet" },
      { name: "Functions", value: "Hours, minutes, seconds, power reserve indicator" },
    ],
    images: [
      "/watch-quantum-skeleton.svg",
      "/watch-quantum-skeleton.svg",
      "/watch-quantum-skeleton.svg",
      "/watch-quantum-skeleton.svg",
    ],
    colors: ["Transparent", "Rose Gold", "Platinum"],
    isNew: true,
    rating: 5.0,
    reviews: 42,
    inStock: true,
  },
  n1: {
    id: "n1",
    name: "Neural Commander",
    price: 24500,
    collection: "Neural Collection",
    description:
      "Our most advanced neural interface timepiece, allowing complete thought control and personalized function mapping to your unique neural patterns.",
    longDescription:
      "The Neural Commander represents the most sophisticated neural interface technology available in a wearable device. After a simple calibration process, the watch learns to recognize your unique thought patterns, allowing for intuitive control of all functions without physical interaction. The adaptive AI system continuously improves its response to your neural commands, becoming more accurate over time. The customizable function mapping allows you to assign specific thoughts to watch functions, creating a truly personalized experience. The Neural Commander also features advanced security protocols that ensure only you can control the watch through neural commands.",
    features: [
      "Advanced Neural Interface",
      "Thought Control",
      "Quantum Core",
      "Adaptive AI",
      "Personalized Function Mapping",
    ],
    specifications: [
      { name: "Case Material", value: "Neuro-conductive titanium alloy" },
      { name: "Case Diameter", value: "43mm" },
      { name: "Case Thickness", value: "12mm" },
      { name: "Water Resistance", value: "300 meters" },
      { name: "Movement", value: "Quantum Core Neural" },
      { name: "Power Reserve", value: "Unlimited (self-sustaining)" },
      { name: "Crystal", value: "Sapphire with neural-responsive coating" },
      { name: "Dial", value: "Adaptive display with neural feedback indicators" },
      { name: "Strap", value: "Neural-conductive smart fabric" },
      { name: "Functions", value: "Hours, minutes, seconds, chronograph, world time, all controllable via thought" },
    ],
    images: [
      "/watch-neural-commander.svg",
      "/watch-neural-commander.svg",
      "/watch-neural-commander.svg",
      "/watch-neural-commander.svg",
    ],
    colors: ["Black", "Silver", "Graphite"],
    isNew: true,
    rating: 4.9,
    reviews: 57,
    inStock: true,
  },
  i1: {
    id: "i1",
    name: "Infinity Tourbillon",
    price: 95000,
    collection: "Infinity Line",
    description:
      "Our masterpiece of horological art, featuring a revolutionary anti-gravity tourbillon suspended within a transparent sapphire crystal case.",
    longDescription:
      "The Infinity Tourbillon represents the absolute pinnacle of Chrono 2030's watchmaking prowess. The revolutionary anti-gravity tourbillon appears to float within the transparent sapphire crystal case, defying the laws of physics through quantum levitation technology. Each watch is assembled by a single master watchmaker who dedicates over 500 hours to its creation. The movement consists of 408 hand-finished components, including the quantum core that powers the anti-gravity system. The sapphire crystal case provides unobstructed views of the mesmerizing mechanism from all angles, while still maintaining exceptional durability and water resistance. Limited to just 30 pieces worldwide, the Infinity Tourbillon is a true collector's masterpiece.",
    features: [
      "Anti-Gravity Tourbillon",
      "Quantum Core",
      "Sapphire Crystal Case",
      "500+ Hours of Craftsmanship",
      "Limited to 30 Pieces",
    ],
    specifications: [
      { name: "Case Material", value: "Single-piece sapphire crystal with platinum elements" },
      { name: "Case Diameter", value: "44mm" },
      { name: "Case Thickness", value: "15mm" },
      { name: "Water Resistance", value: "50 meters" },
      { name: "Movement", value: "Quantum Core Infinity Tourbillon" },
      { name: "Power Reserve", value: "Unlimited (self-sustaining)" },
      { name: "Crystal", value: "Integrated sapphire case" },
      { name: "Dial", value: "Skeletonized with floating hour markers" },
      { name: "Strap", value: "Hand-stitched alligator leather with platinum deployant clasp" },
      { name: "Functions", value: "Hours, minutes, anti-gravity tourbillon, power reserve indicator" },
    ],
    images: [
      "/watch-infinity-tourbillon.svg",
      "/watch-infinity-tourbillon.svg",
      "/watch-infinity-tourbillon.svg",
      "/watch-infinity-tourbillon.svg",
    ],
    colors: ["Transparent", "Platinum", "Rose Gold"],
    isNew: true,
    rating: 5.0,
    reviews: 12,
    inStock: false,
  },
}

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

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const productId = params.productId as string
  const [product, setProduct] = useState<any>(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState("")
  const [inView, setInView] = useState(false)

  // Fetch product data
  useEffect(() => {
    if (productId && products[productId]) {
      setProduct(products[productId])
      setSelectedColor(products[productId].colors[0])
    } else {
      // Handle invalid product ID
      router.push("/collections")
    }
  }, [productId, router])

  // Set in view after component mounts for animations
  useEffect(() => {
    setInView(true)
  }, [])

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border-4 border-t-transparent border-cyan-500 animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-24">
        <div className="mb-8">
          <Link
            href="/collections"
            className="inline-flex items-center text-gray-400 hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to collections
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Product Images */}
          <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={fadeIn} className="lg:w-1/2">
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 bg-gray-900/50 backdrop-blur-sm mb-4">
              {product.isNew && (
                <div className="absolute top-4 left-4 z-10">
                  <Badge className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0">
                    New
                  </Badge>
                </div>
              )}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full"
              >
                <Image
                  src={product.images[selectedImage] || "/placeholder.svg"}
                  alt={product.name}
                  width={800}
                  height={800}
                  className="object-cover w-full h-full"
                />
              </motion.div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image: string, index: number) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border ${selectedImage === index ? "border-cyan-500" : "border-white/10"} bg-gray-900/50 backdrop-blur-sm`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} view ${index + 1}`}
                    width={200}
                    height={200}
                    className="object-cover w-full h-full"
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="lg:w-1/2"
          >
            <motion.div variants={fadeIn} className="mb-2">
              <Link
                href={`/collections?tab=${product.collection.toLowerCase().replace(" ", "-")}`}
                className="text-sm text-cyan-400 hover:underline"
              >
                {product.collection}
              </Link>
            </motion.div>

            <motion.h1 variants={fadeIn} className="text-3xl md:text-4xl font-bold mb-4">
              {product.name}
            </motion.h1>

            <motion.div variants={fadeIn} className="flex items-center gap-4 mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "fill-muted stroke-muted-foreground"}`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-400">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            </motion.div>

            <motion.div variants={fadeIn} className="mb-6">
              <span className="text-3xl font-bold text-cyan-400">${product.price.toLocaleString()}</span>
              {!product.inStock && <span className="ml-4 text-red-500">Out of Stock</span>}
            </motion.div>

            <motion.p variants={fadeIn} className="text-gray-300 mb-8">
              {product.description}
            </motion.p>

            <motion.div variants={fadeIn} className="mb-8">
              <h3 className="text-lg font-semibold mb-3">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature: string, index: number) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                    className="flex items-center"
                  >
                    <CheckCircle className="h-5 w-5 text-cyan-400 mr-2" />
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <Separator className="bg-white/10 my-8" />

            <motion.div variants={fadeIn} className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Color</h3>
              <div className="flex gap-3">
                {product.colors.map((color: string) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${selectedColor === color ? "border-2 border-cyan-500" : "border border-white/20"}`}
                  >
                    <span className="sr-only">{color}</span>
                    <span
                      className="w-8 h-8 rounded-full"
                      style={{
                        backgroundColor:
                          color === "Black"
                            ? "#111"
                            : color === "Silver"
                              ? "#C0C0C0"
                              : color === "Blue"
                                ? "#0066CC"
                                : color === "Navy"
                                  ? "#000080"
                                  : color === "Orange"
                                    ? "#FF6600"
                                    : color === "Transparent"
                                      ? "rgba(255,255,255,0.1)"
                                      : color === "Rose Gold"
                                        ? "#B76E79"
                                        : color === "Platinum"
                                          ? "#E5E4E2"
                                          : color === "Graphite"
                                            ? "#333333"
                                            : "#FFF",
                      }}
                    ></span>
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeIn} className="mb-8">
              <h3 className="text-lg font-semibold mb-4">Quantity</h3>
              <div className="flex items-center">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="w-10 h-10 rounded-l-lg border border-white/20 flex items-center justify-center disabled:opacity-50"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <div className="w-16 h-10 border-t border-b border-white/20 flex items-center justify-center">
                  {quantity}
                </div>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-r-lg border border-white/20 flex items-center justify-center"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </motion.div>

            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                disabled={!product.inStock}
                className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0 rounded-xl py-6 flex-1"
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button variant="outline" className="border-white/20 hover:bg-white/10 rounded-xl py-6">
                <Heart className="mr-2 h-5 w-5" />
                Add to Wishlist
              </Button>
              <Button
                variant="outline"
                className="border-white/20 hover:bg-white/10 rounded-xl py-6 sm:w-12 flex items-center justify-center"
              >
                <Share2 className="h-5 w-5" />
                <span className="sr-only">Share</span>
              </Button>
            </motion.div>

            <Separator className="bg-white/10 my-8" />

            <motion.div variants={fadeIn}>
              <Tabs defaultValue="description" className="w-full">
                <TabsList className="bg-gray-800/50 border border-white/10 rounded-xl p-1 w-full grid grid-cols-3">
                  <TabsTrigger
                    value="description"
                    className="data-[state=active]:bg-gradient-to-r from-cyan-500 to-purple-600 data-[state=active]:text-white rounded-lg"
                  >
                    Description
                  </TabsTrigger>
                  <TabsTrigger
                    value="specifications"
                    className="data-[state=active]:bg-gradient-to-r from-cyan-500 to-purple-600 data-[state=active]:text-white rounded-lg"
                  >
                    Specifications
                  </TabsTrigger>
                  <TabsTrigger
                    value="reviews"
                    className="data-[state=active]:bg-gradient-to-r from-cyan-500 to-purple-600 data-[state=active]:text-white rounded-lg"
                  >
                    Reviews
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="mt-6">
                  <p className="text-gray-300">{product.longDescription}</p>
                </TabsContent>
                <TabsContent value="specifications" className="mt-6">
                  <div className="space-y-2">
                    {product.specifications.map((spec: { name: string; value: string }, index: number) => (
                      <div key={index} className="grid grid-cols-2 py-2 border-b border-white/10">
                        <span className="font-medium">{spec.name}</span>
                        <span className="text-gray-300">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="reviews" className="mt-6">
                  <div className="text-center py-8">
                    <div className="flex justify-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-8 h-8 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "fill-muted stroke-muted-foreground"}`}
                        />
                      ))}
                    </div>
                    <p className="text-2xl font-bold mb-2">{product.rating} out of 5</p>
                    <p className="text-gray-400 mb-6">Based on {product.reviews} reviews</p>
                    <Button className="bg-white/10 hover:bg-white/20 rounded-xl">Write a Review</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </motion.div>
        </div>

        {/* Related Products */}
        <motion.div initial="hidden" animate={inView ? "visible" : "hidden"} variants={fadeIn} className="mt-24">
          <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.values(products)
              .filter((p) => p.id !== product.id)
              .slice(0, 4)
              .map((relatedProduct) => (
                <motion.div
                  key={relatedProduct.id}
                  whileHover={{ y: -10 }}
                  className="group relative overflow-hidden rounded-xl border border-white/10 bg-gray-900/50 backdrop-blur-sm transition-all hover:border-cyan-500/50"
                >
                  <div className="aspect-square overflow-hidden">
                    <Image
                      src={relatedProduct.images[0] || "/placeholder.svg"}
                      alt={relatedProduct.name}
                      width={400}
                      height={400}
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium mb-1 truncate">{relatedProduct.name}</h3>
                    <p className="text-cyan-400 font-bold">${relatedProduct.price.toLocaleString()}</p>
                    <Link
                      href={`/collections/${relatedProduct.id}`}
                      className="mt-2 text-sm text-gray-400 hover:text-cyan-400 flex items-center"
                    >
                      View Details <ChevronRight className="h-3 w-3 ml-1" />
                    </Link>
                  </div>
                </motion.div>
              ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
