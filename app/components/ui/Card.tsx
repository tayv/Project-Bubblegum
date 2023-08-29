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

type CardColor =
  | "none"
  | "standard"
  | "dark"
  | "light"
  | "white"
  | "black"
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
  light: "bg-white",
  dark: "bg-stone-800",
  white: "bg-white",
  black: "bg-gradient-to-r from-gray-700 via-gray-900 to-black",
  glass: " backdrop-blur-sm bg-white/60 drop-shadow",
  gradient1:
    "bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-blue-400 via-zinc-400 to-rose-300",
  gradient2: "bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100",
  gradient3:
    "bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-yellow-200 via-emerald-200 to-yellow-200",
  gradient4:
    "bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-indigo-200 via-slate-600 to-indigo-200",
  gradient5:
    "bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-100 to-gray-900",
  gradient6: "bg-gradient-to-br from-violet-300 via-voilet-100 to-rose-300",
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
