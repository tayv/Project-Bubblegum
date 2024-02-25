"use client"

import { FC } from "react"
import classNames from "classnames"
import * as AlertDialogRadix from "@radix-ui/react-alert-dialog"

export type ModalAlertProps = {
  children: React.ReactElement
  title?: string
  description?: string
  confirmText?: string
  cancelText?: string
  handleConfirmClick?: (event: React.SyntheticEvent) => void
  className?: string
}

const ModalAlert: FC<ModalAlertProps> = ({
  title = "Are you sure?",
  description = "This action can't be undone.",
  confirmText = "Continue",
  cancelText = "Cancel",
  handleConfirmClick,
  children,
  ...props
}) => {
  return (
    <AlertDialogRadix.Root>
      <AlertDialogRadix.Trigger asChild>{children}</AlertDialogRadix.Trigger>
      <AlertDialogRadix.Portal>
        <AlertDialogRadix.Overlay className="z-50 bg-black/40 data-[state=open]:animate-overlayShow fixed inset-0" />
        <AlertDialogRadix.Content className="z-50 data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <AlertDialogRadix.Title className="text-slate-500 m-0 text-[17px] font-medium">
            {title}
          </AlertDialogRadix.Title>
          <AlertDialogRadix.Description className="text-slate-400 mt-4 mb-5 text-[15px] leading-normal">
            {description}
          </AlertDialogRadix.Description>
          <div className="flex justify-end gap-[25px]">
            <AlertDialogRadix.Cancel asChild>
              <button className="text-slate-500 bg-slate-100 hover:bg-slate-100 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                {cancelText}
              </button>
            </AlertDialogRadix.Cancel>
            <AlertDialogRadix.Action asChild>
              <button
                onClick={handleConfirmClick}
                className="text-red-800 bg-red-300 hover:bg-red-200 focus:shadow-red-300 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]"
              >
                {confirmText}
              </button>
            </AlertDialogRadix.Action>
          </div>
        </AlertDialogRadix.Content>
      </AlertDialogRadix.Portal>
    </AlertDialogRadix.Root>
  )
}

export { ModalAlert }

// NOTES:
// If need to more control over modal state, use this:
// const [open, setOpen] = useState(false)
// <AlertDialogRadix.Root open={open} onOpenChange={() => (console.log("dialog opened"), setOpen(!open))}>
//   ...
// </AlertDialogRadix.Root>
