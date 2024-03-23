"use client"

import { FC, ReactNode } from "react"
import classNames from "classnames"

// TYPES ---
export type LayoutContainerProps = {
  tag?: "div" | "span" | "section" | "aside"
  variant: LayoutContainerVariants
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
type LayoutContainerVariants = "standard" | "flex" | "grid"
const layoutContainerVariantsMap: { [key in LayoutContainerVariants]: string } =
  {
    standard: "",
    flex: "flex",
    grid: "grid",
  }

type LayoutContainerDirection = "none" | "row" | "col"
const layoutContainerDirectionMap: {
  [key in LayoutContainerDirection]: string
} = {
  none: "",
  row: "flex-row",
  col: "flex-col",
}

type LayoutContainerAlignmentX = "none" | "start" | "center" | "end"
const layoutContainerAlignmentXMap: {
  [key in LayoutContainerAlignmentX]: string
} = {
  none: "",
  start: "justify-start items-center",
  center: "justify-center items-center",
  end: "justify-end items-center",
}

type LayoutContainerAlignmentY = "none" | "top" | "center" | "bottom"
const layoutContainerAlignmentYMap: {
  [key in LayoutContainerAlignmentY]: string
} = {
  none: "",
  top: "items-start",
  center: "items-center",
  bottom: "items-end",
}

type LayoutContainerPadding =
  | "none"
  | "standard"
  | "small"
  | "medium"
  | "large"
  | "xlarge"
  | "xStandard"
  | "xSmall"
  | "xMedium"
  | "xLarge"
  | "xXlarge"
  | "yStandard"
  | "ySmall"
  | "yMedium"
  | "yLarge"
  | "yXlarge"
const layoutContainerPaddingMap: { [key in LayoutContainerPadding]: string } = {
  none: "p-0",
  standard: "p-4",
  small: "p-2",
  medium: "p-6",
  large: "p-10",
  xlarge: "px-14",
  xStandard: "px-4",
  xSmall: "px-2",
  xMedium: "px-6",
  xLarge: "px-10",
  xXlarge: "px-14",
  yStandard: "py-4",
  ySmall: "py-2",
  yMedium: "py-6",
  yLarge: "py-10",
  yXlarge: "py-14",
}

type LayoutContainerMargin =
  | "none"
  | "standard"
  | "small"
  | "medium"
  | "large"
  | "xlarge"
const layoutContainerMarginMap: { [key in LayoutContainerMargin]: string } = {
  none: "m-0",
  standard: "m-4",
  small: "m-2",
  medium: "m-6",
  large: "m-10",
  xlarge: "m-14",
}

type LayoutContainerGap =
  | "none"
  | "standard"
  | "xsmall"
  | "small"
  | "medium"
  | "large"
  | "xlarge"
const layoutContainerGapMap: { [key in LayoutContainerGap]: string } = {
  none: "gap-0",
  standard: "gap-4",
  xsmall: "gap-1",
  small: "gap-2",
  medium: "gap-5 lg:gap-6",
  large: "gap-8 lg:gap-10",
  xlarge: "gap-12 lg:gap-14",
}

// MAIN FUNCTION ---
const LayoutContainer = ({
  variant = "standard",
  tag = "div",
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
  const TagName = tag as keyof JSX.IntrinsicElements
  return (
    <TagName
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
    </TagName>
  )
}

export { LayoutContainer }
