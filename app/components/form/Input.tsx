"use client";

import React, { FC, forwardRef } from "react";
import classNames from "classnames";

// OVERVIEW
// This atom form component provides styling and accessibility requirements. Validation, event handlers, etc.
// will use react-hook-form via a wrapper Field component to add interactivity

// TYPES
// This input component is intended to be used for all single line inputs (phone, numbers, text input)
export type InputSize = "standard" | "large";
export type InputState = "standard" | "error";
export type InputType = "text" | "email" | "tel" | "number";
export type InputProps = {
  name?: string;
  type?: InputType;
  size?: InputSize;
  className?: string;
  placeholder?: string;
  defaultValue?: string | number;
  onChange?: any;
  children?: React.ReactElement;
  hasError?: boolean;
};

// DYNAMIC STYLING
// Using maps so full Tailwind classes can be seen for purging https://tailwindcss.com/docs/optimizing-for-production#writing-purgeable-html
const inputSizeMap: { [key in InputSize]: string } = {
  standard: "py-2 px-3",
  large: "w-full py-3 px-4",
};

const inputFocusStyleMap: { [key in InputState]: string } = {
  standard: "focus:ring focus:ring-green-400",
  error: "ring-2 ring-inset ring-red-400 focus:ring-red-400 focus:ring",
};

// forwardRef so RHF can work properly in WrapperInput
const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  function setRefInput(
    {
      name = "default-name",
      type = "text",
      size = "standard",
      className = "", // to pass custom one-off styling
      children = null,
      hasError = false,
      ...props
    },
    ref
  ) {
    return (
      <div className="max-w-sm">
        <input
          ref={ref}
          id={name}
          name={name}
          type={type}
          className={classNames([
            "mt-1 block border border-gray-900 rounded-lg bg-white shadow-sm",
            inputSizeMap[size], // to dynamically set styling for different input sizes
            inputFocusStyleMap[hasError ? "error" : "standard"],
            className,
          ])}
          {...props}
        />
        {children} {/* For displaying warning message components, etc. */}
      </div>
    );
  }
);

export default Input;
