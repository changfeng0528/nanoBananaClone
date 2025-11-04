import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "https://nano-banana.ai",
    "X-Title": "Nano Banana AI Image Editor",
  },
})

export async function POST(request: NextRequest) {
  try {
    const { prompt, imageUrl } = await request.json()

    if (!prompt || !imageUrl) {
      return NextResponse.json(
        { error: 'Prompt and image URL are required' },
        { status: 400 }
      )
    }

    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.5-flash-image",
      modalities: ["image", "text"],
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: prompt
            },
            {
              type: "image_url",
              image_url: {
                url: imageUrl
              }
            }
          ]
        }
      ],
      max_tokens: 4000
    })

    const response = completion.choices[0]?.message?.content
    const images = completion.choices[0]?.message?.images

    console.log('Full API Response:', JSON.stringify(completion.choices[0]?.message, null, 2))

    return NextResponse.json({
      success: true,
      result: response,
      images: images
    })

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Failed to process image' },
      { status: 500 }
    )
  }
}