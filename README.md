# My.CV.Gen

A modern web application that uses AI (OpenAI GPT-4 & Anthropic Claude) to help users create professional, fully customizable CVs in minutes.

## 🚀 Overview

My.CV.Gen lets users:
- **Generate CV content with AI** - Provide basic info, AI writes compelling, professional content
- **Customize everything** - Templates, colors, fonts, layout, sections, and style
- **Preview in real-time** - See changes as you make them
- **Export to PDF** - Professional, print-ready exports
- **Optimize for ATS** - Ensure your CV passes automated screening systems

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [PRD.md](./PRD.md) | Complete Product Requirements Document |
| [TECHNICAL.md](./TECHNICAL.md) | Architecture, project structure, setup guide |
| [prisma/schema.prisma](./prisma/schema.prisma) | Database schema |

## 🛠️ Tech Stack

- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **Backend:** Next.js API Routes
- **Database:** PostgreSQL with Prisma ORM
- **Auth:** NextAuth.js (JWT, Google, GitHub, credentials)
- **AI:** OpenAI GPT-4 & Anthropic Claude (provider-switchable)
- **PDF:** React-PDF / Puppeteer
- **Deployment:** Vercel + Neon/PlanetScale

## 📁 Project Structure

```
my-cv-gen/
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── (auth)/            # Login/Register pages
│   │   ├── (dashboard)/       # Authenticated pages
│   │   ├── api/               # API route handlers
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Landing page
│   ├── components/            # React components
│   │   ├── ui/                # Reusable UI components
│   │   ├── cv-editor/         # CV editing components
│   │   ├── cv-templates/      # Template renderers
│   │   └── dashboard/         # Dashboard components
│   ├── lib/                   # Library code
│   │   ├── ai/                # AI integrations & prompts
│   │   ├── db/                # Database utilities
│   │   ├── utils/             # Auth, validation, export utilities
│   │   └── constants/         # Template definitions, color palettes
│   ├── types/                 # TypeScript type definitions
│   └── middleware.ts          # Route protection
└── tests/
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL (or Neon/PlanetScale cloud)
- OpenAI API key
- Anthropic API key (optional)

### Installation

```bash
# 1. Clone & install
git clone https://github.com/your-org/my-cv-gen.git
cd my-cv-gen
npm install

# 2. Set up environment
cp .env.example .env
# Fill in your API keys and database URL

# 3. Initialize database
npx prisma migrate dev --name init
npx prisma generate

# 4. Run development server
npm run dev
```

Visit `http://localhost:3000` to see the application.

### Production Build
```bash
npm run build
npm start
```

## 🔧 Environment Variables

See `.env.example` for the full list. Key variables:

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXTAUTH_SECRET` | Secret for JWT sessions |
| `OPENAI_API_KEY` | OpenAI API key |
| `ANTHROPIC_API_KEY` | Anthropic API key |
| `GOOGLE_CLIENT_ID/SECRET` | Google OAuth credentials |
| `GITHUB_CLIENT_ID/SECRET` | GitHub OAuth credentials |
| `RATE_LIMIT_MAX_CALLS` | Max AI calls per user per window |

## 🔍 Key Features

### AI Content Generation
- Full CV generation from basic user input
- Targeted optimization via job description
- Section-by-section regeneration
- ATS keyword matching and scoring
- Provider switching (GPT-4 / Claude)

### Customization
- 4+ design templates (Modern, Classic, Minimal, Creative)
- 8+ color palettes + custom color picker
- 12+ font options
- Single/two-column layouts
- 14 section types, all reorderable/toggleable

### Export & Management
- Print-quality PDF export
- A4 & US Letter support
- Version history and auto-save
- CV duplication and archiving

## 📊 Database Models

- **users** - User accounts and authentication
- **cv_documents** - CV content and design configuration
- **cv_versions** - Snapshot history
- **ai_generation_logs** - AI usage tracking
- **rate_limits** - Feature usage limits
- **subscriptions** - Plan management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.
