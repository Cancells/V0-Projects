"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, CreditCard, Lock, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"

export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState("credit-card")

  const cartItems = [
    {
      id: 1,
      name: "Quantum Chronograph X1",
      price: 17500,
      image: "/placeholder.svg?height=100&width=100&text=Watch+1",
    },
    {
      id: 2,
      name: "Neural Interface Band",
      price: 3200,
      image: "/placeholder.svg?height=100&width=100&text=Accessory",
    },
  ]

  const subtotal = cartItems.reduce((total, item) => total + item.price, 0)
  const shipping = 0 // Free shipping
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle payment processing
    console.log("Processing payment...")
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-gray-400 hover:text-cyan-400 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Continue shopping
        </Link>

        <h1 className="text-3xl font-bold mt-8 mb-12 text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">Checkout</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="rounded-2xl border border-white/10 bg-gray-900/50 backdrop-blur-sm p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center">
                <ShoppingBag className="h-5 w-5 mr-2" />
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-lg overflow-hidden bg-gray-800 flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={100}
                        height={100}
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-gray-400 text-sm">Limited Edition</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">${item.price.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="bg-white/10 my-4" />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Tax</span>
                  <span>${tax.toLocaleString()}</span>
                </div>
              </div>

              <Separator className="bg-white/10 my-4" />

              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span className="text-xl text-cyan-400">${total.toLocaleString()}</span>
              </div>

              <div className="mt-6 text-xs text-gray-400 flex items-center justify-center">
                <Lock className="h-3 w-3 mr-1" />
                Secure, encrypted payment processing
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="rounded-2xl border border-white/10 bg-gray-900/50 backdrop-blur-sm p-6 relative overflow-hidden">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 blur-xl rounded-2xl"></div>
              <div className="relative">
                <h2 className="text-xl font-bold mb-6 flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Payment Details
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">First Name</Label>
                        <Input
                          id="first-name"
                          placeholder="John"
                          required
                          className="bg-gray-800/50 border-white/10 focus:border-cyan-500 focus:ring-cyan-500/20 rounded-xl"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Last Name</Label>
                        <Input
                          id="last-name"
                          placeholder="Doe"
                          required
                          className="bg-gray-800/50 border-white/10 focus:border-cyan-500 focus:ring-cyan-500/20 rounded-xl"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        required
                        className="bg-gray-800/50 border-white/10 focus:border-cyan-500 focus:ring-cyan-500/20 rounded-xl"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Shipping Address</Label>
                      <Input
                        id="address"
                        placeholder="123 Future Street"
                        required
                        className="bg-gray-800/50 border-white/10 focus:border-cyan-500 focus:ring-cyan-500/20 rounded-xl"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          placeholder="New York"
                          required
                          className="bg-gray-800/50 border-white/10 focus:border-cyan-500 focus:ring-cyan-500/20 rounded-xl"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          placeholder="NY"
                          required
                          className="bg-gray-800/50 border-white/10 focus:border-cyan-500 focus:ring-cyan-500/20 rounded-xl"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zip">ZIP Code</Label>
                        <Input
                          id="zip"
                          placeholder="10001"
                          required
                          className="bg-gray-800/50 border-white/10 focus:border-cyan-500 focus:ring-cyan-500/20 rounded-xl"
                        />
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-white/10" />

                  <div className="space-y-4">
                    <Label>Payment Method</Label>
                    <RadioGroup
                      value={paymentMethod}
                      onValueChange={setPaymentMethod}
                      className="grid grid-cols-1 md:grid-cols-3 gap-4"
                    >
                      <div
                        className={`border ${paymentMethod === "credit-card" ? "border-cyan-500" : "border-white/10"} rounded-xl p-4 cursor-pointer`}
                      >
                        <RadioGroupItem value="credit-card" id="credit-card" className="sr-only" />
                        <Label htmlFor="credit-card" className="flex items-center justify-center cursor-pointer">
                          Credit Card
                        </Label>
                      </div>
                      <div
                        className={`border ${paymentMethod === "crypto" ? "border-cyan-500" : "border-white/10"} rounded-xl p-4 cursor-pointer`}
                      >
                        <RadioGroupItem value="crypto" id="crypto" className="sr-only" />
                        <Label htmlFor="crypto" className="flex items-center justify-center cursor-pointer">
                          Cryptocurrency
                        </Label>
                      </div>
                      <div
                        className={`border ${paymentMethod === "neural-pay" ? "border-cyan-500" : "border-white/10"} rounded-xl p-4 cursor-pointer`}
                      >
                        <RadioGroupItem value="neural-pay" id="neural-pay" className="sr-only" />
                        <Label htmlFor="neural-pay" className="flex items-center justify-center cursor-pointer">
                          Neural Pay
                        </Label>
                      </div>
                    </RadioGroup>

                    {paymentMethod === "credit-card" && (
                      <div className="space-y-4 mt-4">
                        <div className="space-y-2">
                          <Label htmlFor="card-number">Card Number</Label>
                          <Input
                            id="card-number"
                            placeholder="1234 5678 9012 3456"
                            required
                            maxLength={19}
                            pattern="[0-9\s]{13,19}"
                            className="bg-gray-800/50 border-white/10 focus:border-cyan-500 focus:ring-cyan-500/20 rounded-xl"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input
                              id="expiry"
                              placeholder="MM/YY"
                              required
                              maxLength={5}
                              pattern="(0[1-9]|1[0-2])\/[0-9]{2}"
                              className="bg-gray-800/50 border-white/10 focus:border-cyan-500 focus:ring-cyan-500/20 rounded-xl"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvc">CVC</Label>
                            <Input
                              id="cvc"
                              placeholder="123"
                              required
                              maxLength={4}
                              pattern="[0-9]{3,4}"
                              className="bg-gray-800/50 border-white/10 focus:border-cyan-500 focus:ring-cyan-500/20 rounded-xl"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === "crypto" && (
                      <div className="space-y-4 mt-4">
                        <div className="p-4 bg-gray-800/50 rounded-xl border border-white/10 text-center">
                          <p className="text-sm text-gray-400 mb-2">Scan QR code or send to wallet address:</p>
                          <div className="bg-white p-4 rounded-lg w-32 h-32 mx-auto mb-2">
                            <div className="w-full h-full bg-gray-800"></div>
                          </div>
                          <p className="text-xs text-gray-400 break-all">0x742d35Cc6634C0532925a3b844Bc454e4438f44e</p>
                        </div>
                      </div>
                    )}

                    {paymentMethod === "neural-pay" && (
                      <div className="space-y-4 mt-4">
                        <div className="p-4 bg-gray-800/50 rounded-xl border border-white/10 text-center">
                          <p className="text-sm text-gray-400 mb-2">Connect your Neural Interface device</p>
                          <div className="w-32 h-32 mx-auto mb-2 rounded-full bg-gradient-to-r from-cyan-500/30 to-purple-600/30 flex items-center justify-center">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 animate-pulse"></div>
                          </div>
                          <p className="text-xs text-gray-400">Waiting for neural connection...</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0 rounded-xl py-6"
                  >
                    Complete Purchase
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
