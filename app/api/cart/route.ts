import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"
import { z } from "zod"

// Get cart items
export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "You must be logged in to view your cart" }, { status: 401 })
    }

    const cartItems = await db.cartItem.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        product: true,
      },
    })

    return NextResponse.json(cartItems)
  } catch (error) {
    console.error("Error fetching cart:", error)
    return NextResponse.json({ error: "Failed to fetch cart" }, { status: 500 })
  }
}

// Add item to cart
const addToCartSchema = z.object({
  productId: z.string(),
  quantity: z.number().int().positive(),
  color: z.string().optional(),
})

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "You must be logged in to add items to your cart" }, { status: 401 })
    }

    const body = await req.json()
    const { productId, quantity, color } = addToCartSchema.parse(body)

    // Check if product exists and is in stock
    const product = await db.product.findUnique({
      where: {
        id: productId,
      },
    })

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    if (!product.inStock) {
      return NextResponse.json({ error: "Product is out of stock" }, { status: 400 })
    }

    // Check if item already exists in cart
    const existingCartItem = await db.cartItem.findFirst({
      where: {
        userId: session.user.id,
        productId,
        color: color || null,
      },
    })

    if (existingCartItem) {
      // Update quantity if item already exists
      const updatedCartItem = await db.cartItem.update({
        where: {
          id: existingCartItem.id,
        },
        data: {
          quantity: existingCartItem.quantity + quantity,
        },
        include: {
          product: true,
        },
      })

      return NextResponse.json(updatedCartItem)
    }

    // Create new cart item
    const cartItem = await db.cartItem.create({
      data: {
        userId: session.user.id,
        productId,
        quantity,
        color,
      },
      include: {
        product: true,
      },
    })

    return NextResponse.json(cartItem, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }

    console.error("Error adding to cart:", error)
    return NextResponse.json({ error: "Failed to add item to cart" }, { status: 500 })
  }
}
