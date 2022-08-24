import React, { FC } from 'react'
import { Input } from '@components/atoms/input'
import { Controller } from 'react-hook-form'
import { RadioProps } from '@components/atoms/radiobutton'
import { TestRadio } from '@components/atoms/TESTradio'


const WrapperRadioGroup: FC<RadioProps> = ({
  name,
  rules,
  options,
  control,
  label,
  value,
 // errors,
  onChange,
  tipText,
  exampleText,
  children,
  ...props
}) => {  

  return (
    <>
      {/* {label} */}
      <Controller
        control={control}
        name={name}
        defaultValue={props.value}
        render={({ field: {onChange, ...props} }) => 
          options.map((option, index) => (
    
          <TestRadio 
            key={index}
            {...props} 
            onChange={onChange}
            value={option}  
            label={label} 
          />
           
          ))
        }
      />
    </>  
  )
}


export default WrapperRadioGroup

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


