import { FC } from 'react'
import classNames from 'classnames'

export type DividerProps = {
  padding: "small" | "standard" | "large" | "none"
  type?: "horizontal" | "vertical"
  color?: "standard" | "white"
  width?: "small" | "standard" | "large"
  className?: string
}

const dividerStyleMap: {[key in DividerProps["padding"]]: string} = {
  small: "py-px", // prop specific css styles go here
  standard: "py-2",
  large: "py-4",
  none: "py-0" 
}  

const Divider: FC<DividerProps> = ({
  type = "horizontal",
  color = "standard",
  width = "standard",
  padding = "standard",
  ...props
}) => {

  return (
     <div className={
      classNames([
        "flex w-full", // standard css styles 
        dividerStyleMap[padding], // dynamically set styling based on padding prop
        props.className, // custom styling passed as prop
      ])
    }>
      <div className="bg-black h-0.5 w-full rounded-full"></div>
     </div>
  )
}
  

export default Divider