import React, {FC} from 'react'
import { Input } from '@components/atoms/input'
import { useForm, Controller } from 'react-hook-form'
import { InputProps } from '@components/atoms/input'
import UpdateInputState from '@components/UpdateInputState'


const WrapperInput: FC<InputProps> = ({
  name,
  rules,
  label,
 // register,
 // errors,
  onChange,
  defaultValue,
  ...props
}) => {
  

 const { register, control, handleSubmit, getValues, formState: { errors } } = useForm()


  return (
<>
    <div>

      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field }) => (
          <Input label={label} {...field} />
        )}
      />

    </div>
{/* 
    <div>
      <Controller
        control={control}
        name="test"
        defaultValue={defaultValue}
        render={({ field }) => (
          <Input label="controlled label" {...field} onChange={(e) => {console.log("jjjjj", JSON.stringify(getValues("test")))}} />
        )}
      />
    </div> */}
    </>
  
  )
}

export default WrapperInput