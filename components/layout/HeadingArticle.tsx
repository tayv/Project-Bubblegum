import { FC, ReactNode } from 'react'

export type HeadingProps = {
    size: "h1" | "h2" | "h3" | "h4",
    text: string | number,
    type?: "primary" | "secondary" 
}

const HeadingArticle: FC<HeadingProps> = ({
    text,
    size, 
    ...props
}) => {

    const renderHeading = ({size, text, type}: HeadingProps) => {
      switch (size) {
        case "h1":
          return (type==="primary") && <h1 className="text-4xl pt-4 pb-2">{text}</h1> || (type==="secondary") && <h1 className="text-4xl pt-4 pb-2 text-slate-500">{text}</h1>
          
        case "h2":
          return (type==="primary") && <h2 className="text-2xl pt-4 pb-2">{text} </h2> || (type==="secondary") && <h2 className="text-2xl pt-4 pb-2 text-slate-500">{text} </h2> 
          
        case "h3":
          return (type==="primary") && <h3 className="text-xl pt-4 pb-2">{text}</h3> || (type==="secondary") && <h3 className="text-xl pt-4 pb-2 text-slate-500">{text}</h3>
          
        case "h4":
        return (type==="primary") && <h4 className="text-l pt-4 pb-2">{text}</h4> || (type==="secondary") && <h4 className="text-l pt-4 pb-2 text-slate-500">{text}</h4>
        
        default:
          return null;
    }
  }

  return (
    <>
      { renderHeading({size, text, ...props}) }
    </>
  )
}

export default HeadingArticle


// Need to use function expression to render a switch statement in react. 
  // See https://stackoverflow.com/questions/55237619/expression-expected-in-react-using-switch-statement  