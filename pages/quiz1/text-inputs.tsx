import React, { useState, FC } from 'react'
import { Input } from '@components/atoms/input'
import Breadcrumbs from '@components/Breadcrumbs'
import { useForm } from 'react-hook-form'
import WrapperInput from '@components/WrapperInput'
import UpdateInputState from '@components/UpdateInputState'

 const TestForm: FC = () => {
  
  const { register, setValue, getValues, handleSubmit, formState: { errors }, control } = useForm()

  const onSubmit = handleSubmit((data) => {
    console.log("Form submitted. Data:", data, "Submit form - errors", Error)
  })

  return (
    <form onSubmit={onSubmit}>
      <Breadcrumbs></Breadcrumbs>
    
      <p>Test Content</p>

      <WrapperInput
        name="controllerInput"
        label="This input uses Controller:"
        type="text"
        control={control}
        rules={{ required: "You must enter something" }}
        defaultValue=""
      />
      <button type="button" onClick={ () => { 
        
    
        const testGetVal = getValues("controllerInput")
        console.log(testGetVal)
        // console.log("getValues:", JSON.stringify(getValues("controllerInput"))) 
        } 
      }>GET VALUES</button>

      <button type="submit">Submit</button>
    
    </form>
  )
}

export default TestForm