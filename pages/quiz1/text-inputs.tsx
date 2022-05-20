import React, { useState, FC } from 'react'
import Breadcrumbs from '@components/Breadcrumbs'
import { useForm } from 'react-hook-form'
import WrapperInput from '@components/WrapperInput'

const TestForm: FC = () => {
  
  const { getValues, handleSubmit, formState: { errors }, control } = useForm()

  const onBlurFirst = (value) => {
    console.log("BLUR", value)
  }

  const onChangeFirst = (value) => {
    console.log("ONCHANGE WORKED", value)
  }

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
        warnBlur={onBlurFirst} // Warning/tips message triggered onBlur
        warnChange={onChangeFirst} // Warning/tips message triggered onChange
      />
      <button type="button" onClick={ () => { 
        const testGetVal = getValues("controllerInput")
        console.log(testGetVal)
        } 
      }>GET VALUES</button>

      <button type="submit">Submit</button>
    
    </form>
  )
}

export default TestForm