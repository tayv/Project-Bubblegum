import { useWatch } from "react-hook-form"

export type MatchRegExProps = {
  name: string | number
  checkFor: string | number
}

// HELPER FUNCTIONS
const setRegEx = (formulaShortCode) => {
  switch (formulaShortCode) {
    case "1a":
      return /(a)/g

    case "1b":
      return /(b)/g

    case "2a":
      return /(c)/g

    default:
      return null
  }
}

const checkForMatch = (watchInput, regexFormula) => {
  console.log(regexFormula)
  return watchInput.match(regexFormula) !== null
}

// MAIN HOOK
const useMatchRegex = (name, control, defaultValue, formulaShortCode) => {

  let watchInput = useWatch({ control, name: name, defaultValue: defaultValue })
  let regexFormula = setRegEx(formulaShortCode)

  return checkForMatch(watchInput, regexFormula)
}

export default useMatchRegex
