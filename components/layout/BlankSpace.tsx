import { FC } from 'react'
import classNames from 'classnames'

export type BlankSpaceProps = {
  xSize?: BlankSpaceSize
  ySize?: BlankSpaceSize
  className?: string
}

// Override prop adds flexibility by allowing custom padding size to be passed in
type BlankSpaceSize = "xsmall" | "small" | "medium" | "large" | "xlarge" | "xxlarge" | "none" | "override" 
const yBlankSpaceSizeMap: {[key in BlankSpaceSize]: string} = {
  xsmall: "py-px", // prop specific css styles go here
  small: "py-1",
  medium: "py-2",
  large: "py-4",
  xlarge: "py-6",
  xxlarge: "py-8",
  none: "py-0",
  override: ""
}  
const xBlankSpaceSizeMap: {[key in BlankSpaceSize]: string} = {
  xsmall: "px-px", // prop specific css styles go here
  small: "px-1",
  medium: "px-2",
  large: "px-4",
  xlarge: "px-6",
  xxlarge: "px-8",
  none: "px-0",
  override: "" 
}  

const BlankSpace: FC<BlankSpaceProps> = ({
  xSize = "none", 
  ySize = "small", 
  className = ""
}) => {

  return (
    <div className={
      classNames([
        "", // standard css styles 
        xBlankSpaceSizeMap[xSize], // dynamically set styling based on padding prop
        yBlankSpaceSizeMap[ySize],
        className // custom styling passed as prop
      ])
    }>
    </div>
  )
}
  
export default BlankSpace

