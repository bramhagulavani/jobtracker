# Jobtracker

This repository is set up as an empty Next.js app scaffold for a job tracking product. The current state only includes the folder structure and empty placeholder files needed for the planned implementation.

## Current Structure

The project now contains these main areas:

- `app/(dashboard)/` for the dashboard layout and pages
- `app/api/jobs/` for jobs API routes
- `app/sign-in/` and `app/sign-up/` for Clerk auth pages
- `components/layout/` for sidebar and topbar components
- `components/ui/` for shared UI pieces such as `StatusBadge`
- `lib/` for shared utilities like the MongoDB connection helper
- `models/` for database models such as `Job`
- `middleware.ts` for route middleware

## Included Empty Files

The following files are present as placeholders and are currently empty:

- `app/layout.tsx`
- `app/page.tsx`
- `app/globals.css`
- `app/(dashboard)/layout.tsx`
- `app/(dashboard)/dashboard/page.tsx`
- `app/(dashboard)/jobs/page.tsx`
- `app/(dashboard)/add-job/page.tsx`
- `app/(dashboard)/job/[id]/page.tsx`
- `app/api/jobs/route.ts`
- `app/api/jobs/[id]/route.ts`
- `app/sign-in/[[...sign-in]]/page.tsx`
- `app/sign-up/[[...sign-up]]/page.tsx`
- `components/layout/Sidebar.tsx`
- `components/layout/Topbar.tsx`
- `components/ui/StatusBadge.tsx`
- `components/ThemeProvider.tsx`
- `lib/mongodb.ts`
- `models/Job.ts`
- `middleware.ts`
- `.env.local`

## Development

To start the app locally:

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Next Step

The next step is to begin filling these placeholder files with the dashboard, authentication, API, and database logic.
