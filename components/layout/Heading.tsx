import { FC, ReactNode } from 'react'

export type HeadingProps = {
    size: "h1" | "h2" | "h3" | "h4",
    text: string | number,
    type?: "primary" | "secondary", 
    id?: string
}

const Heading: FC<HeadingProps> = ({
    text,
    size, 
    ...props
}) => {

    const renderHeading = ({size, text, type, id}: HeadingProps) => {
      switch (size) {
        case "h1":
          return (type==="primary") && <h1 id={id} className="text-4xl font-bold pb-2 divide-y">{text}</h1> || (type==="secondary") && <h1 id={id} className="text-4xl font-bold pb-2 text-slate-500">{text}</h1>
          
        case "h2":
          return (type==="primary") && <h2 id={id} className="text-2xl font-bold pb-2">{text} </h2> || (type==="secondary") && <h2 id={id} className="text-2xl font-bold pb-2 text-slate-500">{text} </h2> 
          
        case "h3":
          return (type==="primary") && <h3 id={id} className="text-xl font-bold pb-2">{text}</h3> || (type==="secondary") && <h3 id={id} className="text-xl font-bold pb-2 text-slate-500">{text}</h3>
          
        case "h4":
        return (type==="primary") && <h4 id={id} className="text-lg font-bold pb-2">{text}</h4> || (type==="secondary") && <h4 id={id} className="text-lg font-bold pb-2 text-slate-500">{text}</h4>
        
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

export default Heading


// Need to use function expression to render a switch statement in react. 
  // See https://stackoverflow.com/questions/55237619/expression-expected-in-react-using-switch-statement  
// Headings use html #id for side navigation anchor points