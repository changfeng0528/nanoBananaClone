"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="text-3xl">🍌</div>
          <span className="text-xl font-bold text-foreground">Nano Banana</span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#showcase" className="text-foreground hover:text-primary transition">
            Image Editor
          </a>
          <a href="#testimonials" className="text-foreground hover:text-primary transition">
            Testimonials
          </a>
          <a href="#faq" className="text-foreground hover:text-primary transition">
            FAQ
          </a>
          <a href="#" className="text-foreground hover:text-primary transition">
            Pricing
          </a>
          <a href="#" className="text-foreground hover:text-primary transition">
            API
          </a>
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="hidden sm:inline-flex border-primary text-primary hover:bg-primary/10 bg-transparent"
          >
            Sign In
          </Button>
          <Link href="/editor">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              Launch Now
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  )
}
