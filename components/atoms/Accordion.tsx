import React, { FC, forwardRef } from 'react'
import classNames from 'classnames'

type AccordionProps = {
  children: React.ReactNode
  className?: string
}

const Accordion: FC<AccordionProps> = forwardRef<AccordionProps>( (
  {
    children,
    className = "",
  },
  ref
) => {
  return (
    <div className={classNames("accordion", className)}>
      {children}
    </div>
  )
})

export default Accordion