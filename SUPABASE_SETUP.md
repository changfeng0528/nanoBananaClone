# Supabase Multi-Provider Authentication Setup Guide

This guide will help you configure GitHub and Google authentication with Supabase for your Nano Banana application.

## Prerequisites

1. A Supabase account and project
2. A GitHub account
3. A Google account
4. GitHub OAuth App
5. Google OAuth App

## Step 1: Create a GitHub OAuth App

1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Click "New OAuth App"
3. Fill in the details:
   - **Application name**: Nano Banana
   - **Homepage URL**: `http://localhost:3000` (for development)
   - **Authorization callback URL**: `http://localhost:3000/auth/callback`
4. Click "Register application"
5. Note down the **Client ID** and **Client Secret**

## Step 2: Create a Google OAuth App

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API" and enable it
4. Create OAuth 2.0 credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client IDs"
   - Set application type to "Web application"
   - Add authorized redirect URIs:
     - `http://localhost:3000/auth/callback` (for development)
     - Your production callback URL (when deploying)
5. Note down the **Client ID** and **Client Secret**

## Step 3: Configure Supabase

1. Go to your Supabase project dashboard
2. Navigate to Authentication > Providers

### Configure GitHub Provider
3. Find GitHub and click "Enable"
4. Enter your GitHub OAuth App credentials:
   - **Client ID**: From your GitHub OAuth App
   - **Client Secret**: From your GitHub OAuth App
5. Click "Save"

### Configure Google Provider
6. Find Google and click "Enable"
7. Enter your Google OAuth App credentials:
   - **Client ID**: From your Google Cloud Console
   - **Client Secret**: From your Google Cloud Console
8. Click "Save"

## Step 4: Configure Environment Variables

Update your `.env.local` file with your Supabase credentials:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

You can find these values in your Supabase project settings:
- Go to Settings > API
- Copy the Project URL and anon/public key

## Step 5: Configure Supabase Auth Settings

1. In your Supabase dashboard, go to Authentication > URL Configuration
2. Add your site URLs:
   - **Site URL**: `http://localhost:3000` (for development)
   - **Redirect URLs**: `http://localhost:3000/auth/callback`

For production, update these URLs to your actual domain.

## Step 6: Test the Implementation

1. Start your development server: `npm run dev`
2. Navigate to `http://localhost:3000`
3. Click the "Sign In" dropdown button in the header
4. Choose either "Sign in with GitHub" or "Sign in with Google"
5. You should be redirected to the chosen provider for authorization
6. After authorization, you'll be redirected back to your app as a logged-in user

## Features Implemented

### Server-Side Authentication
- ✅ Supabase SSR client configuration
- ✅ Middleware for session management
- ✅ Server-side user authentication

### API Routes
- ✅ `/auth/login` - Initiates OAuth flow for multiple providers (GitHub, Google)
- ✅ `/auth/google` - Direct Google OAuth initiation
- ✅ `/auth/callback` - Handles OAuth callback for all providers
- ✅ `/auth/logout` - Signs out the user
- ✅ `/auth/auth-code-error` - Error handling page

### UI Components
- ✅ `GitHubLoginButton` - Login button with GitHub icon
- ✅ `GoogleLoginButton` - Login button with Google icon
- ✅ `UserProfile` - User avatar and dropdown menu
- ✅ `AuthClient` - Multi-provider dropdown with authentication state
- ✅ Updated header with multi-provider authentication integration

### Security Features
- ✅ CSRF protection via Supabase
- ✅ Secure cookie handling
- ✅ Server-side session validation
- ✅ Automatic session refresh

## Troubleshooting

### Common Issues

1. **"Invalid redirect URL"**
   - Check that your callback URL in GitHub OAuth App matches exactly
   - Ensure the URL is added to Supabase Auth settings

2. **"Invalid client credentials"**
   - Verify your GitHub Client ID and Secret in Supabase
   - Make sure the OAuth App is not suspended

3. **Environment variables not loading**
   - Restart your development server after updating `.env.local`
   - Check that variable names match exactly

4. **User not persisting after redirect**
   - Verify middleware is properly configured
   - Check that cookies are being set correctly

## Production Deployment

When deploying to production:

1. Update GitHub OAuth App with production URLs
2. Update Supabase Auth settings with production URLs
3. Set environment variables in your hosting platform
4. Ensure HTTPS is enabled for secure cookie handling

## Next Steps

- Add user roles and permissions
- Implement protected routes
- Add user profile management
- Set up database policies for user data