# Overview

- Followed [this basic pnpm/turborepo setup](https://dev.to/emmanuelisenah/setting-up-a-monorepo-using-pnpm-workspaces-with-typescript-and-tailwind-5611) with the exception of using commonJS modules as shown in [this tutorial](https://mrizkiaiman.medium.com/setup-a-monorepo-with-turborepo-next-js-and-tailwind-css-5cd751d34bc9). For some reason ES Modules wouldn't work.

## Install location

- The `packages/config-tailwind` defines the package name `@monorepo/config-tailwind` and all the tailwind dependencies. These files are then extended in the individual app `postcss.config.js` and `tailwind.config.js` files. The app specific `package.json` installs the turborepo shared package as a dev dependencies (e.g. `@monorepo/config-tailwind`).

## Styles

- `globals.css` could be moved to central tailwind config directory but have kept it in each app since it's often used for project-specific one-off overrides and css.
