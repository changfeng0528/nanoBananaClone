import { createClient } from '@/lib/supabase/server'
import { GitHubLoginButton } from './github-login-button'
import { UserProfile } from './user-profile'
import { Button } from './ui/button'

export async function AuthWrapper() {
  try {
    const supabase = createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user) {
      return <UserProfile user={user} />
    }

    return <GitHubLoginButton />
  } catch (error) {
    // If Supabase is not configured, show a placeholder button
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
}