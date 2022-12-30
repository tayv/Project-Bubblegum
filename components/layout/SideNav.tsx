import { FC } from 'react'
import { useRouter } from 'next/router'
import classNames from 'classnames'

type SideNavStyle = "selected" | "notSelected"
type ArticleList = {title: string, path: string}[] // This is the list of articles that will be displayed in the side nav
export type SideNavProps = { articleList: ArticleList }

const SideNav: FC<SideNavProps> = ({
  articleList,
  ...props
}) => {

  const { asPath } = useRouter() // This hook returns the current url path

  // The styles for the side nav are set here
  const sideNavStyleMap: {[key in SideNavStyle]: string} = {
    notSelected: "text-base text-gray-600 hover:text-gray-500", 
    selected: "cursor-default text-base text-fuchsia-600 border-l-2 border-fuchsia-600"
  } 

  return (
    <nav className="flex flex-col w-1/6 min-w-fit pt-2 border-2 border-r-slate-100 bg-gray-100/50" aria-label="Sidebar">
      <div>
        <a href="/" className={classNames("flex items-center p-1 text-base font-semibold text-gray-600 hover:text-gray-500 ")}>
          <span className="flex-1 ml-3 whitespace-nowrap">🏠  Home</span> 
        </a>
      </div>
      
      <div className="flex overflow-scroll py-2 px-1">
        <ul className="grow space-y-1">
        { 
          // The side nav is made up of these list items
          articleList.map((article) => {
            // Used by classnames to set the correct css style
            let isSelected: SideNavStyle = (asPath === article.path) ? "selected" : "notSelected"
            return (
              <li key={article.title.toString()}>
                <a 
                  href={article.path}  
                  className={classNames([
                    "cursor-pointer flex items-center p-1", // standard css styles go here
                    sideNavStyleMap[isSelected] 
                  ]) } 
                >
                  <span className="flex-1 ml-2 whitespace-nowrap">{article.title}</span>
                </a>
              </li>  
            ) 
          } )
        }
        </ul>
       </div>
    </nav>
  )
}

export default SideNav


