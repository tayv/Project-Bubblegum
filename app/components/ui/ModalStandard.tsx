"use client";
import React, { FC } from "react";
import * as DialogRadix from "@radix-ui/react-dialog";
import { X } from "lucide-react";

export type ModalStandardProps = {
  triggerText: string;
  triggerType?: "button" | "text";
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string | null; // Pass null when only want to render one button such as a single "Close"
  onConfirmClick?: (event: React.SyntheticEvent) => void;
  children?: React.ReactElement | React.ReactElement[];
};

const ModalStandard: FC<ModalStandardProps> = ({
  triggerText,
  triggerType = "button",
  title,
  description,
  confirmText = "Close",
  cancelText = "Cancel",
  onConfirmClick,
  children,
}) => (
  <DialogRadix.Root>
    <DialogRadix.Trigger asChild>
      {triggerType === "button" ? (
        <button className="items-center justify-center inline-flex h-10 px-4 font-medium text-slate-500 hover:bg-white rounded-lg leading-none outline-none focus:shadow-[0_0_0_2px] shadow focus:shadow-sky-400">
          {triggerText}
        </button>
      ) : (
        <a href="#" className="text-sky-500">
          {triggerText}
        </a>
      )}
    </DialogRadix.Trigger>
    <DialogRadix.Portal>
      <DialogRadix.Overlay className="bg-black data-[state=open]:animate-overlayShow fixed inset-0" />
      <DialogRadix.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
        <DialogRadix.Title className="text-slate-500 m-0 text-[17px] font-medium">
          {title}
        </DialogRadix.Title>
        <DialogRadix.Description className="text-slate-500 mt-[10px] mb-5 text-[15px] leading-normal">
          {description}
        </DialogRadix.Description>
        {children}
        <div className="mt-[25px] flex justify-end gap-2">
          <DialogRadix.Close asChild>
            {cancelText && (
              <button className="text-slate-500 hover:text-slate-400 focus:shadow-green-700 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
                {cancelText}
              </button>
            )}
          </DialogRadix.Close>
          <DialogRadix.Close asChild>
            <button
              onClick={onConfirmClick}
              className="bg-green-200 text-green-700 hover:bg-green-300 focus:shadow-green-700 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
            >
              {confirmText}
            </button>
          </DialogRadix.Close>
        </div>
        <DialogRadix.Close asChild>
          <button
            className="text-slate-400 hover:bg-slate-200 focus:shadow-sky-500 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
            aria-label="Close"
          >
            <X />
          </button>
        </DialogRadix.Close>
      </DialogRadix.Content>
    </DialogRadix.Portal>
  </DialogRadix.Root>
);

export default ModalStandard;
