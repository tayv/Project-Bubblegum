import { useEffect, useState } from "react"
import { useWatch } from "react-hook-form"

export type MatchRegExProps = {
  name: string | number
  checkFor: string | number
}

const checkForMatch = (watchInput, regexFormula) => {
  console.log(watchInput, watchInput.match(regexFormula) !== null)
  return watchInput.match(regexFormula) !== null
}

const useMatchRegex = (name, control, defaultValue) => {
  const [result, setResult] = useState<string | null>(null)

  let watchInput = useWatch({ control, name: name, defaultValue: defaultValue })
  let regexFormula = /(a)/g

  // useEffect(() => {
  //   const inputValue = getValues(name)
  //   console.log("heres's the input value: ", inputValue)
  //   switch (checkFor) {
  //     case "a":
  //       setResult(
  //         inputValue.toString().match(/(a)/g) ? "it matches A" : null
  //       );
  //       break;

  //     case "b":
  //       setResult("message");
  //       break;

  //     default:
  //       setResult(null);
  //       break;
  //   }
  // }, [checkFor, name, getValues]);

  // return result;

  return checkForMatch(watchInput, regexFormula)
}

export default useMatchRegex
