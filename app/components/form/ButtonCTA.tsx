"use client"

import React, { FC, forwardRef } from "react"
import classNames from "classnames"
import { User2, Wand } from "lucide-react"

export type ButtonCTAProps = {
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
type ButtonCTASize = "standard" | "small" | "large"
const buttonCTASizeMap: { [key in ButtonCTASize]: string } = {
  standard: "gap-2 font-medium text-base py-4 px-6",
  small: "gap-1 font-normal text-sm py-2 px-4",
  large: "gap-2 font-medium text-xl py-6 px-8",
}

type ButtonCTAVariant =
  | "primary"
  | "primaryDisabled"
  | "secondary"
  | "secondaryDisabled"
// Make sure to follow this pattern or buttonStyles won't work: ${variant}Disabled`
const buttonCTAVariantMap: { [key in ButtonCTAVariant]: string } = {
  primary: "text-white bg-sky-500 hover:bg-sky-600 shadow",
  primaryDisabled: "bg-neutral-300 hover:bg-neutral-400 text-neutral-500",
  secondary: "text-sky-500 border-2 border-sky-500 hover:bg-sky-100 shadow",
  secondaryDisabled: "text-neutral-300 border-2 border-neutral-300",
}

type ButtonCTAIcon = "standard" | "user" | "none"
const buttonCTAIconMap: { [key in ButtonCTAIcon]: React.ReactNode } = {
  standard: <Wand />,
  user: <User2 />,
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
    size = "standard",
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
    "rounded-full outline-none focus:shadow-[0_0_0_2px]  focus:shadow-sky-400",
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
    </>
  )
})

export default ButtonCTA
