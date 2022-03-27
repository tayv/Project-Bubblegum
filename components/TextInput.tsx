import { prependOnceListener } from 'process'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

const TextInput = (props) => {

  const { register, formState: { errors } } = useForm()
  const { fieldName, label } = props

  return (
    <>
      <div className="max-w-sm">
        <label htmlFor="text" className="block text-sm font-medium text-gray-700">
          { label }
        </label>
        <input
          {...register(fieldName) }
          type="text"
          name={ fieldName }
          id={ fieldName }
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        { errors.testInput && <p className="text-red-600">Please enter something</p> }
      </div>

    </>
  )
}

export default TextInput


/*
//Input field
<div className="form-field"> 
  <input 
    placeholder={placeHolder} 
    {...register(fieldName, { 
        required: { 
          value: isRequired, 
          message: "This is required", 
      }, 
        maxLength: { 
          value: maximLength, 
          message: `Value must be maximum ${maximLength}`, 
      }, 
        minLength: { 
          value: minimLength, 
          message: `Value must be minimum ${minimLength}`, 
      }, 
   }
  )} 
/>
</div>

*/