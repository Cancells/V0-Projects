import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const collectionId = searchParams.get("collectionId")
    const search = searchParams.get("search")
    const limit = searchParams.get("limit") ? Number.parseInt(searchParams.get("limit")!) : undefined

    const whereClause: any = {}

    if (collectionId) {
      whereClause.collectionId = collectionId
    }

    if (search) {
      whereClause.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ]
    }

    const products = await db.product.findMany({
      where: whereClause,
      include: {
        collection: true,
        reviews: {
          select: {
            rating: true,
          },
        },
      },
      take: limit,
    })

    // Calculate average rating for each product
    const productsWithRating = products.map((product) => {
      const totalRatings = product.reviews.reduce((sum, review) => sum + review.rating, 0)
      const averageRating = product.reviews.length > 0 ? totalRatings / product.reviews.length : 0

      return {
        ...product,
        averageRating,
        reviewCount: product.reviews.length,
        reviews: undefined, // Remove the reviews array
      }
    })

    return NextResponse.json(productsWithRating)
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}
