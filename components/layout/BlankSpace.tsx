import { FC } from 'react'
import classNames from 'classnames'

export type BlankSpaceProps = {
  size?: BlankSpaceSize
  className?: string
}

type BlankSpaceSize = "xsmall" | "small" | "medium" | "large" | "xlarge" | "xxlarge" | "none"
const blankSpaceSizeMap: {[key in BlankSpaceSize]: string} = {
  xsmall: "py-px", // prop specific css styles go here
  small: "py-1",
  medium: "py-2",
  large: "py-4",
  xlarge: "py-6",
  xxlarge: "py-8",
  none: "py-0" 
}  

const BlankSpace: FC<BlankSpaceProps> = ({size = "medium", className}) => {

  return (
    <div className={
      classNames([
        "py-8", // standard css styles 
     //   blankSpaceSizeMap[size], // dynamically set styling based on padding prop
      ])
    }>
    </div>
  )
}
  
export default BlankSpace
