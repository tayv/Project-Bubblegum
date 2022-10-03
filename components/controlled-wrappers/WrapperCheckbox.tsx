import React, { FC } from 'react'
import { Controller, Control } from 'react-hook-form'
import Checkbox, { CheckboxProps, CheckboxStyle } from '@components/atoms/checkbox'
import classNames from 'classnames'


export type CheckboxWrapperProps = {
  control: Control 
}

const WrapperCheckbox: FC<CheckboxWrapperProps & CheckboxProps> = ({
  control,

  id,
  label,
  name,
  defaultChecked
}) => {  

  // stylemap used for future styling flexibility of the Checkbox component
  // const CheckboxStyleMap: {[key in CheckboxStyle]: string} = { 
  //   single: "", // css styles go here
  //   toggle: "",
  // }  

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

