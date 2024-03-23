console.log("Resolved path:", require.resolve("config-tests/jest-next"))
const base = require("config-tests/jest-next")

module.exports = {
  ...base,
  displayName: "Shared UI Tests",
  moduleNameMapper: {
    "^config-tests/(.*)$": "<rootDir>/packages/config-tests/$1",
  },
}
