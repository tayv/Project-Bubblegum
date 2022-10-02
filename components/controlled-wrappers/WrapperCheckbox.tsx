import React, { FC, JSXElementConstructor } from 'react'
import { Controller, Control } from 'react-hook-form'
import Checkbox, { CheckboxProps, CheckboxStyle } from '@components/atoms/checkbox'
import classNames from 'classnames'


export type CheckboxWrapperProps = {
  control: Control 
}

const WrapperCheckbox: FC<CheckboxWrapperProps & CheckboxProps> = ({
  control,

  id,
  style = "single",
  label,
  name,
  defaultChecked
}) => {  

  const divStyleMap: {[key in CheckboxStyle]: string} = {
    single: "", // css styles go here
    multiple: "flex gap-3",
  }  

  return (
   <>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultChecked}
   
        render={({ field: {onChange, value, ...props}  }) => (
          <>
            <Checkbox
              id={id}
              label={label}
             // onChange={(e: Event) => onChange(value = e)} // unnecessary for current setup
              onChange={onChange}
              defaultChecked={defaultChecked}
              {...props}
            />
          </>
        )}
      />
    </>  
  )
}

export default WrapperCheckbox

