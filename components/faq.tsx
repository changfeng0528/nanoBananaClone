"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(0)

  const faqs = [
    {
      id: 0,
      question: "What is Nano Banana?",
      answer:
        "Nano Banana is an advanced AI image editor powered by cutting-edge technology. It allows you to transform any image using simple text prompts, delivering consistent character editing and scene preservation capabilities that surpass existing solutions.",
    },
    {
      id: 1,
      question: "How do I upload and edit images?",
      answer:
        'Simply click "Start Editing" to open the image uploader. Upload your image, write your desired edits as text instructions (e.g., "change the sky to purple"), and let our AI do the rest. Results appear instantly in the preview.',
    },
    {
      id: 2,
      question: "What file formats do you support?",
      answer:
        "We support all common image formats including JPG, PNG, WebP, and GIF. Maximum file size is 50MB. For best results, we recommend using images at least 512x512 pixels.",
    },
    {
      id: 3,
      question: "Can I edit multiple images at once?",
      answer:
        "Yes! Nano Banana supports batch processing with our multi-image editing feature. You can apply the same edits to multiple images simultaneously, saving you time on repetitive tasks.",
    },
    {
      id: 4,
      question: "How accurate is the AI editing?",
      answer:
        "Our model is trained on millions of images and achieves exceptional accuracy. It excels at understanding context, preserving character identity, and maintaining scene authenticity while making your requested edits.",
    },
    {
      id: 5,
      question: "Is there a free trial?",
      answer:
        "Yes! You can try Nano Banana for free with 5 image edits. Upgrade to our Pro plan for unlimited edits, batch processing, and priority support.",
    },
  ]

  return (
    <section id="faq" className="py-20 px-4 bg-secondary/30">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-foreground/60">Everything you need to know about Nano Banana</p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="bg-card border border-border rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted/50 transition"
              >
                <h3 className="text-lg font-semibold text-foreground text-left">{faq.question}</h3>
                <ChevronDown
                  className={`w-5 h-5 text-primary transition-transform ${openId === faq.id ? "rotate-180" : ""}`}
                />
              </button>

              {openId === faq.id && (
                <div className="px-6 py-4 border-t border-border bg-muted/30">
                  <p className="text-foreground/80 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Banana Decoration */}
        <div className="flex justify-center mt-12">
          <div className="text-6xl opacity-30">🍌</div>
        </div>
      </div>
    </section>
  )
}
