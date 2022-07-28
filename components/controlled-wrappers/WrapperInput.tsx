import React, { FC } from 'react'
import { Input } from '@components/atoms/input'
import { Controller } from 'react-hook-form'
import { InputProps } from '@components/atoms/input'


const WrapperInput: FC<InputProps> = ({
  name,
  rules,
  control,
  label,
 // errors,
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
        defaultValue={defaultValue}
        render={({ field }) => (
          <Input {...field} // Need to place ...field above custom event handlers so that the built in handlers are overridden
            label={label} 
            tipText={tipText} 
            exampleText={exampleText} 
          />
        )}
      />
      {children} {/* Children here will be warning messages, etc. */}
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


