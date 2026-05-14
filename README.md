# Jobtracker

A modern job tracking application built with Next.js, designed to help users manage their job applications, track application status, and organize job search activities.

## Tech Stack

- **Framework**: Next.js 16.2.4 with App Router
- **Frontend**: React 19 with TypeScript
- **Styling**: Tailwind CSS 4
- **Authentication**: Clerk
- **Database**: MongoDB with Mongoose ODM
- **Tooling**: ESLint, PostCSS

## Features

- **Authentication**: Clerk-based sign-in and sign-up pages with secure route protection
- **Dashboard**: Central hub for tracking job applications
- **Job Management**: Create, view, update, and delete job applications
- **Status Tracking**: Track application status with visual badges
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS
- **Type Safety**: Full TypeScript support throughout the application

## Project Structure

```
jobtracker/
├── app/
│   ├── (dashboard)/          # Dashboard route group with protected pages
│   │   ├── layout.tsx        # Dashboard layout wrapper
│   │   ├── dashboard/        # Main dashboard page
│   │   ├── jobs/             # Jobs list page
│   │   ├── add-job/          # Add new job page
│   │   └── job/[id]/         # Individual job detail page
│   ├── api/
│   │   └── jobs/             # API routes for job operations
│   │       ├── route.ts      # GET/POST /api/jobs
│   │       └── [id]/route.ts # GET/PUT/DELETE /api/jobs/[id]
│   ├── sign-in/              # Clerk sign-in page
│   ├── sign-up/              # Clerk sign-up page
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Home page
│   └── globals.css           # Global styles
├── components/
│   ├── layout/               # Layout components
│   │   ├── Sidebar.tsx       # Navigation sidebar
│   │   └── Topbar.tsx        # Top navigation bar
│   ├── ui/                   # Reusable UI components
│   │   └── StatusBadge.tsx   # Job status badge component
│   └── ThemeProvider.tsx     # Theme configuration provider
├── lib/
│   └── mongodb.ts            # MongoDB connection utility
├── models/
│   └── Job.ts                # MongoDB Job model
├── middleware.ts             # Next.js middleware for route protection
├── next.config.ts            # Next.js configuration
├── tsconfig.json             # TypeScript configuration
├── tailwind.config.js        # Tailwind CSS configuration
└── eslint.config.mjs         # ESLint configuration
```

## Prerequisites

- Node.js 18+ and npm/yarn
- MongoDB instance (local or cloud)
- Clerk account for authentication

## Getting Started

### Installation

```bash
# Install dependencies
npm install
```

### Environment Setup

Create a `.env.local` file in the root directory:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# MongoDB
MONGODB_URI=your_mongodb_connection_string
```

### Development

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
npm start
```

## API Endpoints

- `GET /api/jobs` - Retrieve all jobs
- `POST /api/jobs` - Create a new job
- `GET /api/jobs/[id]` - Retrieve a specific job
- `PUT /api/jobs/[id]` - Update a job
- `DELETE /api/jobs/[id]` - Delete a job

## Project Status

This is a work-in-progress project with the following areas in development:

- Dashboard implementation with job list and filtering
- Job detail pages and editing functionality
- API route handlers for database operations
- UI components and styling
- Authentication flow integration
- MongoDB model and validation

## Development Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

This is an active development project. Feel free to make improvements and submit changes.

## License

MIT
