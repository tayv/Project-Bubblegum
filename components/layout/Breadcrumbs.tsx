import Link from 'next/link'

const Breadcrumbs = () => {

  return (

  <>
    <Link href="/">
      <a className="block p-2 pb-6 underline no-underline hover:decoration-dashed underline-offset-4 hover:text-blue-600 focus:text-blue-600">
      ⬅️ Go home
      </a>
    </Link>

  </>

  )
}
  

export default Breadcrumbs