import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const collections = await db.collection.findMany({
      include: {
        products: {
          select: {
            id: true,
          },
        },
      },
    })

    // Add product count to each collection
    const collectionsWithCount = collections.map((collection) => ({
      ...collection,
      productCount: collection.products.length,
      products: undefined, // Remove the products array
    }))

    return NextResponse.json(collectionsWithCount)
  } catch (error) {
    console.error("Error fetching collections:", error)
    return NextResponse.json({ error: "Failed to fetch collections" }, { status: 500 })
  }
}
