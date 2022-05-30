import {FormEvent, useState} from 'react' 
import Breadcrumbs from '@components/layout/Breadcrumbs'
import HeadingArticle from '@components/layout/HeadingArticle';

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
     <h1 className="text-2xl">Buttons</h1>
    {/* <HeadingArticle text="This is a heading" size="h1" /> // COMPONENT NEEDS WORK */ }

      <p>Explainer about buttons and when to use them goes here</p>

      <h2 className="text-xl">When to use a button</h2>
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
    
    </>
  )
}