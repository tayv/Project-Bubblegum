"use client";
import React, { FC } from "react";
import * as DialogRadix from "@radix-ui/react-dialog";
import { X, Lock, ArrowDownToLine, Send, Pencil } from "lucide-react";

export type ModalViewDocProps = {
  triggerText: string;
  triggerType?: "button" | "text";
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string | null; // Pass null when only want to render one button such as a single "Close"
  onConfirmClick?: (event: React.SyntheticEvent) => void;
  children?: React.ReactElement | React.ReactElement[];
};

const ModalViewDoc: FC<ModalViewDocProps> = ({
  triggerText,
  triggerType = "button",
  title,
  description,
  children,
}) => (
  <DialogRadix.Root>
    <DialogRadix.Trigger asChild>
      {triggerType === "button" ? (
        <button className="items-center justify-center inline-flex h-10 px-4 font-medium text-slate-500 hover:bg-white rounded-lg leading-none outline-none focus:shadow-[0_0_0_2px] shadow-md focus:shadow-sky-400">
          {triggerText}
        </button>
      ) : (
        <a href="#" className="text-sky-500">
          {triggerText}
        </a>
      )}
    </DialogRadix.Trigger>
    <DialogRadix.Portal>
      <DialogRadix.Overlay className="bg-black data-[state=open]:animate-overlayShow fixed inset-0">
        <DialogRadix.Content className="select-none overflow-y-auto data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[100vh] w-[100vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-slate-100 p-6 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <div className="flex flex-row items-center">
            <DialogRadix.Title className="text-slate-500 text-base font-medium">
              {title}
            </DialogRadix.Title>
            <button className="inline-flex gap-1 items-center justify-center px-2  text-slate-500 hover:text-slate-400 font-xs leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
              <Lock className="w-4" /> Unlock
            </button>
          </div>

          <DialogRadix.Description className="text-slate-400 italic mt-px mb-4 text-sm leading-normal ">
            {description}
          </DialogRadix.Description>

          {/* -------- Document container starts here -------- */}
          <div className="overflow-y-auto max-h-[70vh] rounded-lg p-4 mb-2 shadow-lg bg-white/70">
            {children}
          </div>

          {/* -------- Sticky bottom section starts here -------- */}
          {/* flex-row-reverse needed so that focus is on the print button when re-opening */}
          <div className="flex flex-row-reverse justify-start gap-2 sticky bottom-0 bg-white p-4 rounded-xl drop-shadow">
            {/* Not wrapped in DialogRadix.Close because we want the preview to stay open unless user specially chooses to close or edit */}
            <button
              onClick={() => alert("Print the doc")}
              className="bg-sky-200 text-sky-700 hover:bg-sky-300 focus:shadow-sky-700 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
            >
              Print
            </button>

            <div className="flex w-full flex-wrap sm:overflow-x-auto bg-slate-100">
              <button className="text-slate-500 hover:text-slate-400 focus:shadow-green-700 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
                <ArrowDownToLine className="w-4" /> PDF Download
              </button>

              <button className="text-slate-500 hover:text-slate-400 focus:shadow-green-700 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
              <Send className="w-4" /> Share
              </button>

              <button className="text-slate-500 hover:text-slate-400 focus:shadow-green-700 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
                Lock
              </button>

              <DialogRadix.Close asChild>
                <button className="text-slate-500 hover:text-slate-400 focus:shadow-green-700 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
                 <Pencil className="w-4" /> Edit
                </button>
              </DialogRadix.Close>
            </div>
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
      </DialogRadix.Overlay>
    </DialogRadix.Portal>
  </DialogRadix.Root>
);

export default ModalViewDoc;
