"use client"

import { FC, ReactNode } from "react"
import classNames from "classnames"

// TYPES ---
type LayoutContainerVariants = "none" | "flex" | "grid"
type LayoutContainerDirection = "none" | "row" | "col"
type LayoutContainerAlignmentX = "none" | "start" | "center" | "end"
type LayoutContainerAlignmentY = "none" | "top" | "center" | "bottom"
type LayoutContainerPadding =
  | "none"
  | "standard"
  | "small"
  | "medium"
  | "large"
  | "xlarge"
type LayoutContainerMargin =
  | "none"
  | "standard"
  | "small"
  | "medium"
  | "large"
  | "xlarge"
type LayoutContainerGap =
  | "none"
  | "standard"
  | "xsmall"
  | "small"
  | "medium"
  | "large"
  | "xlarge"

export type LayoutContainerProps = {
  variant?: LayoutContainerVariants
  direction?: LayoutContainerDirection
  alignX?: LayoutContainerAlignmentX
  alignY?: LayoutContainerAlignmentY
  padding?: LayoutContainerPadding
  margin?: LayoutContainerMargin
  gap?: LayoutContainerGap
  children: ReactNode
  className?: string
}

// DYNAMIC STYLE MAPS ---
const layoutContainerVariantsMap: { [key in LayoutContainerVariants]: string } =
  {
    none: "",
    flex: "flex",
    grid: "grid",
  }
const layoutContainerDirectionMap: {
  [key in LayoutContainerDirection]: string
} = {
  none: "",
  row: "flex-row",
  col: "flex-col",
}
const layoutContainerAlignmentXMap: {
  [key in LayoutContainerAlignmentX]: string
} = {
  none: "",
  start: "justify-start items-center",
  center: "justify-center items-center",
  end: "justify-end items-center",
}
const layoutContainerAlignmentYMap: {
  [key in LayoutContainerAlignmentY]: string
} = {
  none: "",
  top: "items-start",
  center: "items-center",
  bottom: "items-end",
}
const layoutContainerPaddingMap: { [key in LayoutContainerPadding]: string } = {
  none: "p-0",
  standard: "p-4",
  small: "p-2",
  medium: "p-6",
  large: "p-10",
  xlarge: "p-14",
}
const layoutContainerMarginMap: { [key in LayoutContainerMargin]: string } = {
  none: "m-0",
  standard: "m-4",
  small: "m-2",
  medium: "m-6",
  large: "m-10",
  xlarge: "m-14",
}
const layoutContainerGapMap: { [key in LayoutContainerGap]: string } = {
  none: "gap-0",
  standard: "gap-4",
  xsmall: "gap-1",
  small: "gap-2",
  medium: "gap-6",
  large: "gap-10",
  xlarge: "gap-14",
}

// MAIN FUNCTION ---
const LayoutContainer = ({
  variant = "none",
  direction = "none",
  alignX = "none",
  alignY = "none",
  padding = "standard",
  margin = "standard",
  gap = "none",
  className = "", // to pass custom one-off styling
  children,
  ...props
}: LayoutContainerProps) => {
  return (
    <div
      className={classNames([
        "",
        layoutContainerVariantsMap[variant],
        layoutContainerDirectionMap[direction],
        layoutContainerAlignmentXMap[alignX],
        layoutContainerAlignmentYMap[alignY],
        layoutContainerPaddingMap[padding],
        layoutContainerMarginMap[margin],
        layoutContainerGapMap[gap],
        className, // custom styling
      ])}
    >
      {children}
    </div>
  )
}

export default LayoutContainer
