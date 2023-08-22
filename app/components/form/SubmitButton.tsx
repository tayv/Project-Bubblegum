"use client"

import React, { FC, forwardRef } from "react"
import classNames from "classnames"
import { Wand } from "lucide-react"

// TYPES
// This Submit Button component only intended for use within the Form component
type SubmitButtonIcon = "standard" | "none"
type SubmitButtonSize = "standard" | "large"
export type SubmitButtonProps = {
  formHasErrors: boolean // from RHF. Should be Object.keys(methods.formState.errors).length > 0
  buttonText?: string
  icon?: SubmitButtonIcon
  size?: SubmitButtonSize
  className?: string
  onClick?: any
  children?: React.ReactElement
}

// DYNAMIC STYLING
// Using maps so full Tailwind classes can be seen for purging https://tailwindcss.com/docs/optimizing-for-production#writing-purgeable-html
const submitButtonSizeMap: { [key in SubmitButtonSize]: string } = {
  standard: "py-2 px-3",
  large: "w-full py-3 px-4",
}
const submitButtonIconMap: { [key in SubmitButtonIcon]: React.ReactNode } = {
  standard: <Wand />,
  none: null,
}

// forwardRef so RHF can work properly
const SubmitButton: FC<SubmitButtonProps> = forwardRef<
  HTMLButtonElement,
  SubmitButtonProps
>(function setRefSubmitButton(
  {
    size = "standard",
    icon = "standard",
    buttonText = "Submit Answers",
    formHasErrors = false,
    className = "", // to pass custom one-off styling
    ...props
  },
  ref
) {
  return (
    <div className="flex flex-col gap-2 items-center">
      <button
        type="submit"
        className={classNames([
          "flex flex-row items-center justify-center min-fit-content max-w-[17rem] gap-2 px-6 py-4 font-medium hover:bg-white rounded-full outline-none focus:shadow-[0_0_0_2px] shadow focus:shadow-sky-400",
          !!formHasErrors
            ? "bg-neutral-300 hover:bg-neutral-400 text-neutral-500"
            : "text-white bg-sky-500 hover:bg-sky-600",
        ])}
      >
        <div
          className={classNames([
            "flex w-5",
            icon === "none" ? "hidden" : "block",
          ])}
        >
          {submitButtonIconMap[icon]}
        </div>
        <div
          className={classNames(["flex", icon === "none" ? "pr-0" : "pr-1"])} // padding needed to optically align content when icon is used
        >
          {buttonText}
        </div>
      </button>
      {formHasErrors ? (
        <div className="flex text-center">
          <p className="text-red-600">
            The form can&apos;t be submitted until you fix the errors above.
          </p>
        </div>
      ) : null}
    </div>
  )
})

export default SubmitButton
