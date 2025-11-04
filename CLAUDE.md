# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Development**: `pnpm dev` (or `npm run dev`)
- **Build**: `pnpm build` (or `npm run build`)
- **Production**: `pnpm start` (or `npm run start`)
- **Lint**: `pnpm lint` (or `npm run lint`)

## Architecture

This is a Next.js 16 application built as an AI image editor called "Nano Banana". The project follows a modern React architecture with these key characteristics:

### Framework & Tech Stack
- **Next.js 16** with App Router (app directory structure)
- **TypeScript** with strict mode enabled
- **Tailwind CSS v4** for styling with custom design tokens
- **shadcn/ui** component library (New York style, configured in components.json)
- **React 19** with React Server Components (RSC)
- **Lucide React** for icons

### Project Structure
- `app/` - Next.js App Router pages and layouts
  - `layout.tsx` - Root layout with analytics and fonts
  - `page.tsx` - Main landing page component
  - `globals.css` - Global styles with Tailwind and custom CSS variables
- `components/` - Reusable React components
  - `ui/` - shadcn/ui primitive components
  - Main feature components: header, hero, image-uploader, showcase, testimonials, faq, footer
- `lib/` - Utility functions (cn() for className merging)
- `hooks/` - Custom React hooks (use-mobile, use-toast)

### Key Features
- **Image Upload & Editing**: Core functionality in `image-uploader.tsx` component
- **Landing Page**: Marketing-style layout with multiple sections
- **Responsive Design**: Uses custom mobile detection hook
- **Theme Support**: Uses CSS custom properties for theming

### Configuration Notes
- Path aliases configured with `@/*` pointing to root directory
- TypeScript build errors are ignored in production (ignoreBuildErrors: true)
- Images are unoptimized for deployment flexibility
- Uses pnpm as package manager (pnpm-lock.yaml present)

### Development Patterns
- Client components marked with "use client" directive
- Consistent TypeScript interfaces for props
- shadcn/ui styling patterns with cn() utility
- Component composition pattern in main page layout