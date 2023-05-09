import React, { FC } from "react"
import Input, { InputProps } from "@atoms/Input"
import { Controller } from "react-hook-form"

const WrapperInput: FC<InputProps> = ({
  name = "defaultName",
  rules,
  control,
  label,
  onChange,
  defaultValue,
  tipText,
  exampleText,
  children,
  ...props
}) => {
  return (
    <div>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue} // defaultValue is required for Input to prevent uncontrolled to controlled error
        render={({ field }) => (
          <Input
            {...field} // Need to place ...field above custom event handlers so that the built in handlers are overridden
            label={label}
            tipText={tipText}
            exampleText={exampleText}
          />
        )}
      />
      {children} {/* Children here will be warning message components, etc. */}
    </div>
  )
}

export default WrapperInput

// Controller documentation
// Controller supports custom onChange and onBlur.
// See https://stackoverflow.com/questions/67917480/onchange-input-in-react-hook-form

// Notes:
// onChange / onBlur must be ordered after {}...field} so that they override the default event handlers
// Able to pass custom onChange and onBlur function props from parent component that can do a custom action.
// can be used for soft validation/tip messages.
// To allow further flexibility, can pass in an object with method and properties to determine if the custom event handler
// should fire and/or specify custom messages by using a logical && operator

// Example:

// <Controller
//   control={control}
//   name={name}
//   defaultValue={defaultValue}
//   render={({ field }) => (
//     <Input {...field} // Need to place field above custom event handlers so that the built in handlers are overridden
//       label={label}
//       tipText={tipText}
//       exampleText={exampleText}
//       onChange={e => {
//         {//console.log("TestWatch: ", testWatch)}
//          //regEx.test(testWatch)
//         console.log(field.value == "a") }
//         field.onChange(e)
//         }
//       }
//       />
//   )}
// />
