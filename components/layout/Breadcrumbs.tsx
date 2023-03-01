import { FC, ReactNode } from 'react'
import Link from 'next/link'

export type BreadcrumbProps = {
  path: string,
  text: string,
  currentPg: boolean
}

const Breadcrumbs = ({crumbs}: any) => {

  const renderCrumbs = (props: Array<BreadcrumbProps>) => {
       return crumbs.map((crumb: BreadcrumbProps, index: number) => (
        <span key={index}>
          <span className="text-sm text-gray-500 ml-1"> / </span>
          { 
            (crumb.currentPg)
            // if the prop is currentPg then render without a link as it's the current page
            ? (
                <span className="text-sm text-gray-500">{crumb.text}</span>
            )
            : (
              // else render breadcrumb with a link
              <Link href={crumb.path} className="inline underline no-underline text-sm text-pink-500 hover:decoration-dashed underline-offset-4 hover:text-pink-600 focus:text-pink-600">
                {crumb.text}
              </Link>
            )
          } 
        </span>    
      )) 
  }

  return (
    <div className="flex flex-row flex-nowrap pb-3">
      {renderCrumbs(crumbs)} 
    </div>
  ) 
}

export default Breadcrumbs

// DOCUMENTATION
  // This would ideally grab current path and page name from state instead of needing props to be passed
  // Prop should be an array of objects with a path, text to display, and a boolean specifying if it's 
  // the current page since current page isn't a link
  // Example:
    // const crumbs = [
    //   {
    //     text: "Home", 
    //     path: "/",
    //     currentPg: false,
    //   }, {
    //     text: "breadcrumb 2", 
    //     path: "/",
    //     currentPg: true,
    //   }
    // ]