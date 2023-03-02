import Breadcrumbs from '@components/layout/Breadcrumbs'
import Heading from '@components/layout/Heading'
import DoDont from '@components/layout/DoDont'
import LayoutContainerSide from '@components/layout/LayoutContainerSide'
import BlankSpace from '@components/layout/BlankSpace'
import Divider from '@components/layout/Divider'

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

          <Heading text="Containers" size="h1" type="primary"/> 
          <p>Containers that hold content and providing a consistent spacing.</p>

          <BlankSpace />
          <Divider />

          <Heading text="Page Containers" size="h2" type="primary" />
          <p>A page content container that provides consistent spacing and allows children to use css flex.</p>

          <Heading text="Example" size="h3" type="primary" />
          {/* Example components  */}
          <div className="space-y-4 shadow overflow-hidden border-solid border border-slate-300 py-2 px-4">
            <div className="flex items-center">
              <p>Page content goes here</p>
            </div>
          </div>

          <Heading text="Best Practices" size="h3" type="primary" />
          <DoDont />

          <Heading text="How to implement" size="h3" type="primary" />
          <p>Code details go here</p>

          <BlankSpace />
          <hr />

          <Heading text="Content Cards" size="h2" type="primary" />
          <p>Containers for organizing individual pieces of content such as specific groups of form inputs.</p>

          <Heading text="Related links" size="h3" type="secondary" />
          <ul>
            <li>- Link 1</li>
            <li>- Link 2</li>
          </ul>
      
      </LayoutContainerSide>
    </>
  )
}