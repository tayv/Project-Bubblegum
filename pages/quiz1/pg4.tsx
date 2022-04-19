import React, { useState, FC } from 'react'
import { Input } from '@components/atoms/input'
import Breadcrumbs from '@components/Breadcrumbs'
import TextInput from '@components/TextInput'
import { useForm } from 'react-hook-form'


 const testForm: FC = () => {
  
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = handleSubmit((data) => {
    console.log("Form submitted:", data)
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
      />

      <button type="submit">Submit</button>
    
    </form>
  )
}

export default testForm