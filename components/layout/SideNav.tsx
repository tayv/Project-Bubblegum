import { FC, ReactNode } from 'react'

export type SideNavProps = {
    size?: "h1" | "h2" | "h3" | "h4",
    text?: string | number,
    type?: "primary" | "secondary" 
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

  return (
    <>
      <aside className="w-64" aria-label="Sidebar">
        <div className="overflow-y-auto py-4 px-3">
            <ul className="space-y-2">
              <li>
                <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-300">
                  <span className="flex-1 ml-3 whitespace-nowrap">Button Overview</span> 
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-300">
                  <span className="flex-1 ml-3 whitespace-nowrap">Best Practices</span> 
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-300">
                  <span className="flex-1 ml-3 whitespace-nowrap">Code Snippets</span> 
                </a>
              </li>
            </ul>
        </div>
      </aside>
    </>
  )
}

export default SideNav


// Need to use function expression to render a switch statement in react. 
  // See https://stackoverflow.com/questions/55237619/expression-expected-in-react-using-switch-statement  