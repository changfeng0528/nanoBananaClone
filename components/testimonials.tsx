"use client"

import { Star } from "lucide-react"

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      author: "Sarah Chen",
      role: "Creative Director",
      content:
        "Nano Banana has completely transformed my workflow. The quality is incredible and it saves hours of manual editing.",
      rating: 5,
    },
    {
      id: 2,
      author: "Marcus Johnson",
      role: "Content Creator",
      content:
        "The most intuitive AI image editor I've used. The natural language prompts make editing so easy and fun.",
      rating: 5,
    },
    {
      id: 3,
      author: "Emma Rodriguez",
      role: "Graphic Designer",
      content:
        "Finally, an AI tool that understands nuance. The character editing is precise and the results are consistently amazing.",
      rating: 5,
    },
    {
      id: 4,
      author: "James Williams",
      role: "Photographer",
      content:
        "Impressive results with minimal effort. Nano Banana outperforms other tools I've tried. Highly recommended!",
      rating: 5,
    },
  ]

  return (
    <section id="testimonials" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Loved by Creators</h2>
          <p className="text-xl text-foreground/60">
            Join thousands of satisfied users transforming their images with Nano Banana
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground/80 mb-6 leading-relaxed">"{testimonial.content}"</p>

              {/* Author */}
              <div>
                <p className="font-semibold text-foreground">{testimonial.author}</p>
                <p className="text-sm text-foreground/60">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
