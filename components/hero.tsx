"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative py-20 px-4 sm:py-32 overflow-hidden bg-gradient-to-b from-background via-background to-secondary/20">
      {/* Banana decorations */}
      <div className="absolute left-10 top-20 text-6xl opacity-50 animate-bounce">🍌</div>
      <div className="absolute right-10 bottom-20 text-6xl opacity-50 animate-bounce" style={{ animationDelay: "1s" }}>
        🍌
      </div>

      <div className="max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
          <span className="text-sm font-medium text-primary">✨ Advanced AI Model</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl sm:text-6xl font-bold text-foreground mb-6 leading-tight">
          <span className="text-primary">Nano Banana</span>
          <br />
          AI Image Editor
        </h1>

        {/* Description */}
        <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto leading-relaxed">
          Transform any image with simple text prompts. Nano-banana's advanced model delivers consistent character
          editing and scene preservation that surpasses Flux Kontext. Experience the future of AI image editing.
        </p>

        {/* Features */}
        <div className="flex flex-wrap justify-center gap-6 mb-10 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-primary text-xl">●</span>
            <span className="text-foreground">One-shot editing</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-primary text-xl">⚡</span>
            <span className="text-foreground">Multi-image support</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-primary text-xl">💬</span>
            <span className="text-foreground">Natural language</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/editor">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 rounded-full"
            >
              Start Editing
            </Button>
          </Link>
          <Button
            variant="outline"
            size="lg"
            className="border-primary text-primary hover:bg-primary/10 px-8 rounded-full bg-transparent"
          >
            View Examples →
          </Button>
        </div>
      </div>
    </section>
  )
}
