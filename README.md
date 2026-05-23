# ForgeFlow BDA CRM

ForgeFlow is a MERN-style Business Development Associate module for a manufacturing company. It helps BDA teams manage industrial lead pipelines, quotation follow-ups, client communication, owner accountability, and team performance from one dashboard.

## About This Project

ForgeFlow BDA CRM is a business development workflow system tailored for manufacturing companies. The project is designed around how BDA and sales teams handle industrial enquiries: capturing leads, qualifying requirements, tracking quotation stages, planning follow-ups, monitoring team targets, and preparing won deals for production handoff.

The dashboard combines a Kanban-style sales pipeline, financial forecast metrics, lead detail panels, priority tracking, communication history, and team performance indicators. It is built as a MERN-style full-stack assessment project with a React/Next.js frontend, Express backend, MongoDB data models, validation, seed data, and deployment-ready documentation.

## Selected Assessment Module

**Business Development Associate Team Module for a Manufacturing Company**

I selected this module because it demonstrates the strongest full-stack scope for an internship assessment: CRM data modeling, lead CRUD APIs, dashboard metrics, sales workflow stages, follow-up operations, and a polished React interface inspired by Jira-style workflow boards and modern CRM dashboards.

## Features

- Manufacturing-focused lead pipeline with stages: New, Qualified, Proposal, Negotiation, Won.
- Search and stage filters for quick BDA workflow triage.
- Deal value, weighted forecast, due follow-up, and win-rate dashboard metrics.
- Lead detail panel with next action, priority, owner, source, and communication actions.
- Team performance cards with target progress, active leads, and conversion metrics.
- Express API with MongoDB/Mongoose models for leads and activities.
- Seed script for realistic manufacturing sales data.

## Tech Stack

- **Frontend:** React, Next.js App Router, TypeScript, Tailwind CSS, lucide-react
- **Backend:** Node.js, Express.js, TypeScript
- **Database:** MongoDB with Mongoose
- **Validation:** Zod
- **Deployment:** GitHub and Vercel

## Technologies Used In Detail

- **React:** Used to build interactive dashboard components, pipeline cards, filters, lead detail panels, metric widgets, and team performance sections.
- **Next.js App Router:** Provides the application structure, page routing, layout system, metadata, optimized production build, and Vercel-friendly deployment.
- **TypeScript:** Adds type safety for lead stages, CRM data, React component props, Express routes, and shared utility functions.
- **Tailwind CSS:** Handles responsive UI styling, dashboard grids, cards, buttons, filters, spacing, and manufacturing-focused color styling.
- **lucide-react:** Provides clean icons for dashboard metrics, actions, navigation, filters, calls, emails, visits, and team indicators.
- **Node.js:** Runs the backend API layer and local development tooling.
- **Express.js:** Provides REST API endpoints for leads, dashboard summaries, activities, and health checks.
- **MongoDB:** Stores CRM data such as leads, deal values, owners, stages, priorities, due dates, and activity records.
- **Mongoose:** Defines MongoDB schemas for leads and communication activities, including validation rules and timestamps.
- **Zod:** Validates incoming request payloads before creating or updating lead records.
- **dotenv:** Loads environment variables such as `MONGODB_URI`, `PORT`, and frontend API URLs.
- **CORS:** Allows the frontend and backend to communicate safely during local development and deployment.
- **Docker Compose:** Provides an optional local MongoDB service for development.
- **Vercel:** Hosts the deployed frontend experience.
- **GitHub:** Hosts the project repository and source code for assessment submission.

## Folder Structure

```text
app/                 Next.js pages and layout
components/          Reusable React UI modules
lib/                 Shared sample data and formatting helpers
server/              Express API, MongoDB models, routes, seed script
```

## Environment Variables

Create `.env` from `.env.example`:

```bash
MONGODB_URI="mongodb://127.0.0.1:27017/forgeflow_bda"
PORT=5000
CLIENT_ORIGIN="http://localhost:3000"
NEXT_PUBLIC_API_URL="http://localhost:5000/api"
```

## Local Run

Install dependencies:

```bash
npm install
```

Start MongoDB locally or use MongoDB Atlas. A local Docker option is included:

```bash
docker compose up -d
```

Seed sample data:

```bash
npm run seed
```

Start the Express API:

```bash
npm run server
```

In another terminal, start the frontend:

```bash
npm run dev
```

Open `http://localhost:3000`.

To run frontend and backend together:

```bash
npm run dev:full
```

## API Endpoints

- `GET /api/health` - API health check
- `GET /api/leads` - list leads with optional `stage`, `owner`, and `q` filters
- `POST /api/leads` - create a lead
- `PATCH /api/leads/:id` - update a lead
- `POST /api/leads/:id/activities` - add a communication activity
- `GET /api/dashboard/summary` - aggregate CRM dashboard metrics

## Deployment Notes

- Frontend can be deployed on Vercel.
- Backend can be deployed on Render, Railway, or Fly.io.
- Database can use MongoDB Atlas.
- Add deployed API URL to `NEXT_PUBLIC_API_URL` and deployed frontend URL to `CLIENT_ORIGIN`.

## Submission Checklist

- Push this project to GitHub with meaningful commits.
- Add the GitHub repository link to the submission form.
- Include deployed frontend and backend URLs if available.
- Demo flow: show dashboard metrics, filter by stage, open a lead, explain next-action tracking, then show backend lead APIs.
