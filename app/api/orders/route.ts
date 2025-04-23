import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"
import { z } from "zod"

// Get user orders
export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "You must be logged in to view your orders" }, { status: 401 })
    }

    const orders = await db.order.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(orders)
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}

// Create a new order
const shippingInfoSchema = z.object({
  name: z.string(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  postalCode: z.string(),
  country: z.string(),
  phone: z.string(),
})

const orderItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().int().positive(),
  price: z.number().positive(),
  color: z.string().optional(),
})

const createOrderSchema = z.object({
  items: z.array(orderItemSchema),
  shippingInfo: shippingInfoSchema,
  paymentInfo: z
    .object({
      id: z.string(),
      status: z.string(),
      type: z.string(),
    })
    .optional(),
})

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "You must be logged in to create an order" }, { status: 401 })
    }

    const body = await req.json()
    const { items, shippingInfo, paymentInfo } = createOrderSchema.parse(body)

    // Calculate total
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

    // Create order
    const order = await db.order.create({
      data: {
        userId: session.user.id,
        total,
        shippingInfo,
        paymentInfo: paymentInfo || undefined,
        items: {
          create: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
            color: item.color,
          })),
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    })

    // Clear cart after successful order
    await db.cartItem.deleteMany({
      where: {
        userId: session.user.id,
      },
    })

    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }

    console.error("Error creating order:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}
