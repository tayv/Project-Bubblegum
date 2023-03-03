import { FC, ReactNode } from 'react'
import classNames from 'classnames'

export type HeadingProps = {
    children: ReactNode
    size: HeadingSize
    type?: HeadingType
    weight?: HeadingWeight
    id?: string // Optionally used for anchor links
    className?: string // For custom styling
}

type HeadingSize = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "override"
const headingSizeMap: {[key in HeadingSize]: string} = {
  h1: "text-4xl pb-2", 
  h2: "text-3xl pb-2",
  h3: "text-2xl pb-2",
  h4: "text-xl pb-2",
  h5: "text-lg pb-2",
  h6: "text-base pb-2",
  override: "" 
} 

type HeadingType = "primary" | "secondary" | "override"
const headingTypeMap: {[key in HeadingType]: string} = {
  primary: "text-gray-900",
  secondary: "text-gray-300",
  override: ""
}

type HeadingWeight = "xlight" | "light" | "normal" | "semibold" | "bold" | "black" | "override"
const headingWeightMap: {[key in HeadingWeight]: string} = {
  xlight: "font-extralight",
  light: "font-light",
  normal: "font-normal",
  semibold: "font-semibold",
  bold: "font-bold",
  black: "font-black",
  override: ""
}

const Heading: FC<HeadingProps> = ({
    size, 
    type = "primary",
    weight = "normal",
    className = "",
    children,
    ...props
}) => {

  return (

    <div className={
      classNames([
        "", // standard css styles (pre-wrap allows for line breaks in template literals)
        headingSizeMap[size], 
        headingTypeMap[type],
        headingWeightMap[weight],
        className // custom styling passed as prop
      ])
    }>
      {children}
    </div>
    
  )
}

export default Heading
