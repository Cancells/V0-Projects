import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const adminPassword = await bcrypt.hash("admin123", 10)
  await prisma.user.upsert({
    where: { email: "admin@chrono2030.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@chrono2030.com",
      password: adminPassword,
      role: "ADMIN",
    },
  })

  // Create collections
  const quantumCollection = await prisma.collection.upsert({
    where: { id: "quantum-series" },
    update: {},
    create: {
      id: "quantum-series",
      name: "Quantum Series",
      description: "Our flagship collection featuring quantum entanglement technology",
    },
  })

  const neuralCollection = await prisma.collection.upsert({
    where: { id: "neural-collection" },
    update: {},
    create: {
      id: "neural-collection",
      name: "Neural Collection",
      description: "Advanced neural interface timepieces that respond to thought patterns",
    },
  })

  const infinityCollection = await prisma.collection.upsert({
    where: { id: "infinity-line" },
    update: {},
    create: {
      id: "infinity-line",
      name: "Infinity Line",
      description: "Limited edition pieces that push the boundaries of watchmaking",
    },
  })

  // Create products
  await prisma.product.upsert({
    where: { id: "q1" },
    update: {},
    create: {
      id: "q1",
      name: "Quantum Chronograph X1",
      price: 17500,
      description:
        "The flagship of our Quantum Series, the Chronograph X1 represents the pinnacle of quantum timekeeping technology. Its revolutionary movement achieves accuracy to within 0.0000001 seconds per year through quantum entanglement with atomic clocks worldwide.",
      longDescription:
        "The Quantum Chronograph X1 is more than a timepiece—it's a revolution in horology. The watch features our proprietary Quantum Core movement, which utilizes principles of quantum mechanics to achieve unprecedented accuracy. The holographic display projects time in three dimensions, visible from any angle, while the neural interface allows for thought-controlled operation once calibrated to your unique neural patterns. The self-sustaining power system harnesses energy from temperature differentials, kinetic movement, and ambient light, eliminating the need for traditional charging or battery replacement.",
      images: [
        "/watch-quantum-x1.svg",
        "/watch-quantum-x1-side.svg",
        "/watch-quantum-x1.svg",
        "/watch-quantum-x1-detail.svg",
      ],
      features: [
        "Quantum Core Movement",
        "Holographic 3D Display",
        "Neural Interface",
        "Self-Sustaining Power",
        "Biometric Authentication",
      ],
      colors: ["Black", "Silver", "Blue"],
      isNew: true,
      inStock: true,
      collectionId: quantumCollection.id,
      specifications: {
        "Case Material": "Aerospace-grade titanium with quantum-resistant coating",
        "Case Diameter": "42mm",
        "Case Thickness": "11.5mm",
        "Water Resistance": "500 meters",
        Movement: "Quantum Core X1",
        "Power Reserve": "Unlimited (self-sustaining)",
        Crystal: "Synthetic sapphire with quantum anti-reflective coating",
        Dial: "Holographic projection with customizable displays",
        Strap: "Adaptive smart-fabric or titanium bracelet",
        Functions: "Hours, minutes, seconds, chronograph, world time, neural interface",
      },
    },
  })

  await prisma.product.upsert({
    where: { id: "q2" },
    update: {},
    create: {
      id: "q2",
      name: "Quantum Diver Pro",
      price: 19800,
      description:
        "Designed for the depths of both Earth's oceans and the vacuum of space, the Quantum Diver Pro features pressure-adaptive case technology and unparalleled water resistance.",
      longDescription:
        "The Quantum Diver Pro redefines what's possible in a diving watch. Its revolutionary pressure-adaptive case technology automatically responds to external pressure changes, maintaining structural integrity at depths of up to 1000 meters. The watch features luminescent quantum dots that provide perfect visibility in even the darkest underwater environments. The Quantum Core movement ensures perfect timekeeping regardless of pressure or temperature extremes, while the integrated depth sensor and decompression calculator provide critical information for professional divers.",
      images: [
        "/watch-quantum-diver.svg",
        "/watch-quantum-diver.svg",
        "/watch-quantum-diver.svg",
        "/watch-quantum-diver.svg",
      ],
      features: [
        "1000m Water Resistance",
        "Pressure Adaptive Case",
        "Quantum Core",
        "Decompression Calculator",
        "Luminescent Quantum Dots",
      ],
      colors: ["Black", "Navy", "Orange"],
      isNew: false,
      inStock: true,
      collectionId: quantumCollection.id,
      specifications: {
        "Case Material": "Ultra-dense carbon composite with titanium reinforcement",
        "Case Diameter": "45mm",
        "Case Thickness": "14mm",
        "Water Resistance": "1000 meters",
        Movement: "Quantum Core Diver",
        "Power Reserve": "Unlimited (self-sustaining)",
        Crystal: "Extra-thick sapphire with pressure distribution system",
        Dial: "Quantum dot luminescence with depth indicator",
        Strap: "Expandable titanium or high-density polymer",
        Functions: "Hours, minutes, seconds, depth gauge, decompression calculator",
      },
    },
  })

  await prisma.product.upsert({
    where: { id: "q3" },
    update: {},
    create: {
      id: "q3",
      name: "Quantum Skeleton",
      price: 22500,
      description:
        "A mesmerizing blend of traditional skeleton watchmaking and quantum technology, revealing the intricate dance of mechanical and quantum components.",
      longDescription:
        "The Quantum Skeleton represents the perfect marriage of traditional horological craftsmanship and cutting-edge quantum technology. The transparent case and dial reveal the mesmerizing interplay between mechanical components and the quantum core. The gravity-defying balance wheel appears to float within the movement, suspended by quantum levitation. Each component is hand-finished by master craftsmen, with beveled edges and polished surfaces that catch and reflect light in stunning ways. The watch features a hybrid movement that combines traditional mechanical elements with quantum technology, creating a timepiece that honors watchmaking heritage while embracing the future.",
      images: [
        "/watch-quantum-skeleton.svg",
        "/watch-quantum-skeleton.svg",
        "/watch-quantum-skeleton.svg",
        "/watch-quantum-skeleton.svg",
      ],
      features: [
        "Transparent Mechanism",
        "Quantum Core",
        "Gravity Defying Balance",
        "Hand-Finished Components",
        "Quantum Levitation",
      ],
      colors: ["Transparent", "Rose Gold", "Platinum"],
      isNew: true,
      inStock: true,
      collectionId: quantumCollection.id,
      specifications: {
        "Case Material": "Transparent sapphire crystal with platinum accents",
        "Case Diameter": "40mm",
        "Case Thickness": "12mm",
        "Water Resistance": "50 meters",
        Movement: "Quantum Core Skeleton",
        "Power Reserve": "Unlimited (self-sustaining)",
        Crystal: "Domed sapphire with anti-reflective coating",
        Dial: "Skeletonized with exposed quantum components",
        Strap: "Hand-stitched alligator leather or platinum bracelet",
        Functions: "Hours, minutes, seconds, power reserve indicator",
      },
    },
  })

  await prisma.product.upsert({
    where: { id: "q4" },
    update: {},
    create: {
      id: "q4",
      name: "Quantum GMT",
      price: 18200,
      description:
        "Track time across multiple dimensions with the Quantum GMT, featuring our revolutionary multi-dimensional time tracking system.",
      longDescription:
        "The Quantum GMT transcends traditional GMT functionality by allowing you to track time not just across different time zones, but across different dimensions. The watch's quantum entanglement technology synchronizes with atomic clocks worldwide, ensuring perfect accuracy regardless of your location. The intuitive interface allows you to easily switch between different time zones and dimensional planes, making it the perfect companion for the interdimensional traveler.",
      images: ["/watch-quantum-gmt.svg", "/watch-quantum-gmt.svg", "/watch-quantum-gmt.svg", "/watch-quantum-gmt.svg"],
      features: [
        "Multi-Dimension Time",
        "Quantum Core",
        "Timezone Synchronization",
        "Dimensional Shift Indicator",
        "Quantum Entanglement",
      ],
      colors: ["Black", "Blue", "Silver"],
      isNew: false,
      inStock: true,
      collectionId: quantumCollection.id,
      specifications: {
        "Case Material": "Titanium with quantum-resistant coating",
        "Case Diameter": "44mm",
        "Case Thickness": "13mm",
        "Water Resistance": "300 meters",
        Movement: "Quantum Core GMT",
        "Power Reserve": "Unlimited (self-sustaining)",
        Crystal: "Sapphire with multi-dimensional display",
        Dial: "Holographic with timezone indicators",
        Strap: "Titanium bracelet or adaptive smart-fabric",
        Functions: "Hours, minutes, seconds, GMT, dimensional shift indicator",
      },
    },
  })

  await prisma.product.upsert({
    where: { id: "n1" },
    update: {},
    create: {
      id: "n1",
      name: "Neural Commander",
      price: 24500,
      description:
        "Our most advanced neural interface timepiece, allowing complete thought control and personalized function mapping to your unique neural patterns.",
      longDescription:
        "The Neural Commander represents the most sophisticated neural interface technology available in a wearable device. After a simple calibration process, the watch learns to recognize your unique thought patterns, allowing for intuitive control of all functions without physical interaction. The adaptive AI system continuously improves its response to your neural commands, becoming more accurate over time. The customizable function mapping allows you to assign specific thoughts to watch functions, creating a truly personalized experience. The Neural Commander also features advanced security protocols that ensure only you can control the watch through neural commands.",
      images: [
        "/watch-neural-commander.svg",
        "/watch-neural-commander.svg",
        "/watch-neural-commander.svg",
        "/watch-neural-commander.svg",
      ],
      features: [
        "Advanced Neural Interface",
        "Thought Control",
        "Quantum Core",
        "Adaptive AI",
        "Personalized Function Mapping",
      ],
      colors: ["Black", "Silver", "Graphite"],
      isNew: true,
      inStock: true,
      collectionId: neuralCollection.id,
      specifications: {
        "Case Material": "Neuro-conductive titanium alloy",
        "Case Diameter": "43mm",
        "Case Thickness": "12mm",
        "Water Resistance": "300 meters",
        Movement: "Quantum Core Neural",
        "Power Reserve": "Unlimited (self-sustaining)",
        Crystal: "Sapphire with neural-responsive coating",
        Dial: "Adaptive display with neural feedback indicators",
        Strap: "Neural-conductive smart fabric",
        Functions: "Hours, minutes, seconds, chronograph, world time, all controllable via thought",
      },
    },
  })

  await prisma.product.upsert({
    where: { id: "i1" },
    update: {},
    create: {
      id: "i1",
      name: "Infinity Tourbillon",
      price: 95000,
      description:
        "Our masterpiece of horological art, featuring a revolutionary anti-gravity tourbillon suspended within a transparent sapphire crystal case.",
      longDescription:
        "The Infinity Tourbillon represents the absolute pinnacle of Chrono 2030's watchmaking prowess. The revolutionary anti-gravity tourbillon appears to float within the transparent sapphire crystal case, defying the laws of physics through quantum levitation technology. Each watch is assembled by a single master watchmaker who dedicates over 500 hours to its creation. The movement consists of 408 hand-finished components, including the quantum core that powers the anti-gravity system. The sapphire crystal case provides unobstructed views of the mesmerizing mechanism from all angles, while still maintaining exceptional durability and water resistance. Limited to just 30 pieces worldwide, the Infinity Tourbillon is a true collector's masterpiece.",
      images: [
        "/watch-infinity-tourbillon.svg",
        "/watch-infinity-tourbillon.svg",
        "/watch-infinity-tourbillon.svg",
        "/watch-infinity-tourbillon.svg",
      ],
      features: [
        "Anti-Gravity Tourbillon",
        "Quantum Core",
        "Sapphire Crystal Case",
        "500+ Hours of Craftsmanship",
        "Limited to 30 Pieces",
      ],
      colors: ["Transparent", "Platinum", "Rose Gold"],
      isNew: true,
      inStock: false,
      collectionId: infinityCollection.id,
      specifications: {
        "Case Material": "Single-piece sapphire crystal with platinum elements",
        "Case Diameter": "44mm",
        "Case Thickness": "15mm",
        "Water Resistance": "50 meters",
        Movement: "Quantum Core Infinity Tourbillon",
        "Power Reserve": "Unlimited (self-sustaining)",
        Crystal: "Integrated sapphire case",
        Dial: "Skeletonized with floating hour markers",
        Strap: "Hand-stitched alligator leather with platinum deployant clasp",
        Functions: "Hours, minutes, anti-gravity tourbillon, power reserve indicator",
      },
    },
  })

  console.log("Database seeded successfully!")
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
