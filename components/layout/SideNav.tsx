import { FC } from 'react'
import { useRouter } from 'next/router'
import classNames from 'classnames'

export type SideNavStyleProps = "selected" | "notSelected"
export type SideNavProps = {
  size?: "h1" | "h2" | "h3" | "h4",
  text?: string | number,
  type?: "primary" | "secondary" 
  selected?: boolean
}

const SideNav: FC<SideNavProps> = ({
    text,
    size, 
    ...props
}) => {

    const renderHeading = ({size, text, type}: SideNavProps) => {
      switch (size) {
        case "h1":
          return (type==="primary") && <h1 className="text-2xl pt-2 pb-2">{text}</h1> || (type==="secondary") && <h1 className="text-2xl pt-2 pb-2 text-slate-500">{text}</h1>
          
        case "h2":
          return (type==="primary") && <h2 className="text-xl pt-2 pb-2">{text} </h2> || (type==="secondary") && <h2 className="text-xl pt-2 pb-2 text-slate-500">{text} </h2> 
          
        case "h3":
          return (type==="primary") && <h3 className="text-l pt-2 pb-2">{text}</h3> || (type==="secondary") && <h3 className="text-l pt-2 pb-2 text-slate-500">{text}</h3>
          
        case "h4":
        return (type==="primary") && <h4 className="text-m pt-2 pb-2">{text}</h4> || (type==="secondary") && <h4 className="text-m pt-2 pb-2 text-slate-500">{text}</h4>
        
        default:
          return null;
    }
  }

  

  const sideNavStyleMap: {[key in SideNavStyleProps]: string} = {
    notSelected: "text-base text-gray-600 hover:text-gray-500", 
    selected: "cursor-default text-base text-blue-600 border-l-2 border-blue-300"
  }  

  const { asPath } = useRouter()
  
  // let setSelectStyle = (path) {
  //   let styleSelected =  (asPath === path) ? 'text-pink-600' : 'text-gray-600'
  //   console.log("asPath", styleSelected)
  //   return styleSelected
  // }

  const articleList = [
    {title: "Test Form", path: "/forms/quiz-template"},
    {title: "Date Pick", path: "/forms/date-pick-article"}, 
    {title: "Radio Buttons", path: "/forms/radios"}
  ]



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
            let isSelected: SideNavStyleProps = (asPath === article.path) ? "selected" : "notSelected"
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

      <div className="flex overflow-scroll py-2 px-1">
          <ul className="grow space-y-1">
            <li>
              <a href="/forms/quiz-template" 
               className={classNames([
                "cursor-pointer flex items-center p-1", // standard css styles go here
                sideNavStyleMap["selected"] 
              ]) } 
              >
                <span className="flex-1 ml-2 whitespace-nowrap">Test Form</span> 
              </a>
            </li>
            <li>
              <a href="/forms/radios" className="flex items-center p-1 text-base font-normal text-gray-900 hover:text-gray-500 hover:border-l-2 hover:border-gray-300">
                <span className="flex-1 ml-2 whitespace-nowrap">Radio Buttons</span> 
              </a>
            </li>
            <li>
              <a href="/forms/date-pick-article" className={classNames("flex items-center p-1 text-base text-gray-600 hover:text-gray-500", { 'text-pink-500': asPath === "/forms/date-pick-article" } )} >
                <span className="flex-1 ml-2 whitespace-nowrap">Date Pick</span> 
              </a>
            </li>
          </ul>
      </div>
    </nav>
  )
}

export default SideNav


// Need to use function expression to render a switch statement in react. 
  // See https://stackoverflow.com/questions/55237619/expression-expected-in-react-using-switch-statement  