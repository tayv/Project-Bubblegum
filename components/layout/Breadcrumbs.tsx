import Link from 'next/link'

const Breadcrumbs = (props) => {
  const { crumbs } = props

  const renderCrumbs = (props: []) => {
    return crumbs.map(crumb => (
      <>
        <span className="text-sm text-gray-500"> / </span>
        <Link href={crumb.path}>
          <a className="inline underline no-underline text-sm text-gray-500 hover:decoration-dashed underline-offset-4 hover:text-blue-600 focus:text-blue-600">
          {crumb.text}
          </a>
        </Link>
      </> 
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


