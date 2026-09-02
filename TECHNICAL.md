# Technical Architecture & Setup Guide

## Overview

My.CV.Gen is built with a modern, scalable architecture using Next.js 14 (App Router) for full-stack development. This document outlines the technical design, project structure, and setup procedures.

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     Client Browser                          │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTPS
┌──────────────────────────▼──────────────────────────────────┐
│                    Next.js Application                       │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐  │
│  │  React Frontend  │  │  API Routes     │  │  Middleware  │  │
│  │  (App Router)   │  │  (Server Actions)│  │  (Auth)      │  │
│  └────────┬────────┘  └────────┬────────┘  └──────┬──────┘  │
└───────────┼────────────────────┼───────────────────┼────────┘
            │                    │                   │
┌───────────▼────────────────────▼───────────────────▼────────┐
│                     External Services                       │
│  ┌──────────────┐  ┌───────────────┐  ┌──────────────────┐  │
│  │   OpenAI     │  │   Anthropic   │  │   PostgreSQL     │  │
│  │   GPT-4      │  │   Claude      │  │   (Neon/Prisma)  │  │
│  └──────────────┘  └───────────────┘  └──────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## Project Structure

```
my-cv-gen/
├── .env.example                  # Environment variables template
├── .gitignore
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
├── prisma/
│   └── schema.prisma             # Database schema
├── public/
│   └── images/
│       └── templates/            # Template preview images
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── register/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── (dashboard)/
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   ├── cv/
│   │   │   │   └── [id]/
│   │   │   │       ├── page.tsx          # CV editor
│   │   │   │       └── preview/
│   │   │   │           └── page.tsx      # Fullscreen preview
│   │   │   └── layout.tsx
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── [...nextauth]/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── register/
│   │   │   │   │   └── route.ts
│   │   │   │   └── reset-password/
│   │   │   │       └── route.ts
│   │   │   ├── cvs/
│   │   │   │   ├── route.ts              # GET, POST
│   │   │   │   └── [id]/
│   │   │   │       ├── route.ts          # GET, PUT, DELETE
│   │   │   │       ├── duplicate/
│   │   │   │       │   └── route.ts
│   │   │   │       ├── design/
│   │   │   │       │   └── route.ts
│   │   │   │       └── export/
│   │   │   │           ├── pdf/
│   │   │   │           │   └── route.ts
│   │   │   │           └── ats/
│   │   │   │               └── route.ts
│   │   │   ├── ai/
│   │   │   │   ├── generate/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── regenerate/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── rewrite/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── skills/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── ats-score/
│   │   │   │   │   └── route.ts
│   │   │   │   └── providers/
│   │   │   │       └── route.ts
│   │   │   └── templates/
│   │   │       ├── route.ts
│   │   │       └── [id]/
│   │   │           └── route.ts
│   │   ├── layout.tsx                    # Root layout
│   │   └── page.tsx                      # Landing page
│   ├── components/
│   │   ├── ui/                           # Reusable UI components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── select.tsx
│   │   │   ├── modal.tsx
│   │   │   └── toast.tsx
│   │   ├── cv-editor/                    # CV editing components
│   │   │   ├── CVEditor.tsx
│   │   │   ├── ContextForm.tsx
│   │   │   ├── SectionEditor.tsx
│   │   │   └── DesignPanel.tsx
│   │   ├── cv-templates/                 # CV template rendering
│   │   │   ├── TemplateRenderer.tsx
│   │   │   ├── ModernTemplate.tsx
│   │   │   ├── ClassicTemplate.tsx
│   │   │   ├── MinimalTemplate.tsx
│   │   │   └── CreativeTemplate.tsx
│   │   ├── dashboard/
│   │   │   ├── Dashboard.tsx
│   │   │   ├── CVCard.tsx
│   │   │   └── CVModal.tsx
│   │   └── layout/
│   │       ├── Header.tsx
│   │       ├── Footer.tsx
│   │       └── Sidebar.tsx
│   ├── lib/
│   │   ├── ai/
│   │   │   ├── openai.ts                 # OpenAI integration
│   │   │   ├── anthropic.ts              # Claude integration
│   │   │   └── prompts.ts                # AI prompt templates
│   │   ├── db/
│   │   │   ├── prisma.ts                 # Prisma client
│   │   │   └── schema.ts                 # TypeScript types/match Prisma
│   │   ├── utils/
│   │   │   ├── auth.ts                   # Auth utilities
│   │   │   ├── validation.ts             # Input validators
│   │   │   ├── export.ts                 # PDF/export utilities
│   │   │   └── rateLimit.ts              # Rate limiting
│   │   └── constants/
│   │       ├── templates.ts              # Template definitions
│   │       └── colors.ts                 # Color palettes
│   ├── types/
│   │   ├── cv.ts                         # CV type definitions
│   │   ├── ai.ts                         # AI API types
│   │   └── user.ts                       # User types
│   └── middleware.ts                     # Route protection
└── tests/
    ├── unit/
    └── integration/
```

---

## Environment Variables

Create a `.env` file with the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/mycvgen"

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# OpenAI
OPENAI_API_KEY="your-openai-key"
OPENAI_MODEL="gpt-4"

# Anthropic
ANTHROPIC_API_KEY="your-anthropic-key"
ANTHROPIC_MODEL="claude-3-opus-20240229"

# Rate Limiting
RATE_LIMIT_MAX_CALLS=20
RATE_LIMIT_WINDOW_HOURS=1

# Cloudinary (for asset storage)
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

---

## Setup Commands

### 1. Initialize Next.js project
```bash
npx create-next-app@latest my-cv-gen --typescript --tailwind --eslint --app
```

### 2. Install dependencies
```bash
# Core packages
npm install @prisma/client @auth/prisma-adapter next-auth bcryptjs zod
npm install openai @anthropic-ai/sdk
npm install react-pdf @react-pdf/renderer
npm install zustand @tanstack/react-query
npm install lucide-react @radix-ui/react-toast @radix-ui/react-tooltip
npm install react-hook-form @hookform/resolvers
npm install date-fns
```

### 3. Dev dependencies
```bash
npm install -D prisma tsx @types/bcryptjs @types/node
```

### 4. Initialize database
```bash
npx prisma init
npx prisma migrate dev --name init
npx prisma generate
```

### 5. Run development server
```bash
npm run dev
```

---

## AI Provider Strategy

### OpenAI Integration
```typescript
// src/lib/ai/openai.ts
import OpenAI from 'openai'

export async function generateWithOpenAI(prompt: string, model = 'gpt-4') {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  
  const response = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL || model,
    messages: [
      { role: 'system', content: 'You are a professional CV writer.' },
      { role: 'user', content: prompt }
    ],
    response_format: { type: 'json_object' },
    temperature: 0.7
  })
  
  return JSON.parse(response.choices[0].message.content)
}
```

### Anthropic Integration
```typescript
// src/lib/ai/anthropic.ts
import Anthropic from '@anthropic-ai/sdk'

export async function generateWithClaude(prompt: string, model = 'claude-3-opus') {
  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  
  const response = await anthropic.messages.create({
    model: process.env.ANTHROPIC_MODEL || model,
    max_tokens: 4000,
    system: 'You are a professional CV writer. Return valid JSON.',
    messages: [{ role: 'user', content: prompt }]
  })
  
  const text = response.content[0].text
  return JSON.parse(text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1))
}
```

### Provider Factory Pattern
```typescript
// src/lib/ai/index.ts
export type AIProvider = 'openai' | 'anthropic'

export async function generateContent(
  provider: AIProvider,
  prompt: string,
  options?: any
) {
  switch (provider) {
    case 'openai':
      return generateWithOpenAI(prompt, options?.model)
    case 'anthropic':
      return generateWithClaude(prompt, options?.model)
    default:
      throw new Error(`Unknown provider: ${provider}`)
  }
}
```

---

## Deployment

### Vercel Deployment
1. Push code to GitHub
2. Import to Vercel
3. Add environment variables
4. Set up Neon PostgreSQL database
5. Run migrations post-deploy

### Database (Neon)
```bash
# After creating Neon DB, update DATABASE_URL
npx prisma migrate deploy
```

---

## Testing Strategy

### Unit Tests (Jest + React Testing Library)
```bash
npm run test
```

### Integration Tests
```bash
npm run test:integration
```

### E2E Tests (Cypress/Playwright)
```bash
npm run test:e2e
```
