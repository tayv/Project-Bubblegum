import Breadcrumbs from '@components/layout/Breadcrumbs'
import HeadingArticle from '@components/layout/HeadingArticle'
import DoDont from '@components/layout/DoDont'
import LayoutContainerSide from '@components/layout/LayoutContainerSide'
import Link from 'next/link'

export default function KitchenSink() {
  // data for Breadcrumbs
  const crumbs = [
    {
      text: "Home", 
      path: "/",
      active: false,
    }, {
      text: "Kitchen Sink", 
      path: "/",
      active: true,
    }
  ]

  return (
    <> 
      <LayoutContainerSide>
          <Breadcrumbs crumbs={crumbs} />  

          
      
      </LayoutContainerSide>
    </>
  )
}