import { FC, ReactNode } from 'react'

export type ParagraphProps = {
    size: "small" | "standard" | "large",
    text: string | number,
    type?: "primary" | "secondary", 
    id?: string
    children?: ReactNode
}

const Paragraph: FC<ParagraphProps> = ({
    text,
    size, 
    type = "primary",
    ...props
}) => {

    const renderParagraph = ({size, text, type, ...props}: ParagraphProps) => {

      switch (size) {
        case "small":
          return (type==="primary") && <p className="text-sm text-gray-600">{text}{props.children}</p> || (type==="secondary") && <p className="text-sm text-gray-300">{text}{props.children}</p>
          
        case "standard":
          return (type==="primary") && <p className= "text-lg text-gray-600">{text}{props.children}</p> || (type==="secondary") && <p className="text-gray-300">{text}{props.children}</p> 
          
        case "large":
          return (type==="primary") && <p className="text-xl text-gray-600">{text}{props.children}</p> || (type==="secondary") && <p className="text-lg text-gray-300">{text}{props.children}</p>
        
        default:
          return null
    }
  }

  return (
    <>
      { renderParagraph({size, text, type, ...props}) }
    </>
  )
}

export default Paragraph


// Need to use function expression to render a switch statement in react. 
  // See https://stackoverflow.com/questions/55237619/expression-expected-in-react-using-switch-statement  
