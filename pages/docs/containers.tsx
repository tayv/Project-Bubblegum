import Breadcrumbs from '@designSystem/layouts/Breadcrumbs'
import Heading from '@designSystem/layouts/Heading'
import DoDont from '@designSystem/layouts/DoDont'
import LayoutContainerSide from '@designSystem/layouts/LayoutContainerSide'
import BlankSpace from '@designSystem/layouts/BlankSpace'
import Divider from '@designSystem/layouts/Divider'

export default function MyRadioGroup() {
  // data for Breadcrumbs
  const crumbs = [
    {
      text: "Home", 
      path: "/",
      currentPg: false,
    }, {
      text: "Containers", 
      path: "/",
      currentPg: true,
    }
  ]

  return (
    <> 
      <LayoutContainerSide>
          <Breadcrumbs crumbs={crumbs} />

          <Heading size="h1" type="primary">Containers</Heading> 
          <p>Containers that hold content and providing a consistent spacing.</p>

          <BlankSpace />
          <Divider />

          <Heading size="h2" type="primary">Page Containers</Heading>
          <p>A page content container that provides consistent spacing and allows children to use css flex.</p>

          <Heading size="h3" type="primary">Example</Heading>
          {/* Example components  */}
          <div className="space-y-4 shadow overflow-hidden border-solid border border-slate-300 py-2 px-4">
            <div className="flex items-center">
              <p>Page content goes here</p>
            </div>
          </div>

          <Heading size="h3" type="primary">Best Practices</Heading>
          <DoDont />

          <Heading size="h3" type="primary">How to implement</Heading>
          <p>Code details go here</p>

          <BlankSpace />
          <Divider />

          <Heading size="h2" type="primary">Content Cards</Heading>
          <p>Containers for organizing individual pieces of content such as specific groups of form inputs.</p>

          <Heading size="h3" type="secondary">Related Links</Heading>
          <ul>
            <li>- Link 1</li>
            <li>- Link 2</li>
          </ul>
      
      </LayoutContainerSide>
    </>
  )
}