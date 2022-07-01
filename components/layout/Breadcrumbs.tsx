import { FC, ReactNode } from 'react'
import Link from 'next/link'

export type BreadcrumbProps = {
  path: string,
  text: string | number,
  active?: boolean
}

const Breadcrumbs: FC<BreadcrumbProps> = (props) => {
  const { crumbs } = props

  const renderCrumbs = (props: []) => {
    return crumbs.map((crumb, index: number) => (
      <span key={index}>
        <span className="text-sm text-gray-500"> / </span>
        <Link href={crumb.path}>
          <a className="inline underline no-underline text-sm text-gray-500 hover:decoration-dashed underline-offset-4 hover:text-blue-600 focus:text-blue-600">
          {crumb.text}
          </a>
        </Link>
      </span> 
    ))
  }

  return (

      <div>
        <ul>
          {renderCrumbs({props})} 

        </ul>
      </div>

    
    );

  
}


  

export default Breadcrumbs


