import Breadcrumbs from '@components/layout/Breadcrumbs'
import HeadingArticle from '@components/layout/HeadingArticle'
import DoDont from '@components/layout/DoDont'
import LayoutContainerSide from '@components/layout/LayoutContainerSide'

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

          <HeadingArticle text="Containers" size="h1" type="primary"/> 
          <p>Containers that hold content and providing a consistent spacing.</p>

          <br />
          <hr />

          <HeadingArticle text="Page Containers" size="h2" type="primary" />
          <p>A page content container that provides consistent spacing and allows children to use css flex.</p>

          <HeadingArticle text="Example" size="h3" type="primary" />
          {/* Example components  */}
          <div className="space-y-4 shadow overflow-hidden border-solid border border-slate-300 py-2 px-4">
            <div className="flex items-center">
              <p>Page content goes here</p>
            </div>
          </div>

          <HeadingArticle text="Best Practices" size="h3" type="primary" />
          <DoDont />

          <HeadingArticle text="How to implement" size="h3" type="primary" />
          <p>Code details go here</p>

          <br />
          <hr />

          <HeadingArticle text="Content Cards" size="h2" type="primary" />
          <p>Containers for organizing individual pieces of content such as specific groups of form inputs.</p>

          <HeadingArticle text="Related links" size="h3" type="secondary" />
          <ul>
            <li>- Link 1</li>
            <li>- Link 2</li>
          </ul>
      
      </LayoutContainerSide>
    </>
  )
}