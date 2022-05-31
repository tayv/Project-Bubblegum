import { FC } from 'react'

export type HeadingProps = {
  size: "h1" | "h2" | "h3" | "h4"
  text: string | number
  type?: "primary" | "secondary" // Add ability in future to reuse for multiple heading styles
}

const HeadingArticle: FC<HeadingProps> = (
  {
    text,
    size, 
    ...props
  }) => {

    const renderHeading = ({size, text}: HeadingProps) => {
      switch (size) {
        case "h1":
          return <h1 className="text-2xl pt-2 pb-2">{text}</h1>
          
        case "h2":
          return <h2 className="text-xl pt-2 pb-2">{text}</h2>
          
        case "h3":
          return <h3 className="text-l pt-2 pb-2">{text}</h3>
          
        case "h4":
        return <h4 className="text-m pt-2 pb-2">{text}</h4>
        
        default:
          return null;
    }
  }

  return (
    <>
      { renderHeading({size, text}) }

    </>
  )
}

export default HeadingArticle


// Need to use function expression to render a switch statement in react. 
  // See https://stackoverflow.com/questions/55237619/expression-expected-in-react-using-switch-statement  