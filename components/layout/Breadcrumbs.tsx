import Link from 'next/link'

const Breadcrumbs = (props) => {
  const { crumbs } = props
  //console.log(typeof(crumbs))
  const renderCrumbs = (props: []) => {
    return props.map(prop => <li>{prop.text}</li>)
  }

  return (

      <div>
        <ul>
          {/* {renderCrumbs({props})}  */}
        </ul>
      </div>
    );

  
}


  

export default Breadcrumbs


{/* <>
<span className="text-sm text-gray-500"> / </span>
<Link href="/">
  <a className="inline underline no-underline text-sm text-gray-500 hover:decoration-dashed underline-offset-4 hover:text-blue-600 focus:text-blue-600">
  breadcrumb 1 
  </a>
</Link>
<span className="text-sm text-gray-500"> / </span>
<Link href="/">
  <a className="inline underline no-underline text-sm text-gray-500 hover:decoration-dashed underline-offset-4 hover:text-blue-600 focus:text-blue-600">
  second breadcrumb 2
  </a>
</Link>

</> */}