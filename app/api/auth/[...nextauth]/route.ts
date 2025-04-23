import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth"

// Wrap in try-catch to prevent build errors
let handler
try {
  handler = NextAuth(authOptions)
} catch (error) {
  console.error("NextAuth initialization error:", error)

  // Provide a fallback handler that returns an error
  handler = {
    GET: () =>
      new Response(JSON.stringify({ error: "Auth service unavailable" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }),
    POST: () =>
      new Response(JSON.stringify({ error: "Auth service unavailable" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }),
  }
}

export { handler as GET, handler as POST }
