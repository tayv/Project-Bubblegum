import {FormEvent, useState} from 'react' 
import Breadcrumbs from '@components/layout/Breadcrumbs'
import HeadingArticle from '@components/layout/HeadingArticle'
import SideNav from '@components/layout/SideNav'
import DoDont from '@components/layout/DoDont'
import LayoutContainerSide from '@components/layout/LayoutContainerSide'

export default function MyRadioGroup() {
  // data for Breadcrumbs
  const crumbs = [
    {
      text: "Home", 
      path: "/",
      active: false,
    }, {
      text: "Buttons", 
      path: "/",
      active: true,
    }
  ]

  return (
    <> 
      <LayoutContainerSide>
          <Breadcrumbs crumbs={crumbs} />

          <HeadingArticle text="Buttons Heading" size="h1" type="primary"/> 
          <p>Explainer about buttons and when to use them goes here</p>

          <br />
          <hr />

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

          <br />
          <hr />

          <HeadingArticle text="Secondary Buttons" size="h2" type="primary" />
          <p>Sometimes called Ghost buttons.</p>

          <HeadingArticle text="Related links" size="h3" type="secondary" />
          <ul>
            <li>- Link 1</li>
            <li>- Link 2</li>
          </ul>
      
      </LayoutContainerSide>
    </>
  )
}