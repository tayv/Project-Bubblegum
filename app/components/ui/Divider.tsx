"use client"

import { FC } from "react"
import classNames from "classnames"

export type DividerProps = {
  padding?: DividerPadding
  variant?: "horizontal" | "vertical"
  color?: DividerColor
  stroke?: DividerStroke
  className?: string
}

type DividerPadding = "standard" | "medium" | "large" | "xl" | "xxl" | "none"
const dividerPaddingMap: { [key in DividerPadding]: string } = {
  standard: "my-px", // prop specific css styles go here
  medium: "my-2",
  large: "my-4",
  xl: "my-6",
  xxl: "my-8",
  none: "my-0",
}
const dividerVerticalPaddingMap: { [key in DividerPadding]: string } = {
  standard: "px-px", // prop specific css styles go here
  medium: "px-2",
  large: "px-4",
  xl: "px-6",
  xxl: "px-8",
  none: "px-0",
}

type DividerColor = "standard" | "darkmode" | "white" | "black" | "highlight"
const dividerColorMap: { [key in DividerColor]: string } = {
  standard: "bg-neutral-200",
  darkmode: "bg-neutral-100",
  highlight: "bg-lime-500",
  white: "bg-white",
  black: "bg-black",
}

type DividerStroke = "standard" | "medium" | "large" | "xl"
const dividerStrokeMap: { [key in DividerStroke]: string } = {
  standard: "h-px",
  medium: "h-0.5",
  large: "h-1",
  xl: "h-2",
}
const dividerVerticalStrokeMap: { [key in DividerStroke]: string } = {
  standard: "w-px",
  medium: "w-0.5",
  large: "w-1",
  xl: "w-2",
}

const Divider: FC<DividerProps> = ({
  variant = "horizontal",
  color = "standard",
  stroke = "standard",
  padding = "standard",
  ...props
}) => {
  return (
    <>
      {" "}
      {variant === "horizontal" ? (
        <div
          className={classNames([
            "w-full rounded-full",
            dividerColorMap[color],
            dividerStrokeMap[stroke],
            dividerPaddingMap[padding],
            props.className, // custom styling passed as prop
          ])}
        ></div>
      ) : (
        <div
          className={classNames([
            "h-full rounded-full",
            dividerColorMap[color],
            dividerVerticalStrokeMap[stroke],
            dividerVerticalPaddingMap[padding],
            props.className, // custom styling passed as prop
          ])}
        ></div>
      )}
    </>
  )
}

export default Divider

// Notes:
// Divider takes up the width of its parent container.
// If it's not appearing or sizing is off customize the width/height of parent div or wrap in a div
