import { FC } from 'react'
import classNames from 'classnames'

export type DividerProps = {
  padding?: DividerPadding
  type?: "horizontal" | "vertical"
  color?: DividerColor
  size?: DividerSize
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

type DividerColor = "standard" | "darkmode" | "white" | "black" | "highlight"
const dividerColorMap: {[key in DividerColor]: string} = {
  standard: "bg-neutral-200",
  darkmode: "bg-neutral-100",
  highlight: "bg-lime-500",
  white: "bg-white",
  black: "bg-black"
}

type DividerSize = "standard" | "medium" | "large" | "xl"
const dividerSizeMap: {[key in DividerSize]: string} = {
  standard: "h-px",
  medium: "h-0.5",
  large: "h-1",
  xl: "h-2"
}

const Divider: FC<DividerProps> = ({
  type = "horizontal",
  color = "standard",
  size = "standard",
  padding = "standard",
  ...props
}) => {

  return (
     <div className={
      classNames([
        "flex w-full", // standard css styles 
        dividerPaddingMap[padding], // dynamically set styling based on padding prop
      ])
    }>
      <div className={
        classNames([
          "w-full rounded-full", 
          dividerColorMap[color], 
          dividerSizeMap[size], 
          props.className, // custom styling passed as prop
        ])
       }>
      </div>
     </div>
  )
}
  

export default Divider