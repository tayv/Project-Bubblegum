# Overview

- The `package.json` in the `config-eslint` directory lists out the linting dependencies to use in the projects so they don't have to be put in the individual apps `package.json`
- Using the recommended next.js eslint packages

## Files

### `eslintrc.js`

- Each app gets its own `estlinrc.js` file that extends the `estlint-next.js`
- The monorepo root also gets one that extends needed packages.

### `package.json`

- The `config-eslint` directory has its own package.json that has the desired eslint packages as dependencies. This keeps them in a central place so you don't have to use different ones across workspaces.
- If you add more config files for different workspace types (e.g. `eslint.next.js`) then need to add it to the `files` array in the central packages config `package.json`.

## Prettier

- Root gets a `prettierrc.json` file for custom override settings
