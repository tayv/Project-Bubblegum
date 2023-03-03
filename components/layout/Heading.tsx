import { FC, ReactNode } from 'react'
import classNames from 'classnames'

export type HeadingProps = {
    children: ReactNode
    size: HeadingSize
    type?: HeadingType
    weight?: HeadingWeight
    padding?: HeadingPadding
    id?: string // Optionally used for anchor links
    className?: string // For custom styling
}

type HeadingSize = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "override"
const headingSizeMap: {[key in HeadingSize]: string} = {
  h1: "text-4xl", 
  h2: "text-2xl",
  h3: "text-xl",
  h4: "text-lg",
  h5: "text-base",
  h6: "text-sm",
  override: "" 
} 

type HeadingType = "primary" | "secondary" | "override"
const headingTypeMap: {[key in HeadingType]: string} = {
  primary: "text-gray-900",
  secondary: "text-gray-500",
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

type HeadingPadding = "none" | "small" | "standard" | "large" | "override"
const headingPaddingMap: {[key in HeadingPadding]: string} = {
  "none": "pb-0",
  "small": "pb-1",
  "standard": "pb-4",
  "large": "pb-4",
  "override": ""
}

const Heading: FC<HeadingProps> = ({
    size, 
    type = "primary",
    weight = "normal",
    padding = "standard",
    className = "",
    children,
    ...props
}) => {

  // Dynamically set the heading tag based on the size prop. Use TS casting for type checking. See: https://stackoverflow.com/questions/33471880/dynamic-tag-name-in-react-jsx
  const CustomHTag = `h${size}` as keyof JSX.IntrinsicElements

  return (

    <CustomHTag id={props.id} className={
      classNames([
        "", // standard css styles (pre-wrap allows for line breaks in template literals)
        headingSizeMap[size], 
        headingTypeMap[type],
        headingWeightMap[weight],
        headingPaddingMap[padding],
        className // custom styling passed as prop
      ])
    }>
      {children}
    </CustomHTag>

  )
}

export default Heading
