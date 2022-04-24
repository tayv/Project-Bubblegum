import React, { useState, FC } from 'react'
import { Input } from '@components/atoms/input'
import Breadcrumbs from '@components/Breadcrumbs'
import TextInput from '@components/TextInput'
import { useForm } from 'react-hook-form'
import WrapperInput from '@components/WrapperInput'
import UpdateInputState from '@components/UpdateInputState'


 const testForm: FC = () => {
  
  const { register, handleSubmit, formState: { errors } } = useForm()

  // const [inputValue, handleInputChange] = UpdateInputState()

  const onSubmit = handleSubmit((data) => {
    console.log("Form submitted:", data)
    console.log("errors", Error)
  })

  return (
    <form onSubmit={onSubmit}>
      <Breadcrumbs></Breadcrumbs>
    
      <TextInput 
        register={register}
        fieldName="firstName"  
        label="This is a label"  
      />
      <p>Test Content</p>

      <Input
         name="firstInput"
         label="Here's another label"
         type="text"
        // onChange={handleInputChange}
      />

      <WrapperInput
        name="firstWrapperInput"
        label="This is a wrapper input"
        type="text"
        register={register}
        rules={{ required: "You must enter something" }}
        errors={errors}
      />

      <button type="submit">Submit</button>
    
    </form>
  )
}

export default testForm