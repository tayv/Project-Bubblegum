"use client"

import { FC, ReactNode } from "react"
import classNames from "classnames"

type SharedCardProps = {
  color?: CardColor
  cardPadding?: CardPadding
  padding?: CardPadding
  margin?: CardMargin
  corners?: CardCorners
  children: ReactNode
  className?: string
}

export type CardProps = SharedCardProps & {
  id?: string
  variant?: Exclude<CardVariant, "section">
}

// Sections are used to structure input groups within Form so has its own type
// Need to enforce ids so that anchor links work as this is a key feature and high risk of bugs
export type SectionCardProps = SharedCardProps & {
  id: string
  variant: "section"
}

type CardVariant = "section" | "div" | "aside" | "span"
const cardVariantMap: { [key in CardVariant]: string } = {
  section: "bg-white drop-shadow-sm",
  div: "bg-white/50 drop-shadow-sm border border-white/60",
  aside: "bg-transparent",
  span: "bg-gradient-to-b from-blue-400 to-blue-300 drop-shadow-sm",
}

type CardColor =
  | "none"
  | "standard"
  | "white"
  | "glass"
  | "gradient1"
  | "gradient2"
  | "gradient3"
  | "gradient4"
  | "gradient5"
  | "gradient6"
const cardColorMap: { [key in CardColor]: string } = {
  none: "",
  standard: "bg-white",
  white: "bg-white",
  glass: " backdrop-blur-sm bg-white/60 drop-shadow",
  gradient1:
    "conic-gradient(at 0% 0%, rgb(250, 204, 21), rgb(34, 211, 238), rgb(219, 234, 254))",
  gradient2:
    "linear-gradient(to right bottom, rgb(251, 146, 60), rgb(248, 113, 113), rgb(59, 130, 246))",
  gradient3:
    "conic-gradient(at 50% 0%, rgb(244, 114, 182), rgb(192, 132, 252), rgb(37, 99, 235))",
  gradient4:
    "radial-gradient(at 100% 0%, rgb(68, 64, 60), rgb(191, 219, 254), rgb(129, 140, 248))",
  gradient5:
    "linear-gradient(to right top, rgb(100, 116, 139), rgb(68, 64, 60), rgb(71, 85, 105))",
  gradient6:
    "linear-gradient(to right bottom, rgb(196, 181, 253), rgb(214, 211, 209), rgb(253, 164, 175))",
}

type CardPadding = "none" | "standard" | "small" | "medium" | "large"
const cardPaddingMap: { [key in CardPadding]: string } = {
  none: "",
  standard: "px-6 py-5",
  small: "px-2 py-1",
  medium: "px-4 py-3",
  large: "px-10 py-9",
}

type CardMargin = "none" | "standard" | "small" | "medium" | "large"
const cardMarginMap: { [key in CardMargin]: string } = {
  none: "",
  standard: "my-4",
  small: "my-1",
  medium: "my-2",
  large: "my-6",
}

type CardCorners =
  | "none"
  | "standard"
  | "small"
  | "medium"
  | "large"
  | "xlarge"
  | "full"
const cardCornersMap: { [key in CardCorners]: string } = {
  none: "",
  standard: "rounded-3xl",
  small: "rounded",
  medium: "rounded-md",
  large: "rounded-lg",
  xlarge: "rounded-xl",
  full: "rounded-full",
}

const Card = ({
  id,
  variant = "div",
  color = "standard",
  padding = "standard",
  margin = "standard",
  corners = "standard",
  className = "", // to pass custom one-off styling
  children,
}: CardProps | SectionCardProps) => {
  const TagName = variant as keyof JSX.IntrinsicElements
  return (
    <TagName
      id={id}
      className={classNames([
        "",
        cardVariantMap[variant],
        cardColorMap[color],
        cardPaddingMap[padding],
        cardMarginMap[margin],
        cardCornersMap[corners],
        className,
      ])}
    >
      {children}
    </TagName>
  )
}

export default Card
