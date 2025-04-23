import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"
import { z } from "zod"

// Add a review
const reviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(3, "Comment must be at least 3 characters"),
})

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "You must be logged in to leave a review" }, { status: 401 })
    }

    const body = await req.json()
    const { rating, comment } = reviewSchema.parse(body)

    // Check if product exists
    const product = await db.product.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    // Check if user has already reviewed this product
    const existingReview = await db.review.findFirst({
      where: {
        userId: session.user.id,
        productId: params.id,
      },
    })

    if (existingReview) {
      return NextResponse.json({ error: "You have already reviewed this product" }, { status: 400 })
    }

    // Create review
    const review = await db.review.create({
      data: {
        userId: session.user.id,
        productId: params.id,
        rating,
        comment,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    })

    return NextResponse.json(review, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }

    console.error("Error creating review:", error)
    return NextResponse.json({ error: "Failed to create review" }, { status: 500 })
  }
}
