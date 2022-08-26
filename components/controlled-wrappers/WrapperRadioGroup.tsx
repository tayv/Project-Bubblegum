import React, { FC, JSXElementConstructor } from 'react'
import { Controller, Control } from 'react-hook-form'
import { RadioButton, RadioProps } from '@components/atoms/RadioButton'


export type RadioGroupProps = {
  groupLabel: string
  options: any // BUG: Unsure why TS doesn't like this being string[]. Flags map function in Controller render prop as error.
  //value: string
  tipText?: string | null
  control: Control 
  defaultValue?: string
}
type LimitedRadioProps = Omit<RadioProps, "label" | "value" | "onChange">

const WrapperRadioGroup: FC<LimitedRadioProps & RadioGroupProps> = ({
  name,
  rules,
  options,
  control,
  groupLabel,
  defaultChecked,
  defaultValue,
  style,
  tipText,
  ...props
}) => {  

  return (
   <>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field: {onChange, ...props} }) => (
          <>
          <fieldset>
            <label htmlFor={name} className="block text-md font-bold text-gray-900">
              {groupLabel}
            </label>
            <span className="text-sm font-light text-gray-500 mb-2">{tipText}</span>
            
            { options.map((option: {value: string, label: string}, index: number) => (
            (defaultValue===option.value) ? ( // if defaultValue is set, use it to set defaultChecked
                <RadioButton 
                  key={index}
                  {...props} 
                  onChange={onChange}
                  value={option.value}  
                  label={option.label} 
                  style={style}
                  defaultChecked={true} 
                />) : ( 
                  <RadioButton 
                    key={index}
                    {...props} 
                    onChange={onChange}
                    value={option.value}  
                    label={option.label} 
                    style={style}
                  /> )
            ))}
          </fieldset>
          </>
        )}
      />
    </>  
  )
}


export default WrapperRadioGroup

// Radio Input
  // Setting a default value for radio input:
    // Need to use defaultChecked to set initial value. See https://stackoverflow.com/questions/45072603/how-to-make-default-checked-for-radio-buttons-in-react
    // Remember to use a ternary condition when using JSX
  // Make label clickable by using an id attribute and referencing it in the label htmlFor attribute

