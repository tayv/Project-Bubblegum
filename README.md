🚧 WORK IN PROGRESS 🚧

# Preview Deployment

View the main branch at: https://bubblegum-template.vercel.app/

- Keep in mind the project is still very rough, especially the design. Focusing on functionality and code quality first.

# Documentation

Bubblegum UI docs 🚧: https://bubblegumui.vercel.app/

# About

Building a design library of reusable, flexible, and accessible React form and UI components. The form components will be largely unstyled out of the box and intended to be easily adapted on the fly using customizable variations.

https://github.com/tayv/Project-Bubblegum/assets/48400779/e7e3c04b-2217-4a6d-bce1-193d347c36c6

## Useful Links:

- [Tailwind Documentation](https://tailwindcss.com/docs/) (CSS styling)
- [Radix UI Primitives](https://www.radix-ui.com/docs/primitives/) (For accessibility across devices)
- [Lucide Icons](https://lucide.dev/)
- [React Hook Form](https://react-hook-form.com/) (Form handling)
- [Prisma](https://www.prisma.io/docs) (Database ORM)
- [Clerk Auth](https://clerk.com/docs/nextjs/overview)

# Setup

This project uses the [Tailwind CSS](https://tailwindcss.com/) [(v3.0)](https://tailwindcss.com/blog/tailwindcss-v3) with NextJs configuration. It follows the steps outlined in the official [Tailwind docs](https://tailwindcss.com/docs/guides/nextjs).

## How to use

1. [Clone the repo](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)

2. Install dependencies `npm install`

3. Run the development server `npm run dev`

4. Open [http://localhost:3000](http://localhost:3000) in the browser

## Turbo structure

Using turbo to manage the monorepo. Basic structure:

- `apps` holds projects
- `packages` holds anything reusable across `apps` such as `ui` for components as well as extendable configurations for `estlint` and `tsconfig`.

### Turbo configuration

- In the monorepo root: `turbo.json` handles `pipelin` scripts for the whole repo such as build or linting scripts. `dependsOn` can be used to only run these pipeline scripts after project specific scripts have run.
- `config-eslint` and `config-typescript` in `packages` are used to have a consistent base for the whole monorepo. These can be extended or overridden in the individual `apps` via their own `eslintrc.json` and `tsconfig.json`.
- Each project as well as the root gets their own `package.json`. Root handles monorepo-wide dependencies like prettier. Each workspace needs to have a unique title in `package.json`.
- `pnpm-workspaces.yaml` defines the monorepo's workspaces like `packages` and `apps`.

### Bug fixes

- Add `{
  "eslint.workingDirectories": [
    { "pattern": "apps/*/" },
    { "pattern": "packages/*/" }
  ]
}` to VS Code `settings.json` to fix error finding `next/babel`. Appears to be a [known turborepo issue](https://stackoverflow.com/questions/71662525/failed-to-load-config-next-babel-to-extend-from-eslintrc-json).
