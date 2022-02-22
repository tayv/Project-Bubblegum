import Link from 'next/link'
import Breadcrumbs from '@components/Breadcrumbs'
import { useForm } from 'react-hook-form'
import React, { useState, useEffect } from 'react'


export default () => {
  
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm()
  const onSubmit = (data: any) => console.log(data)

  console.log(watch("fullName"))

  return (
   <>
     <Breadcrumbs></Breadcrumbs>

     <fieldset className="pt-4 pl-8">
    <div>
      <legend className="text-base font-medium text-gray-900">Will you proceed?</legend>
      <p className="text-sm text-gray-500">Choose your fate.</p>
    </div>
    <div className="mt-4 space-y-4">
      <div className="flex items-center">
        <input
          id="yay"
          name="revealForm"
          type="radio"
          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
        />
        <label htmlFor="yay" className="ml-3 block text-sm font-medium text-gray-700">
          Yay
        </label>
      </div>
      <div className="flex items-center">
        <input
          id="nay"
          name="revealForm"
          type="radio"
          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
        />
        <label htmlFor="nay" className="ml-3 block text-sm font-medium text-gray-700">
          Same as email
        </label>
      </div>
      <div className="flex items-center">
        <input
          id="undecided"
          name="revealForm"
          type="radio"
          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
        />
        <label htmlFor="undecided" className="ml-3 block text-sm font-medium text-gray-700">
          I don't know
        </label>
      </div>
    </div>
     </fieldset>

      <div className="pt-4 pl-4 mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6"> 
          <div className="pt-10 mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="bg-slate-50 px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                        Full name
                      </label>
                      <input 
                        {...register("fullName")}
                        placeholder="test placeholder value" 
                        type="text"
                        name="fullName"
                        id="fullName"
                        autoComplete="name"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">
                      Telephone
                      </label>
                      <input
                        {...register("telephone", {required: true})}
                        type="tel"
                        name="telephone"
                        id="telephone"
                        autoComplete="tel-area-code"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      { errors.telephone && <p className="text-red-600">Please enter a telephone number</p> }
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label htmlFor="numberThings" className="block text-sm font-medium text-gray-700">
                      How many things?
                      </label>
                      <input
                        {...register("numberThings", {required: true, min: 10, max: 100})}
                        type="number"
                        name="numberThings"
                        id="numberThings"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      { errors.numberThings && <p className="text-red-600">Please enter a number</p> }
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label htmlFor="emailRequired" className="block text-sm font-medium text-gray-700">
                        Email address
                      </label>
                      <input
                        {...register("emailRequired", {required: true})}
                        type="text"
                        name="emailRequired"
                        id="emailRequired"
                        autoComplete="email"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      { errors.emailRequired && <p className="text-red-600">Please enter an email</p> }
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                        Country
                      </label>
                      <select
                        id="country"
                        name="country"
                        autoComplete="country-name"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option>United States</option>
                        <option>Canada</option>
                        <option>Mexico</option>
                      </select>
                    </div>

                    <div className="col-span-6">
                      <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                        Street address
                      </label>
                      <input
                        type="text"
                        name="street-address"
                        id="street-address"
                        autoComplete="street-address"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        id="city"
                        autoComplete="address-level2"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                        State / Province
                      </label>
                      <input
                        type="text"
                        name="region"
                        id="region"
                        autoComplete="address-level1"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                        ZIP / Postal code
                      </label>
                      <input
                        type="text"
                        name="postal-code"
                        id="postal-code"
                        autoComplete="postal-code"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6 px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                   
                    onClick={() => {
                      reset({
                        keepErrors: false,
                        })
                      }
                    }
                    className="inline-flex justify-center max-w-xs py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="inline-flex justify-center max-w-xs py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Send
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

   </>
  )
}
