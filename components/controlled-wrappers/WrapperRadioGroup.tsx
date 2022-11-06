import React, { FC, JSXElementConstructor } from 'react'
import { Controller, Control } from 'react-hook-form'
import { RadioButton, RadioProps, RadioStyle } from '@components/atoms/radiobutton'
import classNames from 'classnames'
import Tip, { TipProps } from '@components/layout/Tip'


export type RadioGroupProps = {
  groupLabel: string
  options: any // BUG: Unsure why TS doesn't like this being string[]. Flags map function in Controller render prop as error.
  //value: string
  tipText?: TipProps["text"] 
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
  style = "standard",
  tipText = null,
  ...props
}) => {  

  const divStyleMap: {[key in RadioStyle]: string} = {
    standard: "", // css styles go here
    horizontal: "flex gap-3",
    button: "",
  }  

  return (
   <>
      <Controller
        control={control}
        name={name}
        render={({ field: {onChange, ...props} }) => (
          <>
          {console.log("props: ", props)}
          <fieldset>
            <label htmlFor={name} className="block text-md font-bold text-gray-900">
              {groupLabel}
            </label>
            <Tip text={tipText} type="standard" />

            <div className={ 
              classNames([
                "", // standard css styles go here. 
                divStyleMap[style], // to dynamically set styling for different radio types
              ]) }
            > 

            { options.map((option: {value: string, label: string}, index: number) => (
              (props.value===option.value) ? ( // if defaultValue prop is set to a value then include defaultChecked
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
            </div>
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

