import { useWatch } from "react-hook-form"
import { Control } from "react-hook-form"

export type MatchRegExProps = {
  name: string
  control: Control
  defaultValue: string
  formulaShortCode: string
}

type MatchReturnType = string | null

type WarnDictionaryType = {
  [key: string]: {
    formula: RegExp
    message: string
  }
}

// As this grows, consider moving to a separate file
const warnDictionary: WarnDictionaryType = {
  "1a": { formula: /(a)/g, message: "This is a warning message for 1a" },
  "1b": { formula: /(b)/g, message: "This is a warning message for 1b" },
  "2a": { formula: /(c)/g, message: "This is a warning message for 2a" },
}

// HELPER FUNCTIONS
const checkForMatch = (
  watchInput: string,
  regexFormula: RegExp,
  message: string
): MatchReturnType => {
  // This is used to return the warning message to Field.Message only if the regex matches
  return watchInput.match(regexFormula) !== null ? message : null
}

// MAIN HOOK
const useMatchRegex = ({
  name,
  control,
  defaultValue,
  formulaShortCode,
}: MatchRegExProps): MatchReturnType => {
  let watchInput = useWatch({ control, name: name, defaultValue: defaultValue })
  let regexFormula = warnDictionary[formulaShortCode].formula
  let message = warnDictionary[formulaShortCode].message

  return checkForMatch(watchInput, regexFormula, message)
}

export default useMatchRegex
