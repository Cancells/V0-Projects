"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function addToCart(productId: string, quantity: number, color?: string) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return { error: "You must be logged in to add items to your cart" }
    }

    // Check if product exists and is in stock
    const product = await db.product.findUnique({
      where: {
        id: productId,
      },
    })

    if (!product) {
      return { error: "Product not found" }
    }

    if (!product.inStock) {
      return { error: "Product is out of stock" }
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
      await db.cartItem.update({
        where: {
          id: existingCartItem.id,
        },
        data: {
          quantity: existingCartItem.quantity + quantity,
        },
      })
    } else {
      // Create new cart item
      await db.cartItem.create({
        data: {
          userId: session.user.id,
          productId,
          quantity,
          color,
        },
      })
    }

    revalidatePath("/cart")
    return { success: "Item added to cart" }
  } catch (error) {
    console.error("Error adding to cart:", error)
    return { error: "Failed to add item to cart" }
  }
}

export async function updateCartItem(id: string, quantity: number) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return { error: "You must be logged in to update your cart" }
    }

    // Check if cart item exists and belongs to user
    const cartItem = await db.cartItem.findUnique({
      where: {
        id,
      },
    })

    if (!cartItem) {
      return { error: "Cart item not found" }
    }

    if (cartItem.userId !== session.user.id) {
      return { error: "You do not have permission to update this cart item" }
    }

    // Update cart item
    await db.cartItem.update({
      where: {
        id,
      },
      data: {
        quantity,
      },
    })

    revalidatePath("/cart")
    return { success: "Cart updated" }
  } catch (error) {
    console.error("Error updating cart item:", error)
    return { error: "Failed to update cart item" }
  }
}

export async function removeCartItem(id: string) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return { error: "You must be logged in to remove items from your cart" }
    }

    // Check if cart item exists and belongs to user
    const cartItem = await db.cartItem.findUnique({
      where: {
        id,
      },
    })

    if (!cartItem) {
      return { error: "Cart item not found" }
    }

    if (cartItem.userId !== session.user.id) {
      return { error: "You do not have permission to remove this cart item" }
    }

    // Delete cart item
    await db.cartItem.delete({
      where: {
        id,
      },
    })

    revalidatePath("/cart")
    return { success: "Item removed from cart" }
  } catch (error) {
    console.error("Error removing cart item:", error)
    return { error: "Failed to remove cart item" }
  }
}
