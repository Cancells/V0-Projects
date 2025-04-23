"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const reviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(3, "Comment must be at least 3 characters"),
})

export async function addReview(productId: string, formData: FormData) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return { error: "You must be logged in to leave a review" }
    }

    const validatedFields = reviewSchema.parse({
      rating: Number(formData.get("rating")),
      comment: formData.get("comment"),
    })

    const { rating, comment } = validatedFields

    // Check if product exists
    const product = await db.product.findUnique({
      where: {
        id: productId,
      },
    })

    if (!product) {
      return { error: "Product not found" }
    }

    // Check if user has already reviewed this product
    const existingReview = await db.review.findFirst({
      where: {
        userId: session.user.id,
        productId,
      },
    })

    if (existingReview) {
      return { error: "You have already reviewed this product" }
    }

    // Create review
    await db.review.create({
      data: {
        userId: session.user.id,
        productId,
        rating,
        comment,
      },
    })

    revalidatePath(`/collections/${productId}`)
    return { success: "Review submitted successfully" }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message }
    }

    console.error("Error creating review:", error)
    return { error: "Failed to submit review" }
  }
}
