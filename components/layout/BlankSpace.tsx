import { FC } from 'react'
import classNames from 'classnames'

export type BlankSpaceProps = {
  size: "small" | "medium" | "large" | "xl" | "xxl"
  className?: string
}

type DividerPadding = "standard" | "medium" | "large" | "xl" | "xxl" | "none"
const dividerPaddingMap: {[key in DividerPadding]: string} = {
  standard: "py-px", // prop specific css styles go here
  medium: "py-2",
  large: "py-4",
  xl: "py-6",
  xxl: "py-8",
  none: "py-0" 
}  

type DividerSize = "standard" | "medium" | "large" | "xl"
const dividerSizeMap: {[key in DividerSize]: string} = {
  standard: "h-px",
  medium: "h-0.5",
  large: "h-1",
  xl: "h-2"
}

export default function BlankSpace(): FC<BlankSpaceProps> {

  return (
    
  )
}
  

