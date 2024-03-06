const path = require("path")

module.exports = {
  ...require("./jest-common"),
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["@testing-library/jest-dom"],

  collectCoverageFrom: ["**/src/**/*.{js,ts,jsx,tsx}"],
  moduleFileExtensions: ["js", "jsx", "json", "ts", "tsx"],
  transform: {
    "^.+\\.tsx?$": "esbuild-jest",
    "^.+\\.jsx?$": "esbuild-jest",
  },
  coveragePathIgnorePatterns: [],
  coverageThreshold: null,
  moduleNameMapper: {
    "^@uiRepo/(.*)$": "<rootDir>/packages/ui/src/$1",
  },
}

// // jest.config.js
// const nextJest = require("next/jest")

// const createJestConfig = nextJest({
//   // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
//   // These need to match tsconfig.json paths
//   dir: "../../app",
// })

// // Add any custom config to be passed to Jest
// /** @type {import('jest').Config} */
// const customJestConfig = {
//   // Add more setup options before each test is run
//   // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

//   testEnvironment: "jest-environment-jsdom",

//   moduleNameMapper: {
//     "^@designSystem/(.*)$": "<rootDir>/designSystem/$1",
//     "^@atoms/(.*)$": "<rootDir>/designSystem/atoms/$1",
//     "^@molecules/(.*)$": "<rootDir>/designSystem/molecules/$1",
//     "^@organisms/(.*)$": "<rootDir>/designSystem/organisms/$1",
//     "^@forms/(.*)$": "<rootDir>/designSystem/forms/$1",
//     "^@layouts/(.*)$": "<rootDir>/designSystem/layouts/$1",
//     "^@styles/(.*)$": "<rootDir>/styles/$1",
//     "^@helpers/(.*)$": "<rootDir>/designSystem/molecules/$1",
//     "^@templates/(.*)$": "<rootDir>/designSystem/templates/$1",
//     "^@utils/(.*)$": "<rootDir>/utils/$1",
//     "^@docs/(.*)$": "<rootDir>/pages/docs/$1",
//     "^@restricted/(.*)$": "<rootDir>/pages/restricted/$1",
//   },
// }

// // createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
// module.exports = createJestConfig(customJestConfig)
