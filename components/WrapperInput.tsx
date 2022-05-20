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
  ...props
}) => {
  

 //const { register, handleSubmit, getValues, formState: { errors } } = useForm()
 const onChangeFirst = (value) => {
   console.log("ONCHANGE WORKED", value)
 }

  return (
    <div>

      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field }) => (
          <Input label={label} {...field} onChange={e => {
            onChangeFirst(field.value);
            field.onChange(e);
          }} />
        )}
      />

    </div>  
  )
}

export default WrapperInput