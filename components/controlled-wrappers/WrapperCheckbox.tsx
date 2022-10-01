import React, { FC, JSXElementConstructor } from 'react'
import { Controller, Control } from 'react-hook-form'
import Checkbox, { CheckboxProps, CheckboxStyle } from '@components/atoms/checkbox'
import classNames from 'classnames'


export type CheckboxWrapperProps = {
  groupLabel: string
  //options: any // BUG: Unsure why TS doesn't like this being string[]. Flags map function in Controller render prop as error.
  //value: string
  tipText?: string | null
  control: Control 
  defaultValue?: string
}

const WrapperCheckbox: FC<CheckboxWrapperProps & CheckboxProps> = ({
 // options,
  control,
  groupLabel,
  tipText,

  id,
  style = "single",
  name,
 // checked,
  label,
  value,
  ...props
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
        defaultValue={false}
        render={({ field: {onChange, value, ...props}  }) => (
          <>
            <Checkbox
            //  name={name}
              id={id}
              label={label}
              onChange={(e) => onChange(value = e)}
              checked={value} // doesn't work
             // {...props}
            />
          </>
        )}
      />
    </>  
  )
}

export default WrapperCheckbox

