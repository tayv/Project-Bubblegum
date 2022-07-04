import { FC, ReactNode } from 'react'

export type ParagraphProps = {
    size: "small" | "standard" | "large",
    text: string | number,
    type?: "primary" | "secondary", 
    id?: string
}

const Paragraph: FC<ParagraphProps> = ({
    text,
    size, 
    ...props
}) => {

    const renderParagraph = ({size, text, type}: ParagraphProps) => {
      switch (size) {
        case "small":
          return (type==="primary") && <p className="text-sm mt-2 text-gray-600">{text}</p> || (type==="secondary") && <p className="text-sm mt-2 text-gray-300">{text}</p>
          
        case "standard":
          return (type==="primary") && <p className= "text-lg mt-2 text-gray-600">{text} </p> || (type==="secondary") && <p className="mt-2 text-gray-300">{text} </p> 
          
        case "large":
          return (type==="primary") && <p className="mt-2 text-xl text-gray-600">{text}</p> || (type==="secondary") && <p className="mt-2 text-lg text-gray-300">{text}</p>
        
        default:
          return null;
    }
  }

  return (
    <>
      { renderParagraph({size, text, ...props}) }
    </>
  )
}

export default Paragraph


// Need to use function expression to render a switch statement in react. 
  // See https://stackoverflow.com/questions/55237619/expression-expected-in-react-using-switch-statement  
