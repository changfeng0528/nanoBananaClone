'use client'

import { createClient } from '@/lib/supabase/client'
import { GitHubLoginButton } from './github-login-button'
import { GoogleLoginButton } from './google-login-button'
import { UserProfile } from './user-profile'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { User } from '@supabase/supabase-js'

export function AuthClient() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let supabase: ReturnType<typeof createClient>

    try {
      supabase = createClient()
    } catch (err) {
      setError('Supabase not configured')
      setLoading(false)
      return
    }

    // Get initial session
    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)
      } catch (err) {
        console.error('Error getting user:', err)
      } finally {
        setLoading(false)
      }
    }

    getUser()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return (
      <Button variant="outline" disabled>
        Loading...
      </Button>
    )
  }

  if (error) {
    return (
      <Button
        variant="outline"
        className="border-primary text-primary hover:bg-primary/10 bg-transparent"
        disabled
      >
        Configure Supabase
      </Button>
    )
  }

  if (user) {
    return <UserProfile user={user} />
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 bg-transparent">
          Sign In
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem asChild>
          <Link href="/login" className="w-full">
            <Button variant="ghost" className="w-full justify-start">
              Email Sign In
            </Button>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <div className="w-full">
            <GitHubLoginButton className="w-full justify-start" />
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <div className="w-full">
            <GoogleLoginButton className="w-full justify-start" />
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}