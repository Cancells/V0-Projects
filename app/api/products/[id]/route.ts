import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const product = await db.product.findUnique({
      where: {
        id: params.id,
      },
      include: {
        collection: true,
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
      },
    })

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    // Calculate average rating
    const totalRatings = product.reviews.reduce((sum, review) => sum + review.rating, 0)
    const averageRating = product.reviews.length > 0 ? totalRatings / product.reviews.length : 0

    const productWithRating = {
      ...product,
      averageRating,
      reviewCount: product.reviews.length,
    }

    return NextResponse.json(productWithRating)
  } catch (error) {
    console.error("Error fetching product:", error)
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 })
  }
}
