import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const adminPassword = await bcrypt.hash("admin123", 10);
  await prisma.user.upsert({
    where: { email: "admin@chrono2030.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@chrono2030.com",
      password: adminPassword,
      role: "ADMIN",
    },
  });

  // Create collections
  const quantumCollection = await prisma.collection.upsert({
    where: { id: "quantum-series" },
    update: {},
    create: {
      id: "quantum-series",
      name: "Quantum Series",
      description: "Our flagship collection featuring quantum entanglement technology",
    },
  });

  const neuralCollection = await prisma.collection.upsert({
    where: { id: "neural-collection" },
    update: {},
    create: {
      id: "neural-collection",
      name: "Neural Collection",
      description: "Advanced neural interface timepieces that respond to thought patterns",
    },
  });

  const infinityCollection = await prisma.collection.upsert({
    where: { id: "infinity-line" },
    update: {},
    create: {
      id: "infinity-line",
      name: "Infinity Line",
      description: "Limited edition pieces that push the boundaries of watchmaking",
    },
  });

  // Create products
  await prisma.product.upsert({
    where: { id: "q1" },
    update: {},
    create: {
      id: "q1",
      name: "Quantum Chronograph X1",
      price: 17500,
      description: "The flagship of our Quantum Series, the Chronograph X1 represents the pinnacle of quantum timekeeping technology. Its revolutionary movement achieves accuracy to within 0.0000001 seconds per year through quantum entanglement with atomic clocks worldwide.",
      longDescription: "The Quantum Chronograph X1 is more than a timepiece—it's a revolution in horology. The watch features our proprietary Quantum Core movement, which utilizes principles of quantum mechanics to achieve unprecedented accuracy. The holographic display projects time in three dimensions, visible from any angle, while the neural interface allows for thought-controlled operation once calibrated to your unique neural patterns. The self-sustaining power system harnesses energy from temperature differentials, kinetic movement, and ambient light, eliminating the need for traditional charging or battery replacement.",
      images: ["/watch-quantum-x1.svg", "/watch-quantum-x1-side.svg", "/watch-quantum-x1.svg", "/watch-quantum-x1-detail.svg"],
      features: ["Quantum Core Movement", "Holographic 3D Display", "Neural Interface", "Self-Sustaining Power", "Biometric Authentication"],
      colors: ["Black", "Silver", "Blue"],
      isNew: true,
      inStock: true,
      collectionId: quantumCollection.id,
      specifications: {
        "Case Material": "Aerospace-grade titanium with quantum-resistant coating",
        "Case Diameter": "42mm",
        "Case Thickness": "11.5mm",
        "Water Resistance": "500 meters",
        "Movement": "Quantum Core X1",
        "Power Reserve": "Unlimited (self-sustaining)",
        "Crystal": "Synthetic sapphire with quantum anti-reflective coating",
        "Dial": "Holographic projection with customizable displays",
        "Strap": "Adaptive smart-fabric or titanium bracelet",
        "Functions": "Hours, minutes, seconds, chronograph, world time, neural interface"
      },
    },
  });

  await prisma.product.upsert({
    where: { id: "q2" },
    update: {},
    create: {
      id: "q2",
      name: "Quantum Diver Pro",
      price: 19800,
      description: "Designed for the depths of both Earth's oceans and the vacuum of space, the Quantum Diver Pro features pressure-adaptive case technology and unparalleled water resistance.",
      longDescription: "The Quantum Diver Pro redefines what's possible in a diving watch. Its revolutionary pressure-adaptive case technology automatically responds to external pressure changes, maintaining structural integrity at depths of up to 1000 meters. The watch features luminescent quantum dots that provide perfect visibility in even the darkest underwater environments. The Quantum Core movement ensures perfect timekeeping regardless of pressure or temperature extremes, while the integrated depth sensor and decompression calculator provide critical information for professional divers.",
      images: ["/watch-quantum-diver.svg", "/watch-quantum-diver.svg", "/watch-quantum-diver.svg", "/watch-quantum-diver.svg"],
      features: ["1000m Water Resistance", "Pressure Adaptive Case", "Quantum Core", "Decompression Calculator", "Luminescent Quantum Dots"],
      colors: ["Black", "Navy", "Orange"],
      isNew: false,
      inStock: true,
      collectionId: quantumCollection.id,
      specifications: {
        "Case Material": "Ultra-dense carbon composite with titanium reinforcement",
        "Case Diameter": "45mm",
        "Case Thickness": "14mm",
        "Water Resistance": "1000 meters",
        "Movement": "Quantum Core Diver",
        "Power Reserve": "Unlimited (self-sustaining)",
        "Crystal": "Extra-thick sapphire with pressure distribution system",
        "Dial": "Quantum dot luminescence with depth indicator",
        "Strap": "Expandable titanium or high-density polymer",
        "Functions": "Hours, minutes, seconds, depth gauge, decompression calculator"
      },
    },
  });

  await prisma.product.upsert({
    where: { id: "q3" },
    update: {},
    create: {
      id: "q3",
      name: "Quantum Skeleton",
      price: 22500,
      description: "A mesmerizing blend of traditional skeleton watchmaking and quantum technology, revealing the intricate dance of mechanical and quantum components.",
      longDescription: "The Quantum Skeleton represents the perfect marriage of traditional horological craftsmanship and cutting-edge quantum technology. The transparent case and dial reveal the mesmerizing interplay between mechanical components and the quantum core. The gravity-defying balance wheel appears to float within the movement, suspended by quantum levitation. Each component is hand-finished by master craftsmen, with beveled edges and polished surfaces that catch and reflect light in stunning ways. The watch features a hybrid movement that combines traditional mechanical elements with quantum technology, creating a timepiece that honors watchmaking heritage while embracing the future.",
      images: ["/watch-quantum-skeleton.svg", "/watch-quantum-skeleton.svg", "/watch-quantum-skeleton.svg", "/watch-quantum-skeleton.svg"],
      features: ["Transparent Mechanism", "Quantum Core", "Gravity Defying Balance", "Hand-Finished Components", "Quantum Levitation"],
      colors: ["Transparent", "Rose Gold", "Platinum"],
      isNew: true,
      inStock: true,
      collectionId: quantumCollection.id,
      specifications: {
        "Case Material": "Transparent sapphire crystal with platinum accents",
        "Case Diameter": "40mm",
        "Case Thickness": "12mm",
        "Water Resistance": "50 meters",
        "Movement": "Quantum Core Skeleton",
        "Power Reserve": "Unlimited (self-sustaining)",
        "Crystal": "Domed sapphire with anti-reflective coating",
        "Dial": "Skeletonized with exposed quantum components",
        "Strap": "Hand-stitched alligator leather or platinum bracelet",
        "Functions": "Hours, minutes, seconds, power reserve indicator"
      },
    },
  });

  await prisma.product.upsert({
    where: { id: "q4" },
    update: {},
    create: {
      id: "q4",
      name: "Quantum GMT",
      price: 18200,
      description: "Track time across multiple dimensions with the Quantum GMT, featuring our revolutionary multi-dimensional time tracking system.",
      longDescription: \"The Quantum GMT transcends traditional GMT functionality by allowing you to track time not just across different time zones, but across different dimensions. The watch's quantum entanglement technology synchronizes with atomic clocks worldwide, ensuring perfect accuracy regardless of your location. The intuitive interface allows you to easily switch between different time zones and dimensional planes, making it the perfect companion for the
