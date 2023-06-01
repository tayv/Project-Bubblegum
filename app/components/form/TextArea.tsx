"use client";

import React, {
  FC,
  ChangeEvent,
  forwardRef,
  InputHTMLAttributes,
  DetailedHTMLProps,
} from "react";
import classNames from "classnames";
import { Control } from "react-hook-form";
import { InputState } from "@form/Input";

// TYPES
export type TextAreaSize = "standard" | "large";
export type TextAreaProps = {
  name: string;
  size?: TextAreaSize;
  className?: string;
  placeholder?: string;
  defaultValue?: string | number;
  onChange?: any;
  hasError?: boolean;

  // RHF prop types
  register?: any; // react-hook-form: to register an input (not needed if using Controller)
  rules?: Record<string, any>; // react-hook-form: validation rules. Any object so used generic Record type.
  control?: Control; // react-hook-form: used by Controller. https://react-hook-form.com/ts/#Control
};

// DYNAMIC STYLING
// Using maps so full Tailwind classes can be seen for purging https://tailwindcss.com/docs/optimizing-for-production#writing-purgeable-html
const textAreaSizeMap: { [key in TextAreaSize]: string } = {
  standard: "py-2 px-3",
  large: "w-full py-3 px-4",
};

const inputFocusStyleMap: { [key in InputState]: string } = {
  standard: "focus:ring focus:ring-green-400",
  error: "ring-2 ring-inset ring-red-400 focus:ring-red-400 focus:ring",
};

// forwardRef so RHF can work properly in WrapperInput
export const TextArea: FC<TextAreaProps> = forwardRef<
  HTMLTextAreaElement,
  TextAreaProps
>(function setRefTextArea(
  {
    name,
    size = "standard",
    className = "", // to pass custom one-off styling
    hasError = false,
    ...props
  },
  ref
) {
  return (
    <div className="max-w-sm">
      <textarea
        ref={ref}
        id={name}
        name={name}
        // aria-label={label}
        className={classNames([
          "mt-1 border border-gray-900 rounded-lg bg-white shadow-sm",
          textAreaSizeMap[size], // to dynamically set styling for different sizes
          inputFocusStyleMap[hasError ? "error" : "standard"],
          className,
        ])}
        {...props}
      />
    </div>
  );
});

export default TextArea;
