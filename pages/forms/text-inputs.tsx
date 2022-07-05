import React, { useState, FC } from 'react'
import Breadcrumbs from '@components/layout/Breadcrumbs'
import { useForm } from 'react-hook-form'
import WrapperInput from '@components/WrapperInput'
import LayoutContainerSide from '@components/layout/LayoutContainerSide'
import Heading from '@components/layout/Heading'

const TestForm: FC = () => {
  
  const { getValues, handleSubmit, formState: { errors }, control } = useForm()

  const onSubmit = handleSubmit((data) => {
    console.log("Form submitted. Data:", data, "Submit form - errors", Error)
  })

  // data for Breadcrumbs
  const crumbs = [
    {
      text: "Home", 
      path: "/",
      currentPg: false,
    }, {
      text: "Text Inputs", 
      path: "/",
      currentPg: true,
    }
  ]

  return (

  <> 
    <LayoutContainerSide>
      <Breadcrumbs crumbs={crumbs} />
      <Heading text="Text Input" size="h1" type="primary"/>
      <form onSubmit={onSubmit}>
    
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
        } 
      }>GET VALUES</button>

      <button type="submit">Submit</button>
    
    </form>
    </LayoutContainerSide>
  </>
  )
}

export default TestForm