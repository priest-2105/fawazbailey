# fawazbailey.com

Personal portfolio site for Fawaz Bailey.

## What it is

A portfolio site built to show my work, experience, and background. It includes a project archive, work history, skills overview, and a contact form.
## Tech

- Next.js 16 with the App Router
- TypeScript
- Tailwind CSS v4
- Nodemailer for the contact form

## Running it locally

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Environment variables

The contact form requires a mail configuration. Create a `.env.local` file in the root with your SMTP credentials. See `.env.local` for the expected variable names (it is gitignored and not committed).

## Structure

- `app/` — pages and API routes
- `components/` — UI components
- `lib/projects.ts` — project data

## Live

[fawazbailey.dev](https://fawazbailey.dev)
