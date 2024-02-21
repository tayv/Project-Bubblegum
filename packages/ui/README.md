## Overview

The shared UI package holds react components that can be used across projects.

## tsconfig notes

For relative path aliases that can be used in monorepo apps that consume the library you need to update the `tsconfig.json` files so next.js can pick them up automatically. [More info here](https://github.com/vercel/turbo/discussions/620):

1. Add the desired alias to the `tsconfig.json` in the UI package. For example:
   `"paths": { "@monorepo*": ["./*"] }`

2. Add the same same alias to the consuming app's `tsconfig.json` files except with the full path. For example: `"paths": {"@monorepo*": ["../../packages/ui/src/*"]}`

3. Restart the dev server to confirm imports worked.

4. The build step is now skipped at you should be able to import like this `import {Accordion} from "@monorepo/Accordion"`

## `index.tsx` notes

The root `src` directory and any nested directories like `components` need an `index.tsx` file to export the types. For example: `export * from "./Accordion"` and `export * from "./components"`

## `package.json` notes

Need to set the `main` and `types` properties in the shared ui `package.json` to point to the `index.tsx` file in `src` since you no longer have the build step to create the `index.js` in the dist folder.
