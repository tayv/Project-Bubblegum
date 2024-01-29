"use client"

import { FC, ReactNode, forwardRef } from "react"
import classNames from "classnames"
import Link from "next/link"

type SharedCardProps = {
  children: ReactNode
  color?: CardColor
  interactionStyle?: CardInteractionStyle
  cardPadding?: CardPadding
  width?: CardWidth
  padding?: CardPadding
  margin?: CardMargin
  corners?: CardCorners
  linkPath?: string
  className?: string
  ref?: React.ForwardedRef<HTMLDivElement>
  [key: string]: any // for ...props
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
type CardInteractionStyle = "none" | "hover" | "all"

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
// Had issues with string interpolation and dynamic styles (likely due to tailwind's JIT engine).
// Dynamic styles based on interactionStyle prop so using a function instead of object map
const getCardColorMap = (
  interactionStyle: CardInteractionStyle
): { [key in CardColor]: string } => {
  const includeHoverStyle =
    interactionStyle === "hover" || interactionStyle === "all"
  const includeSelectStyle = interactionStyle === "all"

  return {
    none: "",
    standard: `bg-white ${
      includeHoverStyle && "hover:bg-slate-100 hover:ring-8 hover:ring-white/40"
    }`,
    light: `bg-white ${
      includeHoverStyle &&
      "hover:bg-slate-100 hover:ring-8 hover:ring-slate-100/40"
    }`,
    dark: `bg-stone-800 ${
      includeHoverStyle &&
      "hover:bg-stone-900 hover:mix-blend-multiply hover:ring-8 hover:ring-stone-900/40"
    }`,
    white: `bg-white ${
      includeHoverStyle &&
      "hover:bg-slate-100 hover:ring-8 hover:ring-slate-100/40"
    }`,
    black: `bg-gradient-to-r from-gray-700 via-gray-900 to-black ${
      includeHoverStyle &&
      "hover:bg-gray-900 hover:ring-8 hover:ring-gray-700/40"
    }`,
    glass: `backdrop-blur-sm bg-white/60 drop-shadow ${
      includeHoverStyle && "hover:bg-white/80 hover:ring-8 hover:ring-white/40"
    }`,
    gradient1: `bg-gradient-to-br from-orange-400 via-red-400 to-rose-400 ${
      includeHoverStyle &&
      "hover:mix-blend-multiply hover:ring-8 hover:ring-orange-200/40"
    }`,
    gradient2: `bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100 ${
      includeHoverStyle &&
      "hover:mix-blend-multiply hover:ring-8 hover:ring-indigo-200/40"
    }`,
    gradient3: `bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-emerald-200 via-yellow-200 to-emerald-200 ${
      includeHoverStyle &&
      "hover:mix-blend-multiply hover:ring-8 hover:ring-emerald-200/40"
    }`,
    gradient4: `bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-indigo-200 via-slate-600 to-indigo-200 ${
      includeHoverStyle &&
      "hover:mix-blend-multiply hover:ring-8 hover:ring-indigo-200/40"
    }`,
    gradient5: `bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-100 to-gray-900 ${
      includeHoverStyle &&
      "hover:mix-blend-multiply hover:ring-8 hover:ring-gray-200/40"
    }`,
    gradient6: `bg-gradient-to-br from-violet-300 via-voilet-100 to-rose-300 ${
      includeHoverStyle &&
      "hover:mix-blend-multiply hover:ring-8 hover:ring-violet-200/40"
    }`,
  }
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

const Card = forwardRef<HTMLDivElement, CardProps | SectionCardProps>(
  function setCardRef(
    {
      id,
      linkPath,
      variant = "div",
      color = "standard",
      interactionStyle = "none",
      width = "standard",
      padding = "standard",
      margin = "standard",
      corners = "standard",
      className = "", // to pass custom one-off styling
      children,
      ...props
    },
    ref
  ) {
    const TagName: CardVariant = variant

    // Get the card color map object since it uses dynamic styling based on interactionStyle prop
    const cardColorMap = getCardColorMap(interactionStyle)

    const cardContent = (
      <TagName
        ref={ref}
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
        {...props}
      >
        {children}
      </TagName>
    )
    return linkPath ? <Link href={linkPath}>{cardContent}</Link> : cardContent
  }
)

export default Card
