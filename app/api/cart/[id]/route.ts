import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"
import { z } from "zod"

// Update cart item
const updateCartSchema = z.object({
  quantity: z.number().int().positive(),
})

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "You must be logged in to update your cart" }, { status: 401 })
    }

    const body = await req.json()
    const { quantity } = updateCartSchema.parse(body)

    // Check if cart item exists and belongs to user
    const cartItem = await db.cartItem.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!cartItem) {
      return NextResponse.json({ error: "Cart item not found" }, { status: 404 })
    }

    if (cartItem.userId !== session.user.id) {
      return NextResponse.json({ error: "You do not have permission to update this cart item" }, { status: 403 })
    }

    // Update cart item
    const updatedCartItem = await db.cartItem.update({
      where: {
        id: params.id,
      },
      data: {
        quantity,
      },
      include: {
        product: true,
      },
    })

    return NextResponse.json(updatedCartItem)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }

    console.error("Error updating cart item:", error)
    return NextResponse.json({ error: "Failed to update cart item" }, { status: 500 })
  }
}

// Remove item from cart
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "You must be logged in to remove items from your cart" }, { status: 401 })
    }

    // Check if cart item exists and belongs to user
    const cartItem = await db.cartItem.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!cartItem) {
      return NextResponse.json({ error: "Cart item not found" }, { status: 404 })
    }

    if (cartItem.userId !== session.user.id) {
      return NextResponse.json({ error: "You do not have permission to remove this cart item" }, { status: 403 })
    }

    // Delete cart item
    await db.cartItem.delete({
      where: {
        id: params.id,
      },
    })

    return NextResponse.json({ message: "Cart item removed successfully" })
  } catch (error) {
    console.error("Error removing cart item:", error)
    return NextResponse.json({ error: "Failed to remove cart item" }, { status: 500 })
  }
}
