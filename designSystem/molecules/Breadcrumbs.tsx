import { FC, ReactNode } from "react"
import Link from "next/link"

export type Crumb = { 
  text: string 
  path: string 
}
export type BreadcrumbProps = {
  crumbs: Array<Crumb>
}

const renderCrumbs = ({crumbs}: BreadcrumbProps) => {
  return crumbs.map((crumb: Crumb, index: number) => (
    <span key={crumb.text}>
      <span className="text-sm text-gray-500 ml-1"> / </span>
      {index === crumbs.length - 1 ? (  // if last item in array then assume it's the current pg and render it without a link
        <span className="text-sm text-gray-500">{crumb.text}</span>
      ) : ( // else the breadcrumb text should link to a parent pg
        <Link
          href={`/${crumb.path.toLowerCase().replace(/ /g, "-")}`} // url best practice: insert leading / + convert path to lowercase + replace spaces with dashes
          className="inline no-underline text-sm text-pink-500 hover:decoration-dashed underline-offset-4 hover:text-pink-600 focus:text-pink-600"
        >
          {crumb.text}
        </Link>
      )}
    </span>
  ))
}

const Breadcrumbs: FC<BreadcrumbProps> = (props) => {
  return (
    <div className="flex flex-row flex-nowrap pb-3">{renderCrumbs(props)}</div>
  )
}

export default Breadcrumbs

// Documentation
  // The Breadcrumbs component shows the user where they are in the site hierarchy. It should be placed at the top of the page, below the header.

  // Example: 
    // const crumbs = [
    //   { text: "Home", path: "/" },
    //   { text: "Docs", path: "/docs" } // The current page should be placed last in the array so it renders without a link
    // ]