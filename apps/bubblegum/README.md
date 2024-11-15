## Tech Stack

- Tailwind, Radix Primitives, Nextjs, react-pdf, react-print, supabase

## How to use

1. Install dependencies `pnpm install`

2. Run the development server `turbo dev`

3. Open [http://localhost:3000](http://localhost:3000) in the browser

4. Use `turbo build` to check for build errors before deploying

5. Setup Supabase DB connection

## Updating database

- Migrate Prisma schema

## Bugs

1. react-pdf renderer library
   - // @ts-ignore temporary type error fix for https://github.com/diegomura/react-pdf/issues/2886

## Notes

- Use caution when upgrading react-pdf/renderer. Often has breaking changes.
