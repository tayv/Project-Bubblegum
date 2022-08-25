import React, { FC, JSXElementConstructor } from 'react'
import { Controller } from 'react-hook-form'
import { RadioButton, RadioProps } from '@components/atoms/RadioButton'


export type RadioGroupProps = {
  groupLabel: string
  options: any // BUG: Unsure why TS doesn't like this being string[]. Flags map function in Controller render prop as error.
  //value: string
  tipText?: string | null
}

const WrapperRadioGroup: FC<RadioProps & RadioGroupProps> = ({
  name,
  rules,
  options,
  control,
  groupLabel,
  label,
  value,
  style,
 // errors,
  onChange,
  tipText,
  children,
  ...props
}) => {  

  return (
    <div>
      <label htmlFor={name} className="block text-md font-bold text-gray-900">
        {groupLabel}
      </label>
      <span className="text-sm font-light text-gray-500 mb-2">{tipText}</span>
      <Controller
        control={control}
        name={name}
        defaultValue={value}
        render={({ field: {onChange, ...props} }) => (
          options.map((option: {value: string, label: string}, index: number) => (
    
          <RadioButton 
            key={index}
            {...props} 
            onChange={onChange}
            value={option.value}  
            label={option.label} 
            style={style}
          />
          
          ))
        )}
      />
    </div>  
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


