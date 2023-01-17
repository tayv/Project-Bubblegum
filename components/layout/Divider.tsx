import { FC } from 'react'
import classNames from 'classnames'

export type DividerProps = {
  padding?: DividerPadding
  type?: "horizontal" | "vertical"
  color?: DividerColor
  size?: DividerSize
  className?: string
}

type DividerPadding = "small" | "standard" | "large" | "none"
const dividerPaddingMap: {[key in DividerPadding]: string} = {
  small: "py-px", // prop specific css styles go here
  standard: "py-2",
  large: "py-4",
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

type DividerSize = "small" | "standard" | "large" | "xlarge"
const dividerSizeMap: {[key in DividerSize]: string} = {
  small: "h-px",
  standard: "h-0.5",
  large: "h-1",
  xlarge: "h-2"
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