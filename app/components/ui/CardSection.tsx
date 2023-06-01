"use client"

import { FC, ReactNode } from "react"
import classNames from "classnames"

export type SectionCardProps = {
  id: string
  variant?: SectionCardVariant
  customColor?: customColor
  children: ReactNode
  className?: string
}

export type SectionCardVariant =
  | "standard"
  | "secondary"
  | "blank"
  | "colorBlue"
  | "colorRed"
  | "colorGreen"
  | "colorYellow"
  | "colorPurple"
  | "colorPink"
  | "colorBlack"
  | "colorCustom"
export type customColor = string

const sectionVariantMap: { [key in SectionCardVariant]: string } = {
  standard: "bg-white drop-shadow-sm",
  secondary: "bg-white/50 drop-shadow-sm border border-white/60", 
  blank: "bg-transparent",
  colorBlue: "bg-gradient-to-b from-blue-400 to-blue-300 drop-shadow-sm",
  colorRed: "bg-gradient-to-b from-red-400 to-red-300 drop-shadow-sm",
  colorGreen: "bg-gradient-to-b from-green-400 to-green-300 drop-shadow-sm",
  colorYellow: "bg-gradient-to-b from-yellow-400 to-yellow-300 drop-shadow-sm",
  colorPurple: "bg-gradient-to-b from-purple-400 to-purple-300 drop-shadow-sm",
  colorPink: "bg-gradient-to-b from-pink-400 to-pink-300 drop-shadow-sm",
  colorBlack:
    "text-gray-200 bg-gradient-to-b from-black to-black/60 drop-shadow-sm",
  colorCustom: "",
}

const CardSection = ({
  id,
  variant = "standard",
  className = "", // to pass custom one-off styling
  children,
}: SectionCardProps) => {
  return (
    <section
      id={id}
      className={classNames([
        "px-6 py-5 my-4 rounded-3xl", // standard css Variants go here. Peer is always required for label styling to work
        sectionVariantMap[variant], // to dynamically set styling for different radio types
        className, // custom styling
      ])}
    >
      {children}
    </section>
  )
}

export default CardSection
