import React, {FC} from 'react'
import { Input } from '@components/atoms/input'
import { useForm, Controller } from 'react-hook-form'
import { InputProps } from '@components/atoms/input'
import UpdateInputState from '@components/UpdateInputState'


const WrapperInput: FC<InputProps> = ({
  name,
  rules,
 // register,
 // errors,
  onChange,
  ...props
}) => {
  
 // const [inputValue, handleInputChange] = UpdateInputState()
 const [inputValue, handleInputChange] = UpdateInputState()

 const { register, control, handleSubmit, formState: { errors } } = useForm()

  const testName = {name}
 // console.log("name:", testName,"errors:", errors, "errors[{name}] is true:", !(errors[{name}]))
  return (

    <div>
      <Input name={name} {...props} {...register(name, {onChange: (e)=>{console.log("yes", e)} }, rules ) } 
      /> 
      { 
      //  errors[{name}] && <p className="text-red-600">Please enter something</p> 
        // https://react-hook-form.com/api/useform/register rules says rhf uses dot notation only for typescript consistency 
      }

      <Controller
        control={control}
        name="test"
        render={({ field }) => (
          <Input label="controlled label" {...field} onChange={(e) => {console.log("jjjjj", field.value)}} />
        )}
      />

    </div>
    
  )
}

export default WrapperInput