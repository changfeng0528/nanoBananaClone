import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const supabase = createClient()

  // Get provider from request body, default to github for backward compatibility
  const body = await request.json().catch(() => ({}))
  const provider = body.provider || 'github'

  // Validate provider
  const allowedProviders = ['github', 'google']
  if (!allowedProviders.includes(provider)) {
    return NextResponse.json({ error: 'Invalid provider' }, { status: 400 })
  }

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: provider as 'github' | 'google',
    options: {
      redirectTo: `${request.nextUrl.origin}/auth/callback`,
    },
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.redirect(data.url)
}