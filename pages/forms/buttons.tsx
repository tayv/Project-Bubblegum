import {FormEvent, useState} from 'react' 
import Breadcrumbs from '@components/layout/Breadcrumbs'
import HeadingArticle from '@components/layout/HeadingArticle'
import SideNav from '@components/layout/SideNav'

export default function MyRadioGroup() {
  let [submittingForm, setSubmittingForm] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmittingForm(true)

    // simulate asynchronous form submission via API
    setTimeout(() => {
      setSubmittingForm(false)
      alert("You have submitted the form.")
    }, 3000)
  }

  return (
    <> 
      <Breadcrumbs></Breadcrumbs>
      <div className="h-screen flex flex-initial flex-row">
        <SideNav />
        <div>
          <HeadingArticle text="Buttons Heading" size="h1" type="primary"/> 
          <p>Explainer about buttons and when to use them goes here</p>
          <HeadingArticle text="Buttons Secondary Heading Style" size="h1" type="secondary"/> 

          <HeadingArticle text="When to use a button" size="h2" />
          <p>Do's and Dont's</p>

        <div className="grid grid-cols-2 gap-2 px-4 py-3 text-right sm:px-6">
          <button 
            className="block inline-flex justify-center max-w-xs py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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

        <h2 className="text-xl">How to implement</h2>
          <p>Code details go here</p>

          <h3 className="text-l">Related Links</h3>
          <p>links go here</p>
      
        </div>
      </div>
    </>
  )
}