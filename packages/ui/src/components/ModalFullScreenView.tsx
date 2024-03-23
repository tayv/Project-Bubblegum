"use client"
import { FC } from "react"
import * as DialogRadix from "@radix-ui/react-dialog"
import { Maximize2, Minimize2 } from "lucide-react"

export type ModalFullScreenViewProps = {
  title?: string
  description?: string
  confirmText?: string
  cancelText?: string | null // Pass null when only want to render one button such as a single "Close"
  onConfirmClick?: (event: React.SyntheticEvent) => void
  children?: React.ReactElement | React.ReactElement[]
}

const ModalFullScreenView: FC<ModalFullScreenViewProps> = ({
  title,
  description,
  children,
  ...props
}) => {
  return (
    <DialogRadix.Root>
      <DialogRadix.Trigger asChild>
        <button
          className="items-center justify-center gap-1 
        text-sm font-medium leading-none text-slate-500 hover:text-slate-400 inline-flex h-[35px] rounded-lg
        focus:outline-none focus:ring-2 focus:ring-lime-500"
        >
          <Maximize2 className="w-4 shrink-0" />
        </button>
      </DialogRadix.Trigger>
      <DialogRadix.Portal>
        <DialogRadix.Overlay className="z-50 fixed bg-black data-[state=open]:animate-overlayShow inset-0 ">
          <DialogRadix.Content
            // onOpenAutoFocus={handleInitialFocus}
            className="z-50 fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] 
            data-[state=open]:animate-contentShow
            select-none overflow-y-auto max-h-screen w-screen 
            bg-black pt-6 sm:pt-8 shadow focus:outline-none"
          >
            {/* <div className="flex flex-row items-center">
              <DialogRadix.Title className="text-slate-500 text-base font-medium">
                {title}
              </DialogRadix.Title>
            </div> */}

            {/* <DialogRadix.Description className="text-slate-400 italic mt-px mb-1 text-sm leading-normal ">
              {description}
            </DialogRadix.Description> */}

            {/* -------- Document container starts here -------- */}
            <div className="w-full h-full overflow-y-auto">{children}</div>

            <DialogRadix.Close asChild>
              <button
                className="absolute top-0 flex flex-row h-4 sm:h-8 w-full appearance-none gap-1 items-center justify-center py-3
                 sm:font-medium text-sm text-yellow-400 hover:bg-yellow-300 hover:text-slate-900
                focus:shadow-cta-500 focus:shadow focus:outline-none"
                aria-label="Close"
              >
                <div>Exit Full Screen</div> <Minimize2 className="w-4" />
              </button>
            </DialogRadix.Close>
          </DialogRadix.Content>
        </DialogRadix.Overlay>
      </DialogRadix.Portal>
    </DialogRadix.Root>
  )
}

export { ModalFullScreenView }
