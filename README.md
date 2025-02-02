![screencapture-mailing-scheduler-netlify-app-mailings-2025-02-02-18_05_17](https://github.com/user-attachments/assets/b16ec661-2e7e-4fb4-adde-ea80b0de8295)

# Email Campaign Scheduler

A Next.js application for scheduling and managing email campaigns.

## Features

- Create and schedule email campaigns
- Select from existing email templates
- Choose target mailing lists
- Schedule campaigns for future dates
- View and manage scheduled campaigns
- Delete scheduled campaigns

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000/mailings](http://localhost:3000/mailings) in your browser

## Technology Stack

- Next.js 13+ with App Router
- React Hook Form for form handling
- Zod for form validation
- Tailwind CSS for styling
- shadcn/ui for UI components
- date-fns for date formatting
- TypeScript for type safety

## Project Structure

- `/app/mailings` - Main mailing feature pages and components
- `/types` - TypeScript interfaces
- `/lib` - Utility functions and API mocks
- `/components/ui` - Reusable UI components

## API Integration

The project includes mock API functions in `lib/api-mock.ts`. To integrate with a real backend:

1. Replace the mock API functions with real API calls
2. Update the types in `types/index.ts` if needed
3. Update error handling as needed
