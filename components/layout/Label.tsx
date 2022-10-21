import { FC, ReactNode } from 'react'

export type LabelProps = {
    type: "standard" | "large",
    label: string,
    children?: ReactNode
}

const Label: FC<LabelProps> = ({
    type,
    label, 
    ...props
}) => {

    const renderLabel = ({type, label}: LabelProps) => {
      switch (type) {
        case "standard":
          return <label htmlFor="text" className="block text-md font-bold text-gray-900">{label}{props.children}</label>
          
        case "large":
          return <label htmlFor="text" className="block text-md font-bold text-gray-900">{label}{props.children}</label>
        
        default:
          return null;
    }
  }

  return (
    <>
      { renderLabel({type, label, ...props}) }
    </>
  )
}

export default Label


// Need to use function expression to render a switch statement in react. 
  // See https://stackoverflow.com/questions/55237619/expression-expected-in-react-using-switch-statement  
