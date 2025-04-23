import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"

// Remove item from wishlist
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "You must be logged in to remove items from your wishlist" }, { status: 401 })
    }

    // Check if wishlist item exists and belongs to user
    const wishlistItem = await db.wishlistItem.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!wishlistItem) {
      return NextResponse.json({ error: "Wishlist item not found" }, { status: 404 })
    }

    if (wishlistItem.userId !== session.user.id) {
      return NextResponse.json({ error: "You do not have permission to remove this wishlist item" }, { status: 403 })
    }

    // Delete wishlist item
    await db.wishlistItem.delete({
      where: {
        id: params.id,
      },
    })

    return NextResponse.json({ message: "Wishlist item removed successfully" })
  } catch (error) {
    console.error("Error removing wishlist item:", error)
    return NextResponse.json({ error: "Failed to remove wishlist item" }, { status: 500 })
  }
}
