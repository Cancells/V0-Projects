"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
    console.log("Login with:", email, password)
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
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 blur-xl rounded-2xl"></div>
          <div className="relative">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
              <p className="text-gray-400">Sign in to your Chrono 2030 account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
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
                  className="bg-gray-800/50 border-white/10 focus:border-cyan-500 focus:ring-cyan-500/20 rounded-xl"
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
                    className="bg-gray-800/50 border-white/10 focus:border-cyan-500 focus:ring-cyan-500/20 rounded-xl pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-600 bg-gray-800 text-cyan-500 focus:ring-cyan-500/20"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                    Remember me
                  </label>
                </div>
                <Link href="/forgot-password" className="text-sm text-cyan-400 hover:text-cyan-300">
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0 rounded-xl py-6"
              >
                Sign In
              </Button>

              <div className="relative flex items-center justify-center">
                <div className="border-t border-white/10 absolute w-full"></div>
                <span className="bg-gray-900 px-2 text-sm text-gray-400 relative">Or continue with</span>
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
              Don't have an account?{" "}
              <Link href="/signup" className="text-cyan-400 hover:text-cyan-300">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
