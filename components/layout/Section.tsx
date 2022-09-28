import { FC, ReactNode } from 'react'


const Section = ({children}: any) => {

  return (
    <section className="mt-4 p-4 bg-gray-100">
     {children}
    </section>
  )
}

export default Section


