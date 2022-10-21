import { FC, ReactNode } from 'react'
import { InputProps } from '@components/atoms/input'

export type TipProps = {
    type: "example" | "standard",
    text: InputProps["tipText"] | InputProps["exampleText"],
    id?: string
}

const Tip: FC<TipProps> = ({
    type,
    text, 
    ...props
}) => {

    const renderTip = ({type, text}: TipProps) => {
      switch (type) {
        case "example":
          return <p className="text-xs font-light italic text-gray-500 mt-1">{text}</p> 
          
        case "standard":
          return <p className="text-sm font-light text-gray-500 mb-2">{text} </p> 
        
        default:
          return null;
    }
  }

  return (
    <>
      { renderTip({type, text, ...props}) }
    </>
  )
}

export default Tip


// Need to use function expression to render a switch statement in react. 
  // See https://stackoverflow.com/questions/55237619/expression-expected-in-react-using-switch-statement  
