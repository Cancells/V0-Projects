import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"
import { z } from "zod"

// Get wishlist items
export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "You must be logged in to view your wishlist" }, { status: 401 })
    }

    const wishlistItems = await db.wishlistItem.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        product: true,
      },
    })

    return NextResponse.json(wishlistItems)
  } catch (error) {
    console.error("Error fetching wishlist:", error)
    return NextResponse.json({ error: "Failed to fetch wishlist" }, { status: 500 })
  }
}

// Add item to wishlist
const addToWishlistSchema = z.object({
  productId: z.string(),
})

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "You must be logged in to add items to your wishlist" }, { status: 401 })
    }

    const body = await req.json()
    const { productId } = addToWishlistSchema.parse(body)

    // Check if product exists
    const product = await db.product.findUnique({
      where: {
        id: productId,
      },
    })

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    // Check if item already exists in wishlist
    const existingWishlistItem = await db.wishlistItem.findFirst({
      where: {
        userId: session.user.id,
        productId,
      },
    })

    if (existingWishlistItem) {
      return NextResponse.json({ error: "Product already in wishlist" }, { status: 400 })
    }

    // Create new wishlist item
    const wishlistItem = await db.wishlistItem.create({
      data: {
        userId: session.user.id,
        productId,
      },
      include: {
        product: true,
      },
    })

    return NextResponse.json(wishlistItem, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }

    console.error("Error adding to wishlist:", error)
    return NextResponse.json({ error: "Failed to add item to wishlist" }, { status: 500 })
  }
}
