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

export type SectionCardProps = SharedCardProps & {
  id: string
  variant: "section" // Sections are used to structure input groups within Form. Need to enforce ids so that anchor links work as this is a key feature and high risk of bugs
}

type CardVariant = "section" | "div" | "aside" | "span"

type CardColor =
  | "none"
  | "standard"
  | "white"
  | "glass"
  | "gradient1"
  | "gradient2"

type CardPadding = "none" | "standard" | "small" | "medium" | "large"
type CardMargin = "none" | "standard" | "small" | "medium" | "large"
type CardCorners =
  | "none"
  | "standard"
  | "small"
  | "medium"
  | "large"
  | "xlarge"
  | "full"

const cardVariantMap: { [key in CardVariant]: string } = {
  section: "bg-white drop-shadow-sm",
  div: "bg-white/50 drop-shadow-sm border border-white/60",
  aside: "bg-transparent",
  span: "bg-gradient-to-b from-blue-400 to-blue-300 drop-shadow-sm",
}

const cardColorMap: { [key in CardColor]: string } = {
  none: "",
  standard: "bg-white",
  white: "bg-white",
  glass: "bg-white/40",
  gradient1: "",
  gradient2: "",
}

const cardPaddingMap: { [key in CardPadding]: string } = {
  none: "",
  standard: "px-6 py-5",
  small: "",
  medium: "",
  large: "",
}

const cardMarginMap: { [key in CardMargin]: string } = {
  none: "",
  standard: "my-4",
  small: "",
  medium: "",
  large: "",
}

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
        "rounded-3xl",
        cardVariantMap[variant],
        cardColorMap[color],
        cardPaddingMap[padding],
        cardMarginMap[margin],
        className,
      ])}
    >
      {children}
    </TagName>
  )
}

export default Card
