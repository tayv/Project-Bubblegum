"use client"

import React, { FC, forwardRef } from "react"
import classNames from "classnames"
import { User2, Wand } from "lucide-react"

// TYPES
// This Submit Button component only intended for use within the Form component
type ButtonCTAVariant =
  | "primary"
  | "primaryDisabled"
  | "secondary"
  | "secondaryDisabled"
type ButtonCTAIcon = "standard" | "user" | "none"
type ButtonCTASize = "standard" | "large"
export type ButtonCTAProps = {
  formHasErrors: boolean // from RHF. Should be result of Object.keys(methods.formState.errors).length > 0
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

// DYNAMIC STYLING
// Using maps so full Tailwind classes can be seen for purging https://tailwindcss.com/docs/optimizing-for-production#writing-purgeable-html
const buttonCTASizeMap: { [key in ButtonCTASize]: string } = {
  standard: "py-2 px-3",
  large: "w-full py-3 px-4",
}
// Make sure to follow this pattern or buttonStyles won't work: ${variant}Disabled`
const buttonCTAVariantMap: { [key in ButtonCTAVariant]: string } = {
  primary: "text-white bg-sky-500 hover:bg-sky-600 shadow",
  primaryDisabled: "bg-neutral-300 hover:bg-neutral-400 text-neutral-500",
  secondary: "text-sky-500 border-2 border-sky-500 hover:bg-sky-100 shadow",
  secondaryDisabled: "text-neutral-300 border-2 border-neutral-300",
}
const buttonCTAIconMap: { [key in ButtonCTAIcon]: React.ReactNode } = {
  standard: <Wand />,
  user: <User2 />,
  none: null,
}

// forwardRef so RHF can work properly
const ButtonCTA: FC<ButtonCTAProps> = forwardRef<
  HTMLButtonElement,
  ButtonCTAProps
>(function setRefButtonCTA(
  {
    variant = "primary",
    type = "button",
    size = "standard",
    icon = "standard",
    buttonText = "Submit",
    formHasErrors = false,
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
    "flex flex-row items-center justify-center min-fit-content max-w-[17rem] gap-2 px-6 py-4",
    "font-medium rounded-full outline-none focus:shadow-[0_0_0_2px]  focus:shadow-sky-400",
    !!formHasErrors
      ? buttonCTAVariantMap[`${variant}Disabled` as ButtonCTAVariant]
      : buttonCTAVariantMap[variant as ButtonCTAVariant],
  ])

  return (
    <div className="flex flex-col gap-2 items-center">
      <button
        type={type}
        disabled={isDisabled}
        onClick={onClick}
        className={buttonStyles}
        {...props}
      >
        <div
          className={classNames([
            "flex w-5",
            icon === "none" ? "hidden" : "block",
          ])}
        >
          {buttonCTAIconMap[icon]}
        </div>
        <div
          className={classNames(["flex", icon === "none" ? "pr-0" : "pr-1"])} // padding needed to optically align content when icon is used
        >
          {buttonText}
        </div>
      </button>
      {formHasErrors ? (
        <div className="flex text-center">
          <p className="text-red-600">{errorMessage}</p>
        </div>
      ) : null}
    </div>
  )
})

export default ButtonCTA
