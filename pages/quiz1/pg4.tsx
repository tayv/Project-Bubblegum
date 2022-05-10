import React, { useState, FC } from 'react'
import { Input } from '@components/atoms/input'
import Breadcrumbs from '@components/Breadcrumbs'
import { useForm } from 'react-hook-form'
import WrapperInput from '@components/WrapperInput'
import UpdateInputState from '@components/UpdateInputState'

 const testForm: FC = () => {
  
  const { register, getValues, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = handleSubmit((data) => {
    console.log("Form submitted:", data)
    console.log("Submit form - errors", Error)
  })

  return (
    <form onSubmit={onSubmit}>
      <Breadcrumbs></Breadcrumbs>
    
      <p>Test Content</p>

      <WrapperInput
        name="controllerInput"
        label="This input uses Controller:"
        type="text"
        rules={{ required: "You must enter something" }}
        defaultValue=""
      />
      <button type="button" onClick={() => {console.log("getValues:", JSON.stringify(getValues()))}}>TESTESTESSTS</button>

      <button type="submit">Submit</button>
    
    </form>
  )
}

export default testForm