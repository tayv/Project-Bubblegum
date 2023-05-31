"use client";

import { Check, AlertCircle, AlertTriangle } from "lucide-react";
import { FC, ReactNode } from "react";
import classNames from "classnames";

export type InputMessageProps = {
  type?: InputMessageType;
  children: ReactNode;
  className?: string;
};

export type InputMessageType = "tip" | "example" | "valid" | "warn" | "error";

const inputMessageTypeMap: { [key in InputMessageType]: string } = {
  tip: "block text-sm font-light text-gray-500 mb-2",
  example: "block text-xs font-light italic text-gray-500 mt-1",
  valid: "block text-sm font-light text-green-600",
  warn: "block text-sm font-light text-orange-600",
  error: "block text-sm font-light text-red-600",
};

const iconMap: { [key in InputMessageType]: JSX.Element | null } = {
  tip: null,
  example: null,
  valid: <Check className="w-4 text-green-600" />,
  warn: <AlertCircle className="w-4 text-orange-400" />,
  error: <AlertTriangle className="w-4 text-red-600" />,
};

const InputMessage: FC<InputMessageProps> = ({
  type = "tip",
  children,
  ...props
}) => {
  return (
    <span
      className={classNames([
        "flex gap-1 items-center", // standard css styles go here.
        inputMessageTypeMap[type], // to dynamically set styling for different radio types
        props.className, // custom styling passed from parent
      ])}
    >
      {children && iconMap[type]}{" "}
      {/* only render icon if a message is displayed */}
      {children}
    </span>
  );
};

export default InputMessage;
