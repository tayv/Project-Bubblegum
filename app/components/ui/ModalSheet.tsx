"use client"
import React, { FC } from "react"
import * as DialogRadix from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import SubmitButton from "@components/form/ButtonCTA"
import Divider from "@ui/Divider"

// TYPES ---
export type ModalSheetProps = {
  isSheetOpen: boolean
  setIsSheetOpen: React.Dispatch<React.SetStateAction<boolean>>
  title: string
  description: string
  triggerText?: string
  triggerType?: "button" | "text"
  triggerComponent?: React.ReactElement
  confirmText?: string
  cancelText?: string | null // Pass null when only want to render one button such as a single "Close"
  handleConfirmClick?: (event: React.SyntheticEvent) => void
  handleOnOpenChange?: () => void
  children?: React.ReactElement | React.ReactElement[]
}

// HELPER FUNCTIONS ---

const ModalSheet: FC<ModalSheetProps> = ({
  triggerText,
  triggerType = "button",
  triggerComponent,
  title,
  isSheetOpen,
  setIsSheetOpen,
  description,
  confirmText = "Close",
  cancelText = "Cancel",
  handleConfirmClick,
  handleOnOpenChange,
  children,
  ...props
}) => {
  return (
    <DialogRadix.Root open={isSheetOpen} onOpenChange={handleOnOpenChange}>
      <DialogRadix.Trigger asChild>{triggerComponent}</DialogRadix.Trigger>

      <DialogRadix.Portal>
        <DialogRadix.Overlay className="z-50 bg-black data-[state=open]:animate-overlayShow fixed inset-0" />
        <DialogRadix.Content
          // Goal is to have modal centered for screens larger than tablets and sheet styling for mobile
          className="
          z-50 flex flex-col items-center fixed bottom-0 left-0 right-0 max-h-[75vh] h-full w-full max-w-4xl mx-auto overflow-y-auto
          bg-white shadow-md focus:outline-none :bottom-auto select-none rounded-t-[36px]
          lg:w-[80%] lg:top-1/2 lg:left-1/2 lg:right-1/2 lg:translate-x-[-50%] lg:translate-y-[-50%] 
          lg:rounded-[36px]
        "
        >
          <div className="flex flex-col items-center w-full">
            <Divider
              stroke="large"
              color="standard"
              padding="large"
              width="xsmall"
              className="lg:hidden"
            />
            <DialogRadix.Title className="hidden lg:block text-center text-slate-500 pt-3 pb-2 font-medium w-full border-b ">
              <div>{title}</div>
            </DialogRadix.Title>
            {/* <DialogRadix.Description className="text-slate-500 mt-[10px] mb-5 text-[15px] leading-normal">
            {description}
            </DialogRadix.Description> */}
          </div>
          <div className="flex justify-center">{children}</div>

          <DialogRadix.Close asChild>
            <button
              className="
            absolute top-[14px] right-[16px] inline-flex h-[25px] w-[25px] items-center justify-center
            rounded-full text-slate-400 hover:bg-slate-200 focus:shadow-sky-500 appearance-none focus:shadow-[0_0_0_2px] focus:outline-none
            lg:top-[13px] lg:right-[15px]"
              aria-label="Close"
            >
              <X />
            </button>
          </DialogRadix.Close>
        </DialogRadix.Content>
      </DialogRadix.Portal>
    </DialogRadix.Root>
  )
}
export default ModalSheet
