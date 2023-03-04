import React, { useState, FC } from 'react'
import Breadcrumbs from '@components/layout/Breadcrumbs'
import { useForm } from 'react-hook-form'
import WrapperInput from '@components/controlled-wrappers/WrapperInput'
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
      <Heading size="h1">Text Input</Heading>
      <form onSubmit={onSubmit}>
    
      <WrapperInput
        name="controllerInput"
        label="This input uses Controller:"
        type="text"
        control={control}
        rules={{ required: "You must enter something" }}
        defaultValue=""
      />
      <button className="my-4 block border-gray-900 bg-gray-300 border px-2 py-1" type="button" onClick={ () => { 
          const testGetVal = getValues("controllerInput")
          console.log(testGetVal)
          } }>
        GET VALUES
      </button>
      <button className="block border-gray-900 bg-gray-300 border px-2 py-1" type="submit">Submit</button>
    
    </form>
    </LayoutContainerSide>
  </>
  )
}

export default TestForm