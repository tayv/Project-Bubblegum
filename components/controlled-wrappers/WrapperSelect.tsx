import React, { FC, JSXElementConstructor } from 'react'
import { Controller, Control } from 'react-hook-form'
import classNames from 'classnames'
import SelectItem, {SelectProps} from '@atoms/select'

export type WrapperSelectProps = {
  control: Control
}

const WrapperSelect: FC<SelectProps & WrapperSelectProps>= ({
  control,
  name
}) => {  

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={ ({ field: {onChange, value, ref, ...props} }) => (
          
          <SelectItem 
            onValueChange={onChange}
            value={value}
            forwardedRef={ref}
          />
     
         ) }  
      />
          { console.log("select item:", name)}
    </> 
  )
}


export default WrapperSelect
