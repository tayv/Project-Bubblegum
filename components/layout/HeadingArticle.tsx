import { FC } from 'react'

export type HeadingProps = {
  text: string | number
  size: "h1" | "h2" | "h3" | "h4"
  type?: "primary" | "secondary" // Add ability in future to reuse for multiple heading styles
}

const HeadingArticle: FC<HeadingProps> = (
  {
    text,
    size, 
    ...props
  }) => {

  return (
    <>
      switch (size) {
          case size === "h1":
            return <h1 className="text-2xl">{text}</h1>
            
          case "h2":
            return <h2>{text}</h2>
            
          case "h3":
            return <h3>{text}</h3>
            
          case "h4":
          return <h4>{text}</h4>
          
          default:
            return null;
        }

    </>
  )
}

export default HeadingArticle