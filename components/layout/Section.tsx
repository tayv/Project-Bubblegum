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
  standard: "bg-gray-100", // css styles go here
  blank: "bg-transparent",
  special: "bg-blue-100",
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
          "mt-4 p-4 rounded-xl drop-shadow", // standard css styles go here. Peer is always required for label styling to work
          sectionStyleMap[style], // to dynamically set styling for different radio types
          className, // prop
        ])
      }>
     {children}
    </section>
  )
}

export default Section


