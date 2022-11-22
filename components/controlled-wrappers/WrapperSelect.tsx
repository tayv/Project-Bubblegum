import React, { FC, JSXElementConstructor } from 'react'
import { Controller, Control } from 'react-hook-form'
import classNames from 'classnames'
import SelectRadix, {SelectRadixProps} from '@components/molecules/SelectRadix'

export type WrapperSelectProps = {
  control: Control
}

type LimitedSelectRadixProps = Omit<SelectRadixProps, "value" | "onValueChange" | "forwardedRef">

const WrapperSelect: FC<LimitedSelectRadixProps & WrapperSelectProps>= ({
  name,
  placeholder,
  options,
  control,
}) => {  

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={ ({ field: {onChange, value, ref, ...props} }) => (
          
          <SelectRadix 
            onValueChange={onChange}
            value={value}
            forwardedRef={ref}
            placeholder={placeholder}
            options={options}
            {...props}
          />
     
         ) }  
      />
          { console.log("select item:", name)}
    </> 
  )
}


export default WrapperSelect
