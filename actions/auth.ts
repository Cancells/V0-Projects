"use server"

import { z } from "zod"
import { db } from "@/lib/db"
import bcrypt from "bcryptjs"
import { signIn } from "next-auth/react"

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export async function register(formData: FormData) {
  try {
    const validatedFields = registerSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    })

    const { name, email, password } = validatedFields

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return { error: "User with this email already exists" }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    return { success: "Account created successfully" }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message }
    }

    return { error: "Something went wrong. Please try again." }
  }
}

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
})

export async function login(formData: FormData) {
  try {
    const validatedFields = loginSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    })

    const { email, password } = validatedFields

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      return { error: "Invalid email or password" }
    }

    return { success: "Logged in successfully" }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message }
    }

    return { error: "Something went wrong. Please try again." }
  }
}
