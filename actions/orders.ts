"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { redirect } from "next/navigation"

const shippingInfoSchema = z.object({
  name: z.string().min(2, "Name is required"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  postalCode: z.string().min(3, "Postal code is required"),
  country: z.string().min(2, "Country is required"),
  phone: z.string().min(5, "Phone number is required"),
})

export async function createOrder(formData: FormData) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return { error: "You must be logged in to place an order" }
    }

    // Validate shipping info
    const shippingInfo = {
      name: formData.get("name") as string,
      address: formData.get("address") as string,
      city: formData.get("city") as string,
      state: formData.get("state") as string,
      postalCode: formData.get("postalCode") as string,
      country: formData.get("country") as string,
      phone: formData.get("phone") as string,
    }

    const validatedShippingInfo = shippingInfoSchema.parse(shippingInfo)

    // Get cart items
    const cartItems = await db.cartItem.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        product: true,
      },
    })

    if (cartItems.length === 0) {
      return { error: "Your cart is empty" }
    }

    // Calculate total
    const total = cartItems.reduce((sum, item) => sum + Number(item.product.price) * item.quantity, 0)

    // Create order
    const order = await db.order.create({
      data: {
        userId: session.user.id,
        total,
        shippingInfo: validatedShippingInfo,
        items: {
          create: cartItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
            color: item.color,
          })),
        },
      },
    })

    // Clear cart after successful order
    await db.cartItem.deleteMany({
      where: {
        userId: session.user.id,
      },
    })

    revalidatePath("/cart")
    revalidatePath("/orders")

    // Redirect to order confirmation page
    redirect(`/orders/${order.id}`)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message }
    }

    console.error("Error creating order:", error)
    return { error: "Failed to place order" }
  }
}
