"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function addToWishlist(productId: string) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return { error: "You must be logged in to add items to your wishlist" }
    }

    // Check if product exists
    const product = await db.product.findUnique({
      where: {
        id: productId,
      },
    })

    if (!product) {
      return { error: "Product not found" }
    }

    // Check if item already exists in wishlist
    const existingWishlistItem = await db.wishlistItem.findFirst({
      where: {
        userId: session.user.id,
        productId,
      },
    })

    if (existingWishlistItem) {
      return { error: "Product already in wishlist" }
    }

    // Create new wishlist item
    await db.wishlistItem.create({
      data: {
        userId: session.user.id,
        productId,
      },
    })

    revalidatePath("/wishlist")
    return { success: "Item added to wishlist" }
  } catch (error) {
    console.error("Error adding to wishlist:", error)
    return { error: "Failed to add item to wishlist" }
  }
}

export async function removeFromWishlist(id: string) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return { error: "You must be logged in to remove items from your wishlist" }
    }

    // Check if wishlist item exists and belongs to user
    const wishlistItem = await db.wishlistItem.findUnique({
      where: {
        id,
      },
    })

    if (!wishlistItem) {
      return { error: "Wishlist item not found" }
    }

    if (wishlistItem.userId !== session.user.id) {
      return { error: "You do not have permission to remove this wishlist item" }
    }

    // Delete wishlist item
    await db.wishlistItem.delete({
      where: {
        id,
      },
    })

    revalidatePath("/wishlist")
    return { success: "Item removed from wishlist" }
  } catch (error) {
    console.error("Error removing wishlist item:", error)
    return { error: "Failed to remove wishlist item" }
  }
}
