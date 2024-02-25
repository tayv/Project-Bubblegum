"use client"

import React, { FC, forwardRef } from "react"
import classNames from "classnames"
import { ArrowRight, User2, Wand } from "lucide-react"

type ButtonCTAProps = {
  formID?: string
  formHasErrors?: boolean // from RHF. Should be result of Object.keys(methods.formState.errors).length > 0
  type: "button" | "submit"
  variant?: ButtonCTAVariant
  buttonText?: string
  icon?: ButtonCTAIcon
  size?: ButtonCTASize
  isDisabled?: boolean
  errorMessage?: string
  onClick?: any
  children?: React.ReactElement
  className?: string // to pass custom one-off styling
}

// Using maps so full Tailwind classes can be seen for purging https://tailwindcss.com/docs/optimizing-for-production#writing-purgeable-html
type ButtonCTASize =
  | "standardButton"
  | "smallButton"
  | "largeButton"
  | "standardText"
  | "largeText"
const buttonCTASizeMap: { [key in ButtonCTASize]: string } = {
  standardButton: "gap-2 font-normal text-base lg:text-md py-4 px-6",
  smallButton: "gap-1 font-normal text-sm lg:text-base py-2 px-4",
  largeButton: "gap-3 font-medium text-xl lg:text-2xl py-6 px-8",
  standardText: "font-semibold text-md lg:text-lg gap-1",
  largeText: "font-semibold text-xl lg:text-2xl gap-2",
}

type ButtonCTAVariant =
  | "primary"
  | "primaryDisabled"
  | "secondary"
  | "secondaryDisabled"
  | "text"
// Make sure to follow this pattern or buttonStyles won't work: ${variant}Disabled`
const buttonCTAVariantMap: { [key in ButtonCTAVariant]: string } = {
  primary: "text-white bg-cta-500 hover:bg-cta-600 shadow",
  primaryDisabled: "bg-neutral-300 hover:bg-neutral-400 text-neutral-500",
  secondary: "text-cta-500 border-2 border-cta-500 hover:bg-cta-100 shadow",
  secondaryDisabled: "text-neutral-300 border-2 border-neutral-300",
  text: "text-cta-500 border-none hover:text-cta-600",
}

type ButtonCTAIcon = "none" | "standard" | "user" | "arrowRight"
const buttonCTAIconMap: { [key in ButtonCTAIcon]: React.ReactNode } = {
  standard: <Wand />,
  user: <User2 />,
  arrowRight: <ArrowRight />,
  none: null,
}

// MAIN FUNCTION
const ButtonCTA: FC<ButtonCTAProps> = forwardRef<
  // forwardRef used so RHF can work properly
  HTMLButtonElement,
  ButtonCTAProps
>(function setRefButtonCTA(
  {
    formID,
    formHasErrors = false,
    variant = "primary",
    type = "button",
    size = "standardButton",
    icon = "standard",
    buttonText = "Submit",
    errorMessage = "Your answers can't be submitted until you fix the errors above 👆",
    isDisabled = false,
    onClick = null,
    className = "",
    ...props
  },
  ref
) {
  // Dynamically render correct button variant styling
  const buttonStyles = classNames([
    "flex flex-row items-center justify-center min-fit-content max-w-[17rem] ",
    "rounded-full outline-none focus:shadow-[0_0_0_2px] focus:shadow-cta-400",
    className, // custom prop styles
    buttonCTASizeMap[size],
    !!formHasErrors
      ? buttonCTAVariantMap[`${variant}Disabled` as ButtonCTAVariant]
      : buttonCTAVariantMap[variant as ButtonCTAVariant],
  ])

  return (
    <>
      <button
        form={formID}
        type={type}
        disabled={isDisabled}
        onClick={onClick}
        className={buttonStyles}
        {...props}
      >
        {/* Standard variant uses an icon on left side */}
        <div
          className={classNames([
            "flex",
            variant === "text" || icon === "none" ? "hidden" : "block",
          ])}
        >
          {buttonCTAIconMap[icon]}
        </div>
        {/* Need conditional padding in case CTA has no icon */}
        <div
          className={classNames([
            "flex",
            variant === "text" || icon === "none" ? "pr-0" : "pr-1",
          ])} // padding needed to optically align content when icon is used inside a button with a border
        >
          {buttonText}
        </div>
        {/* Text only CTAs have an icon on the right side */}
        <div
          className={classNames([
            "flex",
            variant !== "text" || icon === "none" ? "hidden" : "block",
          ])}
        >
          {buttonCTAIconMap[icon]}
        </div>
      </button>

      {/* If type = submit and used inside a form need to provide a message if validation fails */}
      {formHasErrors ? (
        <div className="flex text-center">
          <p className="text-red-600">{errorMessage}</p>
        </div>
      ) : null}
    </>
  )
})

export { ButtonCTA }
export type { ButtonCTAProps }
