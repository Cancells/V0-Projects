import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Check if we're missing critical environment variables
  const missingEnvVars = []

  if (!process.env.DATABASE_URL) missingEnvVars.push("DATABASE_URL")
  if (!process.env.NEXTAUTH_SECRET) missingEnvVars.push("NEXTAUTH_SECRET")

  // If we're missing any, redirect to an error page or show a console warning
  if (missingEnvVars.length > 0) {
    console.error(`Missing required environment variables: ${missingEnvVars.join(", ")}`)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
