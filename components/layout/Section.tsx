import { FC, ReactNode } from 'react'
import classNames from 'classnames'

export type SectionProps = {
  id: string
  style: SectionStyle
  customColor?: customColor
  children: ReactNode
  className?: string
}

export type SectionStyle = "standard" | "blank" | "colorBlue" | "colorRed" | "colorGreen" | "colorYellow" | "colorPurple" | "colorPink" | "colorBlack" | "colorCustom"
export type customColor = string

const sectionStyleMap: {[key in SectionStyle]: string} = {
  standard: "bg-white border border-sky-500/10 drop-shadow", // css styles go here
  blank: "bg-transparent",
  colorBlue: "bg-gradient-to-b from-blue-400 to-blue-300 drop-shadow",
  colorRed: "bg-gradient-to-b from-red-400 to-red-300 drop-shadow",
  colorGreen: "bg-gradient-to-b from-green-400 to-green-300 drop-shadow",
  colorYellow: "bg-gradient-to-b from-yellow-400 to-yellow-300 drop-shadow",
  colorPurple: "bg-gradient-to-b from-purple-400 to-purple-300 drop-shadow",
  colorPink: "bg-gradient-to-b from-pink-400 to-pink-300 drop-shadow",
  colorBlack: "text-gray-200 bg-gradient-to-b from-black to-black/60 drop-shadow",
  colorCustom: "",
}   

const Section = (
  {
    id, 
    style = "standard",
    className = "", // to pass custom one-off styling
    children
  }: SectionProps ) => {

  return (
    <section id={id} 
      className={
        classNames([
          "py-4 px-5 mt-4 rounded-3xl", // standard css styles go here. Peer is always required for label styling to work
          sectionStyleMap[style], // to dynamically set styling for different radio types
          className, // custom styling
        ])
      }>
     {children}
    </section>
  )
}

export default Section


