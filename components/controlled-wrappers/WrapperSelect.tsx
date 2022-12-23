import React, { FC, JSXElementConstructor } from 'react'
import { Controller, Control } from 'react-hook-form'
import SelectRadix, {SelectRadixProps} from '@atoms/SelectRadix'
import InputLabel from '@atoms/InputLabelRadix'
import Tip from '@components/helpers/Tip'

export type WrapperSelectProps = {
  label?: string | null
  tip?: string | null
  control: Control
  defaultValue: string
}

type LimitedSelectRadixProps = Omit<SelectRadixProps, "value" | "onValueChange" | "forwardedRef">

const WrapperSelect: FC<LimitedSelectRadixProps & WrapperSelectProps>= ({
  name,
  label = null,
  tip = null,
  placeholder,
  itemOptions,
  defaultValue,
  control,
}) => {  

  return (
    <>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={ ({ field: {onChange, value, ref, ...props} }) => (
          <>
            { !!label && <InputLabel type="standard" label={label} htmlFor={name} /> }
            { !!tip && <Tip text={tip} type="standard" />}
            <SelectRadix 
              onValueChange={onChange}
              value={value}
              forwardedRef={ref}
              placeholder={placeholder}
              itemOptions={itemOptions}
              {...props}
            />
          </>
         ) }  
      />
    </> 
  )
}


export default WrapperSelect

// Usage
  // Label and Tips are optional so if they're not passed in, they won't render due to default value being null