"use client"

import React, { FC, forwardRef } from "react"
import classNames from "classnames"
import { ArrowRight, User2, Wand } from "lucide-react"

export type ButtonCTAProps = {
  formID?: string
  formHasErrors?: boolean // from RHF. Should be result of Object.keys(methods.formState.errors).length > 0
  actionError?: boolean // Typically used for onClick event failures
  type: "button" | "submit"
  variant?: ButtonCTAVariant
  buttonText?: string
  icon?: React.ReactNode | ButtonCTAIcon // User can also pass a custom icon so need ReactNode
  iconPosition?: "left" | "right"
  size?: ButtonCTASize
  isDisabled?: boolean
  errorMessage?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
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
  standardButton:
    "gap-2 font-normal text-base lg:text-md py-2 px-4 md:py-4 md:px-6",
  smallButton:
    "gap-1 font-normal text-sm lg:text-base py-px px-2 md:py-2 md:px-4",
  largeButton:
    "gap-3 font-medium text-xl lg:text-2xl py-3 px-5 md:py-6 md:px-8",
  standardText: "font-normal text-md lg:text-lg gap-1",
  largeText: "font-semibold text-xl lg:text-2xl gap-2",
}

type ButtonCTAVariant = "primary" | "secondary" | "text" | "delete" | "none"
// Make sure to follow this pattern or buttonStyles won't work: ${variant}Disabled`
const buttonCTAVariantMap: { [key in ButtonCTAVariant]: string } = {
  primary:
    "text-white bg-cta-500 hover:bg-cta-600 border-2 border-cta-500 shadow",
  secondary: "text-cta-500 border-2 border-cta-500 hover:bg-cta-100 shadow",
  text: "text-cta-500 border-none hover:text-cta-600",
  delete:
    "text-white bg-red-500 hover:bg-red-600 border-2 border-red-500 shadow",
  none: "",
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
    formHasErrors = false, //used for forms
    actionError = false, // used for onClick events like deleting
    variant = "primary",
    type = "button",
    size = "standardButton",
    icon = "standard",
    iconPosition = "left",
    buttonText = "Submit",
    errorMessage = "Your answers can't be submitted until you fix the errors above 👆",
    isDisabled = false,
    onClick,
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
    buttonCTAVariantMap[variant as ButtonCTAVariant],
    "disabled:grayscale disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none",
  ])

  return (
    <>
      <button
        form={formID}
        type={type}
        disabled={isDisabled || !!formHasErrors}
        onClick={onClick}
        className={buttonStyles}
        {...props}
      >
        {/* Standard variant uses an icon on left side */}
        <div
          className={classNames([
            "flex",
            iconPosition !== "left" || icon === "none" ? "hidden" : "block",
          ])}
        >
          {/* Allow user to pass in an icon or use existing one in map */}
          {typeof icon === "string"
            ? buttonCTAIconMap[icon as ButtonCTAIcon]
            : icon}
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
        {/* Display icon on the right side */}
        <div
          className={classNames([
            "flex",
            iconPosition !== "right" || icon === "none" ? "hidden" : "block",
          ])}
        >
          {typeof icon === "string"
            ? buttonCTAIconMap[icon as ButtonCTAIcon]
            : icon}
        </div>
      </button>

      {/* If type = submit and used inside a form need to provide a message if validation fails */}
      {formHasErrors || actionError ? (
        <div className="flex text-center">
          <p className="text-red-600">{errorMessage}</p>
        </div>
      ) : null}
    </>
  )
})

export default ButtonCTA
