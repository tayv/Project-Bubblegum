import { FC, ReactNode } from 'react'
import Link from 'next/link'
import path from 'path'

export type BreadcrumbProps = {
  path: string,
  text: string | number,
  active?: boolean,
  crumbs: any
}

const Breadcrumbs: FC<BreadcrumbProps> = (props) => {
  const { crumbs } = props

  const renderCrumbs = (props: any) => {
    return crumbs.map((crumb: BreadcrumbProps, index: number) => (
      <span key={index}>
        <span className="text-sm text-gray-500"> / </span>
        { 
          (crumb.active)
          // if the prop is active then render without a link as it's the current page
          ? (
            <>
              <span className="text-sm text-blue-500">{crumb.text}</span>
            </>
          )
          : (
            // else render breadcrumb with a link
            <Link href={crumb.path}>
              <a className="inline underline no-underline text-sm text-gray-500 hover:decoration-dashed underline-offset-4 hover:text-blue-600 focus:text-blue-600">
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
      {renderCrumbs({props})} 
    </>
    
    
    );

  
}


  

export default Breadcrumbs


