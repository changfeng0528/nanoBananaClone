"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface ImageUploaderProps {
  onClose: () => void
}

export default function ImageUploader({ onClose }: ImageUploaderProps) {
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
          // 检查是否有图像内容
          if (data.imageContent && Array.isArray(data.imageContent)) {
            // 查找图像URL
            const imageItem = data.imageContent.find(item => item.type === 'image_url')
            if (imageItem) {
              setGeneratedImages(prev => [...prev, imageItem.image_url.url])
            } else {
              setGeneratedImages(prev => [...prev, data.result])
            }
          } else {
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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl border border-border w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-2xl font-bold text-foreground">AI Image Editor</h2>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Error Display */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left side - Upload */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="text-primary">📸</span> Upload Image
              </h3>

              {uploadedImage ? (
                <div className="relative w-full bg-muted rounded-xl overflow-hidden">
                  <img src={uploadedImage || "/placeholder.svg"} alt="Uploaded" className="w-full h-64 object-cover" />
                  <button
                    onClick={() => {
                      setUploadedImage(null)
                      if (fileInputRef.current) fileInputRef.current.value = ""
                    }}
                    className="absolute top-2 right-2 p-2 bg-black/50 hover:bg-black/70 rounded-lg transition"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-64 border-2 border-dashed border-primary/30 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-primary/5 transition bg-muted"
                >
                  <div className="text-4xl mb-2">📁</div>
                  <p className="text-foreground font-medium">Drop your image here</p>
                  <p className="text-foreground/50 text-sm">or click to browse</p>
                </div>
              )}

              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </div>

            {/* Right side - Preview */}
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="text-primary">✨</span> Preview
              </h3>

              <div className="w-full h-64 bg-muted border border-border rounded-xl flex items-center justify-center">
                {uploadedImage ? (
                  <img
                    src={uploadedImage || "/placeholder.svg"}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="text-center">
                    <div className="text-4xl mb-2">🎨</div>
                    <p className="text-foreground/50">Your edited image will appear here</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Prompt Input */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
              <span className="text-primary">💬</span> Edit Instructions
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., Make the sky purple and add stars"
              className="w-full h-24 px-4 py-3 bg-muted border border-border rounded-lg text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button onClick={onClose} variant="outline" className="flex-1 border-border hover:bg-muted bg-transparent">
              Cancel
            </Button>
            <Button
              onClick={handleGenerate}
              disabled={!uploadedImage || !prompt || isGenerating}
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              {isGenerating ? "⏳ Generating..." : "🎯 Generate Now"}
            </Button>
          </div>

          {/* Output Gallery */}
          {generatedImages.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="text-primary">🖼️</span> Output Gallery
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {generatedImages.map((result, index) => (
                  <div key={index} className="bg-muted rounded-lg p-4 border border-border">
                    <div className="text-sm text-foreground/80 mb-2">Result {index + 1}</div>
                    {result.startsWith('http') || result.startsWith('data:image') ? (
                      <img
                        src={result}
                        alt={`Generated result ${index + 1}`}
                        className="w-full h-48 object-cover rounded-lg"
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
      </div>
    </div>
  )
}
