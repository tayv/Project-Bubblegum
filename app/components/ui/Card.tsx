"use client"

import { FC, ReactNode } from "react"
import classNames from "classnames"
import Link from "next/link"

type SharedCardProps = {
  children: ReactNode
  color?: CardColor
  cardPadding?: CardPadding
  width?: CardWidth
  padding?: CardPadding
  margin?: CardMargin
  corners?: CardCorners
  linkPath?: string
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
  standard: "bg-white hover:bg-gray-100 hover:ring-8 hover:ring-slate-200/40",
  light: "bg-white hover:slate-100  hover:ring-8 hover:ring-slate-100/40",
  dark: "bg-stone-800 hover:bg-stone-900 hover:mix-blend-multiply hover:ring-8 hover:ring-stone-900/40",
  white: "bg-white hover:bg-slate-100 hover:ring-8 hover:ring-slate-100/40",
  black: "bg-gradient-to-r from-gray-700 via-gray-900 to-black",
  glass: " backdrop-blur-sm bg-white/60 drop-shadow",
  gradient1:
    "bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-blue-400 via-zinc-400 to-rose-300 hover:mix-blend-multiply hover:ring-8 hover:ring-blue-200/40",
  gradient2:
    "bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100 hover:mix-blend-multiply hover:ring-8 hover:ring-indigo-200/40",
  gradient3:
    "bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-yellow-200 via-emerald-200 to-yellow-200 hover:mix-blend-multiply hover:ring-8 hover:ring-emerald-200/40 ",
  gradient4:
    "bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-indigo-200 via-slate-600 to-indigo-200 hover:mix-blend-multiply hover:ring-8 hover:ring-indigo-200/40",
  gradient5:
    "bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-100 to-gray-900 hover:mix-blend-multiply hover:ring-8 hover:ring-gray-200/40",
  gradient6:
    "bg-gradient-to-br from-violet-300 via-voilet-100 to-rose-300 hover:mix-blend-multiply hover:ring-8 hover:ring-violet-200/40",
}

type CardWidth = "none" | "standard" | "maxContent" | "fitContent"
const cardWidthMap: { [key in CardWidth]: string } = {
  none: "",
  standard: "w-full",
  maxContent: "w-max",
  fitContent: "w-fit",
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
  standard: "",
  small: "my-2",
  medium: "my-4",
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
  linkPath,
  variant = "div",
  color = "standard",
  width = "standard",
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
        cardWidthMap[width],
        cardPaddingMap[padding],
        cardMarginMap[margin],
        cardCornersMap[corners],
        className,
      ])}
    >
      {linkPath ? <Link href={linkPath}>{children}</Link> : children}
    </TagName>
  )
}

export default Card
