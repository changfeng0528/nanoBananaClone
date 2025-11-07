'use client'

import { Button } from '@/components/ui/button'
import { Github } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useState } from 'react'

interface GitHubLoginButtonProps {
  className?: string
}

export function GitHubLoginButton({ className }: GitHubLoginButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async () => {
    setIsLoading(true)
    try {
      const supabase = createClient()
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        console.error('GitHub login error:', error.message)
        if (error.message.includes('provider is not enabled')) {
          alert('GitHub login is not configured in Supabase yet. Please use email login or ask the admin to enable GitHub OAuth.')
        } else {
          alert('GitHub login failed. Please try email login instead.')
        }
      }
    } catch (error) {
      console.error('Login error:', error)
      alert('Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleLogin}
      disabled={isLoading}
      className={className}
      variant="outline"
    >
      <Github className="mr-2 h-4 w-4" />
      {isLoading ? 'Signing in...' : 'Sign in with GitHub'}
    </Button>
  )
}