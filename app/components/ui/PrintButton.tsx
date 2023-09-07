"use client"

import React, { FC, forwardRef, Ref } from "react"
import classNames from "classnames"

export type PrintButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

const PrintButton = forwardRef<HTMLButtonElement, PrintButtonProps>(
  function SetRefPrintButton({ onClick, className, children }, ref) {
    return (
      <button
        ref={ref}
        className={classNames([
          "flex flex-row items-center justify-center gap-2 max-w-xs bg-sky-200 text-sky-700",
          "hover:bg-sky-300 rounded-r-full h-full px-6 py-2 font-medium leading-none",
          "focus:ring-lime-500 focus:ring-2 focus:outline-none",
          "lg:rounded-full",
          className,
        ])}
        // onClick={(e) => (!!onClick ? onClick(e) : window.print())}
        onClick={onClick}
      >
        {children}
      </button>
    )
  }
)

export default PrintButton
