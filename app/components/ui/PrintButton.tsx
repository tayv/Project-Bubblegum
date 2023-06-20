"use client"

import React, { FC, forwardRef, Ref } from "react"
import Product1Template from "@product1/product1Template.mdx"

export type PrintButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

const PrintButton = forwardRef<HTMLButtonElement, PrintButtonProps>(
  function SetRefPrintButton({ className, children }, ref) {
    return (
      <button
        ref={ref}
        className="inline-flex items-center justify-center gap-1 bg-sky-200 text-sky-700 hover:bg-sky-300 focus:shadow-sky-700  h-[35px] rounded-lg px-4 py-5 font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
        onClick={() => {
          window.print()
        }}
      >
        {children}
      </button>
    )
  }
)

export default PrintButton
