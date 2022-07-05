import Breadcrumbs from '@components/layout/Breadcrumbs'
import Heading from '@components/layout/Heading'
import DoDont from '@components/layout/DoDont'
import LayoutContainerSide from '@components/layout/LayoutContainerSide'
import Link from 'next/link'
import Paragraph from '@components/layout/Paragraph'

export default function MyRadioGroup() {
  // data for Breadcrumbs
  const crumbs = [
    {
      text: "Home", 
      path: "/",
      currentPg: false,
    }, {
      text: "Buttons", 
      path: "/",
      currentPg: true,
    }
  ]

  return (
    <> 
      <LayoutContainerSide>
          <Breadcrumbs crumbs={crumbs} />  

          <Heading text="Buttons Heading" size="h1" type="primary"/> 
          <Paragraph text="Explainer about buttons and when to use them goes here" size="standard" type="primary" />
          <br />
          <hr />

          <Heading id="primary" text="Primary Buttons" size="h2" type="primary" />
          <Paragraph text="Sometimes called Call-To-Action (CTA) buttons." size="standard" type="primary" />

          <Heading text="Example" size="h3" type="primary" />

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

          <Heading text="Best Practices" size="h3" type="primary" />
          <DoDont />

          <Heading text="How to implement" size="h3" type="primary" />
          <p>Code details go here</p>

          <br />
          <hr />

          <Heading id="secondary" text="Secondary Buttons" size="h2" type="primary" />
          <Paragraph text="Sometimes called Ghost buttons." size="standard" type="primary" />

          <Heading text="Example" size="h3" type="primary" />
          <Paragraph text="Example goes here" size="standard" type="primary" />

          <Heading text="Related links" size="h3" type="secondary" />
          <ul>
            <li>- Link 1</li>
            <li>- Link 2</li>
          </ul>
      
      </LayoutContainerSide>
    </>
  )
}