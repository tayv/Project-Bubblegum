import React, {FC} from 'react'
import { Input } from '@components/atoms/input'
import { appendErrors } from 'react-hook-form'
import { InputProps } from '@components/atoms/input'

const WrapperInput: FC<InputProps> = ({
  name,
  rules,
  register,
 // errors,
  onChange,
  ...props
}) => {
  
 // const [inputValue, handleInputChange] = UpdateInputState()

  const testName = {name}
 // console.log("name:", testName,"errors:", errors, "errors[{name}] is true:", !(errors[{name}]))
  return (

    <div>
      <Input name={name} {...props} {...(register && register(name, rules))} 
      />
      { 
      //  errors[{name}] && <p className="text-red-600">Please enter something</p> 
        // https://react-hook-form.com/api/useform/register rules says rhf uses dot notation only for typescript consistency 
      }
    </div>
    
  )
}

export default WrapperInput