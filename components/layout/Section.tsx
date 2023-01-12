import { FC, ReactNode } from 'react'
import classNames from 'classnames'

export type SectionProps = {
  id: string,
  style: SectionStyle
  children: ReactNode,
  className?: string
}

export type SectionStyle = "standard" | "blank" | "special"

const sectionStyleMap: {[key in SectionStyle]: string} = {
  standard: "py-4 px-5 backdrop-blur-lg bg-white/30 border border-white/30 drop-shadow", // css styles go here
  blank: "bg-transparent",
  special: "p-5 bg-blue-100 drop-shadow",
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
          "mt-4 rounded-3xl", // standard css styles go here. Peer is always required for label styling to work
          sectionStyleMap[style], // to dynamically set styling for different radio types
          className, // prop
        ])
      }>
     {children}
    </section>
  )
}

export default Section


