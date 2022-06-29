import {FormEvent, useState} from 'react' 
import Breadcrumbs from '@components/layout/Breadcrumbs'
import HeadingArticle from '@components/layout/HeadingArticle'
import SideNav from '@components/layout/SideNav'
import DoDont from '@components/layout/DoDont'

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
      <div className="h-screen flex flex-initial flex-row">
        <SideNav />
        <div className="py-3">
          <HeadingArticle text="Buttons Heading" size="h1" type="primary"/> 
          <p>Explainer about buttons and when to use them goes here</p>

          <HeadingArticle text="Primary Buttons" size="h2" type="primary" />
          <p>Sometimes called Call-To-Action (CTA) buttons.</p>

          <div className="grid grid-cols-2 gap-2 py-3 text-right">
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

          <HeadingArticle text="Best Practices" size="h3" type="primary" />
          <DoDont />

          <HeadingArticle text="How to implement" size="h3" type="primary" />
          <p>Code details go here</p>

          <HeadingArticle text="Related links" size="h3" type="secondary" />
          <ul>
            <li>- Link 1</li>
            <li>- Link 2</li>
          </ul>
      
        </div>
      </div>
    </>
  )
}