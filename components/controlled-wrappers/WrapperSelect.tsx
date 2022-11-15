import React, { FC, JSXElementConstructor } from 'react'
import { Controller, Control } from 'react-hook-form'
import classNames from 'classnames'
import SelectItem from '@atoms/select'


const WrapperSelect: FC= ({
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
            valueOnChange={onChange}
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
