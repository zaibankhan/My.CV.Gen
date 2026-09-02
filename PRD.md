# Product Requirements Document (PRD)

## AI CV Generator (My.CV.Gen)

**Version:** 1.0  
**Date:** September 3, 2026  
**Status:** Draft  
**Author:** Product Team

---

## 1. Executive Summary

My.CV.Gen is a web-based platform that enables users to automatically generate professional, customizable CVs powered by AI. Users input their professional information once, and the system uses advanced AI (OpenAI GPT-4 and Claude/Anthropic) to generate compelling, ATS-friendly CV content. Users have full control over design, layout, sections, content, and style—creating a genuinely personalized CV.

---

## 2. Product Overview

### 2.1 Product Vision
To become the go-to platform where anyone can create a professional, AI-optimized CV in under 5 minutes, tailored to their exact preferences and industry standards.

### 2.2 Target Audience
| Segment | Description | Key Needs |
|---------|-------------|-----------|
| Job Seekers (Entry) | Fresh graduates, career changers | Guidance, templates, professional language |
| Job Seekers (Experienced) | Mid-to-senior professionals | Sophisticated layouts, ATS optimization |
| Freelancers | Contract workers and consultants | Multiple CV versions for different niches |
| Students | College/university students | Internship and university application CVs |

### 2.3 Problem Statement
- **Generic CVs:** Traditional CVs are time-consuming and often look unprofessional.
- **Writing Difficulty:** Many users struggle to articulate achievements and skills effectively.
- **Design Complexity:** Professional CV design requires expensive software or design skills.
- **ATS Rejection:** Poorly formatted CVs fail automated screening systems.
- **Time Cost:** Users spend 10-20 hours crafting a single CV.

---

## 3. Key Features & Requirements

### 3.1 Core Features

#### F1: AI-Powered Content Generation
| Requirement ID | Description | Priority |
|----------------|-------------|----------|
| F1.1 | User inputs basic info (name, title, experience summary, skills) | P0 |
| F1.2 | AI generates professional summaries, bullet points, and achievement descriptions | P0 |
| F1.3 | Multi-provider support (OpenAI GPT-4 & Claude/Anthropic) with provider switching | P0 |
| F1.4 | AI rewrites/responsiveness based on job description input | P0 |
| F1.5 | AI suggests skills relevant to target job role | P1 |
| F1.6 | AI optimizes content for ATS keyword matching | P1 |

#### F2: CV Customization
| Requirement ID | Description | Priority |
|----------------|-------------|----------|
| F2.1 | Multiple design templates (Modern, Classic, Creative, Minimal) | P0 |
| F2.2 | Color scheme customization (preset palettes + custom picker) | P0 |
| F2.3 | Font selection (serif, sans-serif, display fonts) | P0 |
| F2.4 | Layout customization (single/two-column, margin control) | P0 |
| F2.5 | Section management (add, remove, reorder sections) | P0 |
| F2.6 | Content editing (inline editing of any AI-generated text) | P0 |
| F2.7 | Section visibility toggles | P1 |
| F2.8 | Custom spacing and padding controls | P1 |
| F2.9 | Template-specific design options | P1 |

#### F3: Real-Time Preview
| Requirement ID | Description | Priority |
|----------------|-------------|----------|
| F3.1 | Live preview of CV as user edits | P0 |
| F3.2 | Page-by-page navigation in preview | P1 |
| F3.3 | ATS readability checker | P1 |
| F3.4 | Mobile preview mode | P2 |

#### F4: Export & Download
| Requirement ID | Description | Priority |
|----------------|-------------|----------|
| F4.1 | PDF export (print-ready, high quality) | P0 |
| F4.2 | Multiple paper sizes (A4, US Letter) | P1 |
| F4.3 | Version history and export tracking | P2 |

#### F5: User Management
| Requirement ID | Description | Priority |
|----------------|-------------|----------|
| F5.1 | User registration and login (email/password + OAuth) | P0 |
| F5.2 | Multiple CV storage per user | P0 |
| F5.3 | CV version history & auto-save | P1 |
| F5.4 | Duplicate/clone existing CV | P1 |
| F5.5 | Delete CV confirmation | P1 |

#### F6: Account Management
| Requirement ID | Description | Priority |
|----------------|-------------|----------|
| F6.1 | Password reset via email | P1 |
| F6.2 | Profile photo upload | P2 |
| F6.3 | Account deletion request | P1 |

#### F7: Dashboard
| Requirement ID | Description | Priority |
|----------------|-------------|----------|
| F7.1 | Overview of all user CVs with preview thumbnails | P0 |
| F7.2 | CV status indicators (draft, in-progress, completed) | P1 |
| F7.3 | Quick actions (create, edit, duplicate, export) | P0 |
| F7.4 | Search and filter options | P2 |

---

## 4. Functional Specifications

### 4.1 AI Generation Flow
1. User selects **Create New CV**
2. User chooses a **template** from the gallery
3. User enters basic information (Name, Title, Contact, Summary, Experience, Education, Skills)
4. Optional: User pastes a **job description** for targeted optimization
5. System calls AI provider with structured prompt
6. AI generates professional, achievement-oriented content
7. Content populates into template with real-time preview
8. User can edit, regenerate specific sections, or adjust design

### 4.2 AI Prompt Structure
```
Template:
You are a professional resume writer. Use the provided information to create 
a compelling CV. Return structured JSON with the following fields:
- summary: powerful professional summary (3-5 sentences)
- experiences: [{title, company, dates, bullets[achievement-focused]}]
- skills: {technical: [], soft: []}
- education: [{degree, institution, dates, description}]

User Input: {structured user data}
Job Description: {optional target job description}
Tone: {professional, energetic, concise, detailed}
```

### 4.3 Export Specification
- **PDF:** Print-optimized with proper fonts embedded
- **ATS:** Export a text-based version with standard formatting
- **Versioning:** Maintain previous exports in user's history

---

## 5. Design Requirements

### 5.1 Template Library (Initial)
| Template | Style | Best For | Layout |
|----------|-------|----------|--------|
| Modern | Clean, contemporary | Tech, startups | Two-column |
| Classic | Traditional, formal | Corporate, law | Single-column |
| Minimal | Clean, spaced | Design, creative | Single-column |
| Creative | Bold, colorful | Marketing, media | Two-column |

### 5.2 Customization Options
- **Colors:** 10+ preset palettes + custom color picker
- **Fonts:** 15+ Google Fonts
- **Layout:** Single/Two-column, spacing, margin controls
- **Sections:** 12+ available sections, reorderable
- **Line spacing:** Tight, normal, relaxed

---

## 6. Technical Requirements

### 6.1 Tech Stack
| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | Next.js 14+ (App Router) | SSR, routing, performance |
| **Language** | TypeScript | Type safety |
| **UI** | Tailwind CSS + shadcn/ui | Styling & components |
| **State** | Zustand / React Query | Client state & server state |
| **Backend** | Next.js API Routes (v14) | Serverless API |
| **Database** | PostgreSQL + Prisma ORM | Persistent storage |
| **Auth** | NextAuth.js (Auth.js) | Authentication |
| **AI** | OpenAI SDK + Anthropic SDK | Content generation |
| **PDF** | React-PDF / Puppeteer | PDF export |
| **Hosting** | Vercel (frontend) + Neon (DB) | Deployment |
| **Object Storage** | Cloudinary / S3 | CV version assets |

### 6.2 Database Schema (PostgreSQL)

```
users
├── id (UUID, PK)
├── email (string, unique)
├── password_hash (string, nullable for OAuth)
├── name (string)
├── avatar_url (string, nullable)
├── provider (enum: 'email', 'google', 'github')
├── created_at (timestamp)
└── updated_at (timestamp)

cv_documents
├── id (UUID, PK)
├── user_id (FK → users.id)
├── title (string)
├── template_id (string)
├── design_config (JSONB)       // colors, fonts, layout settings
├── content (JSONB)             // all CV data
├── ai_provider (enum: 'openai', 'anthropic')
├── status (enum: 'draft', 'in_progress', 'completed')
├── created_at (timestamp)
├── updated_at (timestamp)
└── deleted_at (timestamp, nullable)  // soft delete

cv_versions
├── id (UUID, PK)
├── cv_document_id (FK → cv_documents.id)
├── content_snapshot (JSONB)
├── created_at (timestamp)

ai_generation_logs
├── id (UUID, PK)
├── user_id (FK → users.id)
├── cv_document_id (FK → cv_documents.id, nullable)
├── provider (enum: 'openai', 'anthropic')
├── model (string)
├── prompt_tokens (int)
├── completion_tokens (int)
├── total_tokens (int)
├── response_time_ms (int)
├── created_at (timestamp)

rate_limits
├── id (UUID, PK)
├── user_id (FK → users.id)
├── ai_calls_used (int)
├── ai_calls_limit (int)
├── period_start (timestamp)
└── period_end (timestamp)
```

### 6.3 API Endpoints

#### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | User registration |
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/logout` | User logout |
| GET | `/api/auth/session` | Get current session |
| POST | `/api/auth/reset-password` | Request password reset |

#### CV Documents
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cvs` | List user's CVs |
| POST | `/api/cvs` | Create new CV |
| GET | `/api/cvs/:id` | Get CV by ID |
| PUT | `/api/cvs/:id` | Update CV (content/design) |
| DELETE | `/api/cvs/:id` | Delete CV (soft delete) |
| POST | `/api/cvs/:id/duplicate` | Clone a CV |
| PUT | `/api/cvs/:id/design` | Update design config only |

#### AI Generation
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/ai/generate` | Generate full CV content |
| POST | `/api/ai/regenerate` | Regenerate a specific section |
| POST | `/api/ai/rewrite` | Improve existing text |
| POST | `/api/ai/skills` | Suggest skills |
| POST | `/api/ai/ats-score` | Score ATS compatibility |
| GET | `/api/ai/providers` | Get available AI providers/models |

#### Templates
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/templates` | List all templates |
| GET | `/api/templates/:id` | Get template details |

#### Export
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/cvs/:id/export/pdf` | Generate PDF |
| POST | `/api/cvs/:id/export/ats` | Generate ATS text |
| GET | `/api/cvs/:id/versions` | Get version history |

---

## 7. User Experience Flow

### 7.1 First-Time User Journey
1. **Landing Page** → Value proposition, template gallery preview, pricing
2. **Sign Up/Log In** → Authenticate (email or OAuth)
3. **Onboarding** → Select template, initial preferences
4. **Input Form** → Enter professional details (guided multi-step)
5. **AI Generation** → Review AI-generated content (editable)
6. **Customization** → Adjust design, layout, sections
7. **Preview** → See live PDF preview
8. **Export** → Download PDF / share

### 7.2 Pages
| Page | Route | Description |
|------|-------|-------------|
| Landing | `/` | Hero, features, testimonials, pricing |
| Login | `/login` | User sign-in |
| Sign Up | `/register` | User registration |
| Dashboard | `/dashboard` | CV list management |
| CV Editor | `/cv/:id` | Main editing interface |
| CV Preview | `/cv/:id/preview` | Full-screen preview |
| Template Gallery | `/templates` | Browse templates |
| Settings | `/settings` | Account and preferences |
| Pricing | `/pricing` | Subscription plans |
| Documentation | `/docs` | Help and guide |

---

## 8. Non-Functional Requirements

### 8.1 Performance
- Page load < 3 seconds (LCP)
- AI response time < 15 seconds
- Preview updates in real-time (< 100ms debounce)
- Supports up to 100 concurrent sessions

### 8.2 Security
- HTTPS everywhere
- Passwords hashed with bcrypt
- JWT session management
- Rate limiting on AI endpoints (20 calls/hour/free user)
- Input validation and sanitization
- Prompt injection protection

### 8.3 Reliability
- Auto-save every 5 seconds
- 99.9% uptime target
- Error recovery with graceful degradation

### 8.4 Accessibility
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatibility
- Color contrast compliance

### 8.5 SEO
- Server-side rendering for public pages
- Metadata management
- Open Graph tags

---

## 9. Pricing Model

### Free Tier
- 3 CVs max
- 50 AI calls/month
- 5 templates
- Standard PDF export
- Watermark on exported PDFs (optional)

### Pro ($12/month)
- Unlimited CVs
- Unlimited AI calls
- All templates
- Priority AI (faster models)
- All export formats
- Version history
- No watermark
- ATS scoring

### Enterprise ($29/user/month)
- Everything in Pro
- Team management
- API access
- Custom branding
- Priority support
- SSO

---

## 10. Milestones & Roadmap

### Phase 1: MVP (Weeks 1-6)
- Core authentication flow
- Template gallery (3 templates)
- Basic CV form and editable preview
- AI content generation (OpenAI)
- PDF export
- Deploy to production

### Phase 2: Enhancement (Weeks 7-10)
- Claude/Anthropic support
- Template customization (colors, fonts, layout)
- ATS optimization and scoring
- Version history
- Job description optimization

### Phase 3: Growth (Weeks 11-14)
- Advanced template customization
- Team/collaboration features
- Additional templates
- Analytics dashboard
- Marketing landing page improvements

### Phase 4: Scale (Months 4-6)
- Enterprise features
- API access
- SSO integration
- Mobile app
- AI-powered interview prep add-on

---

## 11. Success Metrics

| Metric | Target (3 months) | Target (12 months) |
|--------|-------------------|---------------------|
| Registered Users | 5,000 | 50,000 |
| Monthly Active Users | 2,500 | 25,000 |
| CVs Created | 15,000 | 200,000 |
| Conversion Rate (Free→Pro) | 3% | 5% |
| User Retention (30-day) | 35% | 45% |
| Avg. Session Duration | 8 min | 10 min |
| AI Call Success Rate | 98% | 99% |
| NPS Score | 40 | 50 |

---

## 12. Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| AI cost overrun | High | Rate limiting, usage caps, caching |
| AI content quality issues | High | Large context, editing tools, feedback loop |
| Prompt injection | High | Input sanitization, output validation |
| Competitor pressure | Medium | Unique customization depth, fast iteration |
| PDF rendering issues | Medium | Multiple rendering strategies, testing |
| Data privacy concerns | Medium | Compliance (GDPR), encryption, transparency |

---

## 13. Appendix

### 13.1 Feature Priority Matrix
```
P0 - Must Have (MVP)
  - AI content generation
  - Template gallery
  - Real-time preview
  - Basic customization
  - PDF export
  - Authentication
  - Dashboard

P1 - Should Have (Phase 2)
  - Advanced customization (colors/fonts/layout)
  - Claude support
  - ATS optimization
  - Version history
  - Job description targeting

P2 - Nice to Have (Phase 3+)
  - Advanced features
  - Collaboration
  - Analytics
  - Mobile app
```
