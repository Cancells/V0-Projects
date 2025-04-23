// This is a placeholder that will be used during build time
const dummyPrismaClient = {
  user: {
    findUnique: () => Promise.resolve(null),
    findFirst: () => Promise.resolve(null),
    create: () => Promise.resolve(null),
  },
  // Add other models as needed for the build process
}

// This function will be used to get the Prisma client
// It will return the dummy client during build and the real client during runtime
export async function getPrismaClient() {
  // During build time or when not in a browser environment
  if (process.env.NODE_ENV === "production" && typeof window === "undefined") {
    try {
      const { PrismaClient } = await import("@prisma/client")
      return new PrismaClient()
    } catch (error) {
      console.error("Failed to load Prisma Client:", error)
      return dummyPrismaClient
    }
  }

  // During development
  if (process.env.NODE_ENV !== "production") {
    try {
      const { PrismaClient } = await import("@prisma/client")

      // PrismaClient is attached to the `global` object in development to prevent
      // exhausting your database connection limit.
      const globalForPrisma = global as unknown as { prisma: any }

      if (!globalForPrisma.prisma) {
        globalForPrisma.prisma = new PrismaClient({
          log: ["query", "error", "warn"],
        })
      }

      return globalForPrisma.prisma
    } catch (error) {
      console.error("Failed to load Prisma Client:", error)
      return dummyPrismaClient
    }
  }

  return dummyPrismaClient
}

// For backwards compatibility
export const db = dummyPrismaClient
