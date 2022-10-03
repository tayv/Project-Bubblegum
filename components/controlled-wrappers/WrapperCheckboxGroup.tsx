import React, { FC } from 'react'
import { Controller, Control } from 'react-hook-form'
import Checkbox, { CheckboxProps, CheckboxStyle } from '@components/atoms/checkbox'
import classNames from 'classnames'


export type CheckboxWrapperGroupProps = {
  control: Control 
  groupLabel: string
  options: any
  tipText?: string | null
}

const WrapperCheckboxGroup: FC<CheckboxWrapperGroupProps & CheckboxProps> = ({
  control,

  id,
  style = "single",
  label,
  name,
 // defaultChecked

  groupLabel,
  options,
  tipText
}) => {  

  // stylemap used for future styling flexibility of the Checkbox component
  const divStyleMap: {[key in CheckboxStyle]: string} = { 
    single: "", // css styles go here
    multiple: "flex gap-3",
  }  

  return (
   <>
      <Controller
        control={control}
       // name={name}
        //defaultValue={defaultChecked}
   
        render={({ field: {onChange, value, ...props}  }) => (
          <>
          <fieldset>
            <label htmlFor={name} className="block text-md font-bold text-gray-900">
              {groupLabel}
            </label>
            <span className="text-sm font-light text-gray-500 mb-2">{tipText}</span>

            <div className={ 
              classNames([
                "", // standard css styles go here. 
                divStyleMap[style], // to dynamically set styling for different radio types
              ]) }
            > 

            { options.map((option: {id: string, label: string, defaultChecked: boolean}, index: number) => (
                <Checkbox
                  key={index}
                  {...props} 
                  id={option.id}
                  label={option.label}
                  name={option.id}
                // onChange={(e: Event) => onChange(value = e)} // unnecessary for current setup
                  onChange={onChange}
                  defaultChecked={option.defaultChecked} 
                
                />
              ))}
            </div>
          </fieldset>
            
          </>
        )}
      />
    </>  
  )
}

export default WrapperCheckboxGroup


// (option.defaultChecked) ? ( // if defaultValue prop is set to a value then include defaultChecked
// <Checkbox
//   key={index}
//   {...props} 
//   id={option.id}
//   label={option.label}
//   name={option.id}
// // onChange={(e: Event) => onChange(value = e)} // unnecessary for current setup
//   onChange={onChange}
//   defaultChecked={true} 
// />) : ( 
//   <Checkbox
//     key={index}
//     {...props} 
//     id={option.id}
//     label={option.label}
//     name={option.id}
//   // onChange={(e: Event) => onChange(value = e)} // unnecessary for current setup
//     onChange={onChange}
//     defaultChecked={false}
//   /> )