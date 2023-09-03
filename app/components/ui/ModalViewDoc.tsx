"use client"
import { FC, useRef } from "react"
import * as DialogRadix from "@radix-ui/react-dialog"
import {
  X,
  Lock,
  ArrowDownToLine,
  Send,
  Pencil,
  Printer,
  View,
} from "lucide-react"
import PrintButton from "@ui/PrintButton"
import { useReactToPrint } from "react-to-print"
import { PDFDownloadLink, PDFViewer, pdf } from "@react-pdf/renderer"
import DynamicPDF from "@product2/DynamicPDF"
import { FormDataType } from "@product2/_schemas/productTypes"
import { pdfStyles } from "@product2/_pdfHelpers/pdfStyles"

export type ModalViewDocProps = {
  formData: FormDataType
  triggerText: string
  triggerType?: "button" | "text"
  handlePreviewPDF?: React.MouseEventHandler<HTMLButtonElement> // used when displaying a PDF inside an unfinished form
  title: string
  description: string
  confirmText?: string
  cancelText?: string | null // Pass null when only want to render one button such as a single "Close"
  onConfirmClick?: (event: React.SyntheticEvent) => void
  children?: React.ReactElement | React.ReactElement[]
}

const ModalViewDoc: FC<ModalViewDocProps> = ({
  formData, // Needed by react-print's <PDFDownloadLink/> to download the doc
  triggerText,
  triggerType = "button",
  title,
  description,
  children,
  handlePreviewPDF, // used to ensure we have latest formData for forms still in progress
  ...props
}) => {
  // Want focus to initially be on Print button. This allows secondary buttons to be ordered according to what's easiest to style
  const printButtonRef = useRef<HTMLButtonElement>(null)
  const handleInitialFocus = (event: Event) => {
    event.preventDefault()
    printButtonRef.current?.focus()
  }
  const pdfRefTest = useRef<HTMLDivElement>(null)
  // Setup ref for react-to-print
  const componentToPrintRef = useRef<HTMLDivElement>(null)
  const handlePrint = useReactToPrint({
    content: () => pdfRefTest.current,
  })

  // NOTE: Printing whole dialog. This is likely cause of special behavior when printing elements outside the regular document flow
  // Look into either applying print styles to hide dialog (might not work as ref is a child) or a function that removes excess elements on print or trying to print just standalone mdx page??

  return (
    <DialogRadix.Root>
      <DialogRadix.Trigger asChild>
        {triggerType === "button" ? (
          <button
            onClick={handlePreviewPDF}
            className="flex flex-row gap-1 p-2"
          >
            <View />
            {triggerText}
          </button>
        ) : (
          <a href="#" className="text-sky-500">
            {triggerText}
          </a>
        )}
      </DialogRadix.Trigger>
      <DialogRadix.Portal>
        <DialogRadix.Overlay className="z-50 bg-black data-[state=open]:animate-overlayShow fixed inset-0 ">
          <DialogRadix.Content
            onOpenAutoFocus={handleInitialFocus}
            className="z-50 select-none overflow-y-auto data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[100vh] w-[100vw] max-w-[1000px] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-slate-100 p-6 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none"
          >
            <div className="flex flex-row items-center">
              <DialogRadix.Title className="text-slate-500 text-base font-medium">
                {title}
              </DialogRadix.Title>
              <button className="inline-flex gap-1 items-center justify-center px-2  text-slate-500 hover:text-slate-400 font-xs leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
                <Lock className="w-4" /> Unlock
              </button>
            </div>

            <DialogRadix.Description className="text-slate-400 italic mt-px mb-1 text-sm leading-normal ">
              {description}
            </DialogRadix.Description>

            {/* -------- Document container starts here -------- */}
            <div className="relative overflow-y-auto max-h-[70vh] print:max-h-none rounded-xl bg-white py-4 px-6 text-xl font-light">
              {/* ------- Optional overlay button. ------- */}
              {/* Currently disabled as doesn't work as well with broswer based PDF viewers */}
              {/* <DialogRadix.Close asChild>
                  <button className="z-50 absolute top-5 right-6 items-center justify-center gap-1 text-sky-500 hover:text-slate-400 focus:shadow-green-700 inline-flex  rounded-[4px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
                    <Pencil className="w-5" /> Edit
                  </button>
                </DialogRadix.Close> */}
              {/* -------------------------------- */}

              <div
                // ref={componentToPrintRef}
                ref={pdfRefTest}
                className={"max-h-[70vh] print:max-h-none w-full"}
              >
                {children}
              </div>
            </div>

            {/* -------- Sticky bottom section starts here -------- */}
            {/* flex-row-reverse needed so that focus is on the print button when re-opening */}
            <div className="flex flex-row-reverse justify-start items-center gap-2 sticky bottom-0 bg-white p-4 rounded-xl drop-shadow">
              {/* Not wrapped in DialogRadix.Close because we want the preview to stay open unless user specially chooses to close or edit */}

              {/* Relies on react-to-print library*/}
              <PrintButton onClick={handlePrint}>
                <Printer className="w-4" />
                Print
              </PrintButton>
              {/* <PrintButton
                ref={printButtonRef}
              >
                <Printer className="w-4" />
                Print
              </PrintButton> */}
              {/* <button
                ref={printButtonRef}
                onClick={() => alert("Print the doc")}
                className="inline-flex items-center justify-center gap-1 bg-sky-200 text-sky-700 hover:bg-sky-300 focus:shadow-sky-700  h-[35px] rounded-lg px-4 py-5 font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
              >
                <Printer className="w-4" />
                Print
              </button> */}

              <div className="flex max-w-full w-full flex-nowrap overflow-x-auto bg-slate-100 rounded-full py-1">
                <button className="items-center justify-center gap-1 text-slate-500 hover:text-slate-400 focus:shadow-green-700 inline-flex h-[35px] rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
                  <ArrowDownToLine className="w-4" />

                  {/* PDF download docs: https://react-pdf.org/advanced#on-the-fly-rendering */}
                  <PDFDownloadLink
                    document={<DynamicPDF formData={formData} />}
                    fileName={`${title}.pdf`}
                  >
                    {({ blob, url, loading, error }) =>
                      loading ? "Loading PDF..." : "Download PDF"
                    }
                  </PDFDownloadLink>
                </button>

                <button className="items-center justify-center gap-1 text-slate-500 hover:text-slate-400 focus:shadow-green-700 inline-flex h-[35px] rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
                  <Send className="w-4" /> Share
                </button>

                <button className="text-slate-500 hover:text-slate-400 focus:shadow-green-700 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
                  Lock
                </button>

                <DialogRadix.Close asChild>
                  <button className="items-center justify-center gap-1 text-slate-500 hover:text-slate-400 focus:shadow-green-700 inline-flex h-[35px] rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
                    <Pencil className="w-4" /> Edit
                  </button>
                </DialogRadix.Close>
              </div>
            </div>

            <DialogRadix.Close asChild>
              <button
                className="absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full text-slate-400 hover:bg-slate-200 focus:shadow-sky-500 focus:shadow-[0_0_0_2px] focus:outline-none"
                aria-label="Close"
              >
                <X />
              </button>
            </DialogRadix.Close>
          </DialogRadix.Content>
        </DialogRadix.Overlay>
      </DialogRadix.Portal>
    </DialogRadix.Root>
  )
}

export default ModalViewDoc
