"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, X } from "lucide-react"
import Link from "next/link"

export default function EditorPage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedImages, setGeneratedImages] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleGenerate = async () => {
    if (uploadedImage && prompt) {
      setIsGenerating(true)
      setError(null)

      try {
        const response = await fetch('/api/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt,
            imageUrl: uploadedImage
          })
        })

        const data = await response.json()
        console.log('API Response:', data)

        if (data.success) {
          // 检查是否有图像数据
          if (data.images && data.images.length > 0) {
            // 提取所有图像URL
            const imageUrls = data.images.map(img => img.image_url.url)
            setGeneratedImages(prev => [...prev, ...imageUrls])
          } else if (data.result) {
            // 如果没有图像，显示文本结果
            setGeneratedImages(prev => [...prev, data.result])
          }
        } else {
          setError(data.error || 'Failed to generate image')
        }
      } catch (err) {
        setError('Network error occurred')
      } finally {
        setIsGenerating(false)
      }
    }
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-foreground hover:text-primary transition">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-3xl">🍌</div>
            <span className="text-xl font-bold text-foreground">Nano Banana Editor</span>
          </div>
          <div className="w-32"></div> {/* Spacer for centering */}
        </nav>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Display */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left side - Upload */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <span className="text-primary">📸</span> Upload Image
            </h2>

            {uploadedImage ? (
              <div className="relative w-full bg-muted rounded-xl overflow-hidden mb-4">
                <img
                  src={uploadedImage}
                  alt="Uploaded"
                  className="w-full h-auto max-h-96 object-contain"
                />
                <button
                  onClick={() => {
                    setUploadedImage(null)
                    if (fileInputRef.current) fileInputRef.current.value = ""
                  }}
                  className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-lg transition"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-96 border-2 border-dashed border-primary/30 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-primary/5 transition bg-muted mb-4"
              >
                <div className="text-6xl mb-4">📁</div>
                <p className="text-foreground font-medium text-lg">Drop your image here</p>
                <p className="text-foreground/50">or click to browse</p>
              </div>
            )}

            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
          </div>

          {/* Right side - Controls */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <span className="text-primary">💬</span> Edit Instructions
            </h2>

            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., Make the sky purple and add stars"
              className="w-full h-32 px-4 py-3 bg-muted border border-border rounded-lg text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 mb-6"
            />

            <Button
              onClick={handleGenerate}
              disabled={!uploadedImage || !prompt || isGenerating}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 h-12 text-lg"
            >
              {isGenerating ? "⏳ Generating..." : "🎯 Generate Now"}
            </Button>
          </div>
        </div>

        {/* Output Gallery */}
        {generatedImages.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <span className="text-primary">🖼️</span> Output Gallery
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {generatedImages.map((result, index) => (
                <div key={index} className="bg-muted rounded-lg p-4 border border-border">
                  <div className="text-sm text-foreground/80 mb-3">Result {index + 1}</div>
                  {result.startsWith('http') || result.startsWith('data:image') ? (
                    <img
                      src={result}
                      alt={`Generated result ${index + 1}`}
                      className="w-full h-auto rounded-lg"
                    />
                  ) : (
                    <div className="bg-background rounded-lg p-3 text-sm text-foreground">
                      {result}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}