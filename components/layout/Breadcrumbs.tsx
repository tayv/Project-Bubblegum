import Link from 'next/link'

const Breadcrumbs = () => {

  return (

  <>
    <Link href="/">
      <a className="block underline no-underline text-sm text-gray-500 hover:decoration-dashed underline-offset-4 hover:text-blue-600 focus:text-blue-600">
      / breadcrumb path here
      </a>
    </Link>

  </>

  )
}
  

export default Breadcrumbs