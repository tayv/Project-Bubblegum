import React, {FC} from 'react'
import { Input } from '@components/atoms/input'
import { useForm, Controller } from 'react-hook-form'
import { InputProps } from '@components/atoms/input'
import UpdateInputState from '@components/UpdateInputState'
import WarningMessage from '@components/utils/WarningMessage'


const WrapperInput: FC<InputProps> = ({
  name,
  rules,
  control,
  label,
 // errors,
  onChange,
  defaultValue,
  tipText,
  exampleText,
  ...props
}) => {  

  return (
    <div>

      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field }) => (
          <Input {...field} // Need to place field above custom event handlers so that the built in handlers are overridden
            label={label} 
            tipText={tipText} 
            exampleText={exampleText} 
            onChange={e => {
              { WarningMessage(field.value) }
              field.onChange(e)
              }
            } 
            />
        )}
      />
    <WarningMessage />
    </div>  
  )
}

export default WrapperInput