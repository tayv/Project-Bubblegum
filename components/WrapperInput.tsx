import React from 'react'
import { Input } from '@components/atoms/input'

const WrapperInput = ({
  name,
  register,
  rules,
  ...props
}) => {
  
  
  return (

    <div>
      <Input name={name} {...props} {...(register && register(name, rules))} 
      />
    </div>

  )
}

export default WrapperInput