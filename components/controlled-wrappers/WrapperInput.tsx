import React, {FC} from 'react'
import { Input } from '@components/atoms/input'
import { useForm, Controller } from 'react-hook-form'
import { InputProps } from '@components/atoms/input'
import UpdateInputState from '@components/UpdateInputState'


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
          <Input label={label} tipText={tipText} exampleText={exampleText} {...field} />
        )}
      />

    </div>  
  )
}

export default WrapperInput