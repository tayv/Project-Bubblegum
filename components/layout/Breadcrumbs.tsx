import { FC, ReactNode } from 'react'
import Link from 'next/link'

export type BreadcrumbProps = {
  path: string,
  text: string,
  active: boolean
}

const Breadcrumbs = ({crumbs}: any) => {

  const renderCrumbs = (props: Array<BreadcrumbProps>) => {
    return crumbs.map((crumb: BreadcrumbProps, index: number) => (
      <span key={index}>
        <span className="text-sm text-gray-500"> / </span>
        { 
          (crumb.active)
          // if the prop is active then render without a link as it's the current page
          ? (
            <>
              <span className="text-sm text-gray-500">{crumb.text}</span>
            </>
          )
          : (
            // else render breadcrumb with a link
            <Link href={crumb.path}>
              <a className="inline underline no-underline text-sm text-blue-500 hover:decoration-dashed underline-offset-4 hover:text-blue-600 focus:text-blue-600">
                {crumb.text}
              </a>
           </Link>
          )
        }
      </span> 
        
    ))
  }

  return (
    <>
      {renderCrumbs(crumbs)} 
    </>
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
    //     active: false,
    //   }, {
    //     text: "breadcrumb 2", 
    //     path: "/",
    //     active: true,
    //   }
    // ]