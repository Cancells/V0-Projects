"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle signup logic here
    console.log("Signup with:", name, email, password)
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-gray-400 hover:text-cyan-400 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to home
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md p-8 rounded-2xl border border-white/10 bg-gray-900/50 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/20 to-cyan-500/20 blur-xl rounded-2xl"></div>
          <div className="relative">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Create Account</h1>
              <p className="text-gray-400">Join the future of luxury timepieces</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium block">
                  Full Name
                </label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                  className="bg-gray-800/50 border-white/10 focus:border-purple-500 focus:ring-purple-500/20 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium block">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="bg-gray-800/50 border-white/10 focus:border-purple-500 focus:ring-purple-500/20 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium block">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="bg-gray-800/50 border-white/10 focus:border-purple-500 focus:ring-purple-500/20 rounded-xl pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-1">Password must be at least 8 characters long</p>
              </div>

              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 rounded border-gray-600 bg-gray-800 text-purple-500 focus:ring-purple-500/20"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-400">
                  I agree to the{" "}
                  <Link href="/terms" className="text-purple-400 hover:text-purple-300">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-purple-400 hover:text-purple-300">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 text-white border-0 rounded-xl py-6"
              >
                Create Account
              </Button>

              <div className="relative flex items-center justify-center">
                <div className="border-t border-white/10 absolute w-full"></div>
                <span className="bg-gray-900 px-2 text-sm text-gray-400 relative">Or sign up with</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="border-white/10 hover:bg-white/5 rounded-xl">
                  Google
                </Button>
                <Button variant="outline" className="border-white/10 hover:bg-white/5 rounded-xl">
                  Apple
                </Button>
              </div>
            </form>

            <p className="mt-6 text-center text-sm text-gray-400">
              Already have an account?{" "}
              <Link href="/login" className="text-purple-400 hover:text-purple-300">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
