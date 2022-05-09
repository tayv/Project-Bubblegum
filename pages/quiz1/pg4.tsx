import React, { useState, FC } from 'react'
import { Input } from '@components/atoms/input'
import Breadcrumbs from '@components/Breadcrumbs'
import { useForm } from 'react-hook-form'
import WrapperInput from '@components/WrapperInput'
import UpdateInputState from '@components/UpdateInputState'

 const testForm: FC = () => {
  
  const { register, handleSubmit, formState: { errors } } = useForm()

  const [inputValue, handleInputChange] = UpdateInputState()

  const onSubmit = handleSubmit((data) => {
    console.log("Form submitted:", data)
    console.log("errors", Error)
  })

  return (
    <form onSubmit={onSubmit}>
      <Breadcrumbs></Breadcrumbs>
    
      <p>Test Content</p>

      <Input
         name="firstInput"
         label="Here's another label"
         type="text"
         onChange={handleInputChange}
      />

      <WrapperInput
        name="firstWrapperInput"
        label="This is a wrapper input"
        type="text"
      //  register={register}
        rules={{ required: "You must enter something" }}
        //errors={errors}
        onChange={handleInputChange}
      />

      <WrapperInput
        name="controllerInput"
        label="This input uses Controller:"
        type="text"
        rules={{ required: "You must enter something" }}
        defaultValue=""
        //errors={errors}
       // onChange={handleInputChange}
      />

      <button type="submit">Submit</button>
    
    </form>
  )
}

export default testForm