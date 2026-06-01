# SnippetNest — Code Sharing & Competitive Programming Platform
A full-stack modern web application for developers to share code snippets, solve competitive programming challenges, and track their technical growth.

## Table of Contents
- [Overview](#overview)
- [Architecture](#architecture)
- [Core Modules](#core-modules)
  - [Snippet Management](#1-snippet-management)
  - [Coding Problems](#2-coding-problems)
  - [Gamification System](#3-gamification-system)
  - [Submission Engine](#4-submission-engine)
  - [User Identity](#5-user-identity)
  - [Admin Dashboard](#6-admin-dashboard)
- [Tech Stack](#tech-stack)
- [Infrastructure](#infrastructure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Communication Flow](#communication-flow)

## Overview
SnippetNest is a comprehensive developer platform that enables:
- **Code Snippet Sharing**: Create, store, and discover reusable code fragments across any language.
- **Problem Solving**: Solve coding challenges through an integrated online judge system.
- **Gamification**: Earn points, track ranks, and collect achievements based on contributions and problem-solving.
- **Real-time Analytics**: Interactive charts for tracking user performance and problem-solving stats.
- **AI Integration**: (Optional/Planned) Snippet generation and problem assistance.
- **Integrated Editor**: Full-featured code editing experience using Monaco Editor.

## Architecture
```text
┌─────────────────────────────────────────────────────────────────┐
│                        Client (Browser)                          │
│               Next.js 15 (App Router) · Tailwind CSS             │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Next.js API & GraphQL Layer                   │
│           JWT Auth · Prisma ORM · Apollo Server · Controllers    │
└─────────┬─────────────────────────────┬────────────────────────┘
          │                             │
          ▼                             ▼
┌──────────────────┐         ┌──────────────────────┐
│  Business Logic  │         │   External Services  │
│   (Controllers)  │         │                      │
│                  │         │                      │
│ Snippets · Users │         │ Cloudinary · APIs    │
│ Problems · Stats │         │ UploadThing          │
└────────┬─────────┘         └──────────┬───────────┘
         │                              │
         │       Data Persistence       │
         └──────────────┬───────────────┘
                        │
                        ▼
             ┌──────────────────┐
             │    PostgreSQL    │
             │ (Powered by Neon)│
             │                  │
             │  Prisma Models   │
             └──────────────────┘

┌──────────────────────────────────────────────────────┐
│            Development Environment (Docker)          │
│        Containerized Database and Node Services      │
└──────────────────────────────────────────────────────┘
```

**Key patterns:**
- **Hybrid API Strategy**: RESTful controllers for standard CRUD and GraphQL for complex data queries.
- **Centralized Auth**: JWT-based authentication with secure cookie handling.
- **Dynamic State**: Redux Toolkit for global UI state and Apollo Cache for GraphQL data.
- **Responsive Design**: Mobile-first approach with Radix UI and Framer Motion.
- **Type-Safe Persistence**: Prisma ORM for seamless PostgreSQL interactions.

## Core Modules

### 1. Snippet Management
| Category | Details |
| :--- | :--- |
| **Logic** | `SnippetController` · GraphQL Resolvers |
| **Storage** | PostgreSQL (Metadata) · User Contributions |

A robust system for developers to share knowledge. Supports multi-language syntax highlighting, tagging, and advanced search functionality.

### 2. Coding Problems
| Category | Details |
| :--- | :--- |
| **Logic** | `ProblemController` · `testCase` Models |
| **Stack** | Next.js API · Monaco Editor |

Interactive online judge component. Features categorized problems (Easy, Medium, Hard), example inputs/outputs, and comprehensive constraints documentation.

### 3. Gamification System
| Category | Details |
| :--- | :--- |
| **Logic** | `Stats` & `Achievement` Service |
| **Metrics** | Contributions · Rank · Points · Problems Solved |

Drives user engagement through a point-based system. Ranks are dynamically updated based on user activity and problem-solving success.

### 4. Submission Engine
| Category | Details |
| :--- | :--- |
| **Logic** | `Submission` Model · Code Execution Logic |
| **Status** | Pass/Fail · Language Tracking |

Handles user code submissions, validates against hidden test cases, and updates user stats upon completion.

### 5. User Identity
| Category | Details |
| :--- | :--- |
| **Stack** | JWT (jsonwebtoken) · Bcrypt.js · Cookies |

Comprehensive user profiles featuring avatars (via Cloudinary), technical bios, social integrations (GitHub/Twitter), and contribution heatmaps.

### 6. Admin Dashboard
| Category | Details |
| :--- | :--- |
| **Access** | Role-based (ADMIN) |
| **Stack** | Custom Tabbed UI · Prisma Studio |

Secure portal for managing coding problems, overseeing platform metrics, and managing user content.

## Tech Stack
| Layer | Technology |
| :--- | :--- |
| **Frontend Framework** | Next.js 15 (Turbopack) + React 19 |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS + Shadcn UI |
| **Animations** | Framer Motion + GSAP |
| **State Management** | Redux Toolkit |
| **Query Language** | GraphQL (Apollo Client/Server) |
| **Database** | PostgreSQL |
| **ORM** | Prisma |
| **Code Editor** | Monaco Editor |
| **Authentication** | JWT + Cookie Auth |
| **File Storage** | Cloudinary + UploadThing |
| **Validation** | Zod + React Hook Form |
| **Charts** | Recharts |
| **Deployment** | Vercel (Frontend) · Neon (Database) |

## Infrastructure
The project is built to be cloud-native and highly scalable:
- **CI/CD**: Automatic deployments via Vercel GitHub integration.
- **Database**: Serverless PostgreSQL via Neon for instant scaling.
- **Media**: Optimized image delivery through Cloudinary CDN.
- **Security**: Environment variable protection and secure cookie policies.

**External dependencies required:**
- PostgreSQL (Neon / Local)
- Cloudinary Account (for avatars/snippets)
- UploadThing (for file handling)
- SMTP Provider (for email notifications)

## Getting Started

### Prerequisites
- Node.js 20+
- PostgreSQL Instance
- Cloudinary API Keys

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Generate Prisma client:
   ```bash
   npx prisma generate
   ```

### Run the application
```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

## Environment Variables

### Core Configuration
| Variable | Description | Default |
| :--- | :--- | :--- |
| `DATABASE_URL` | PostgreSQL Connection URI | — |
| `JWT_SECRET` | Secret key for token signing | — |
| `NEXT_PUBLIC_API_URL` | Base API Endpoint | http://localhost:3000 |

### Cloud Services
| Variable | Description |
| :--- | :--- |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary name |
| `CLOUDINARY_API_KEY` | Cloudinary key |
| `CLOUDINARY_API_SECRET` | Cloudinary secret |
| `UPLOADTHING_SECRET` | UploadThing secret |
| `UPLOADTHING_APP_ID` | UploadThing App ID |

## Communication Flow
```text
User Action (UI Interaction)
  │
  ▼
Next.js Frontend (React/Redux)
  │  GraphQL Query / REST API Call
  ▼
Next.js API Routes (Middleware/Auth)
  │  JWT Validation & Content Formatting
  ├──► GraphQL Resolvers
  │       │
  │       ├─ Prisma Client (ORM Query)
  │       │     └─ PostgreSQL (Persistent Data)
  │       │
  │       ├─ Business Logic Controllers
  │       │     ├─ Problem Validation
  │       │     └─ Stats Calculation
  │       │
  │       └─ Cloudinary SDK (Image Upload/Fetch)
  │
  └──► Dashboard Analytics
           │
           └─ Recharts (Visual Data Rendering)
```

## Project Structure
```text
SnippetNest/
├── prisma/             # Schema & Migrations
├── public/             # Static Assets
├── src/
│   ├── app/            # Routes & Layouts (App Router)
│   ├── components/     # UI & Feature Components
│   ├── redux/          # State Management
│   ├── server/         # Controllers, GraphQL & Scrapers
│   ├── lib/            # Shared Utilities
│   └── hooks/          # Custom User Hooks
└── README.md
```

## License
MIT License — Copyright (c) 2026.
