import {checkFor, customRegEx} from '@molecules/HelpMessage'

export type setRegEx = ( checkFor: checkFor, customRegEx: customRegEx ) =>  customRegEx

// Used by checkForMatch in HelpMessage
// Parameters: Accepts a string for setting case and allows optional customRegEx formula to be passed.
const setRegEx: setRegEx = (checkFor: checkFor, customRegEx: customRegEx = null) => {
  switch (checkFor) {
    case "a":
      return  /(a)/g

    case "b":
      return /(b)/g

    case "custom":
      return customRegEx
      
    default:
      return null
  }
}

export default setRegEx