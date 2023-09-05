"use client"

import { FC, useRef, useEffect, useState } from "react"
import LayoutContainer from "@ui/LayoutContainer"
import Heading from "@ui/Heading"
import Paragraph from "@ui/Paragraph"
import { Wand, ArrowDownToLine, Send, Printer } from "lucide-react"
import Card from "@ui/Card"
import PrintButton from "@ui/PrintButton"
import { useReactToPrint } from "react-to-print"
import { PDFDownloadLink, PDFViewer, pdf } from "@react-pdf/renderer"
import DynamicPDF from "@components/buildDoc/DynamicPDF"
import dynamic from "next/dynamic"
import { pdfStyles } from "utils/_pdfHelpers/pdfStyles"
import Divider from "@ui/Divider"

// TEST DATA
const testData = {
  checkboxExample: true,
  radioExample: "option1",
  textExample: "d",
  jurisdiction: "location1",
  signingDate: "Sep-04-2023",
}

const testProductTitle = "Test Product"

// HELPERS
const loadingMessage = (
  <>
    <Wand className="w-[30%] h-[30%]" />
    <Paragraph size="xxxlarge" textAlign="center" padding="large" space="snug">
      Building your document ...
    </Paragraph>
  </>
)

type PrintToolBarProps = {
  displayPDF: boolean
  handlePrint: () => void
}
const PrintToolBar: FC<PrintToolBarProps> = ({
  displayPDF,
  handlePrint,
  ...props
}) => (
  <>
    <div className="z-10 fixed bottom-0 left-0 w-full flex flex-col justify-center items-center">
      <div className="flex flex-row flex-1 justify-center items-center">
        <div className="lg:hidden flex flex-row gap-4 items-center m-4 px-6 py-3 border border-slate-300 rounded-full bg-white drop-shadow-md max-w-md">
          <button className="items-center justify-center gap-1 text-slate-500 hover:text-slate-400 focus:shadow-green-700 inline-flex h-[35px] rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
            <ArrowDownToLine className="w-6 shrink-0" />

            {/* PDF download docs: https://react-pdf.org/advanced#on-the-fly-rendering */}
            {/* NOTE: Need conditional check to prevent SSR of PDFDownloadLink */}
            {displayPDF && (
              <PDFDownloadLink
                document={<DynamicPDF formData={testData} />}
                fileName={`${testProductTitle}.pdf`}
              >
                {({ blob, url, loading, error }) =>
                  loading ? "Loading PDF..." : "Download PDF"
                }
              </PDFDownloadLink>
            )}
          </button>
          <button className="items-center justify-center gap-1 text-slate-500 hover:text-slate-400 focus:shadow-green-700 inline-flex h-[35px] rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
            <Send className="w-6 shrink-0" /> Send Copy
          </button>
          <div className="flex items-center ml-px h-6">
            <Divider variant="vertical" color="standard" />
          </div>
          <PrintButton onClick={handlePrint}>
            <Printer className="w-6 shrink-0" />
            Print
          </PrintButton>
        </div>
      </div>
    </div>
  </>
)

// MAIN FUNCTION ---
export default function DocView() {
  // Dynamically import PDFViewer to fix build bug since Next uses SSR. See: https://www.youtube.com/watch?v=HhLa-D0SXlI
  const PDFViewer = dynamic(
    () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
    { ssr: false }
  )
  // Need a ref for printing PDF
  const pdfRef = useRef<HTMLDivElement>(null)

  const handlePrint = useReactToPrint({
    content: () => pdfRef.current,
  })

  // Loading state intentionally delayed for UX reasons
  const [displayPDF, setDisplayPDF] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayPDF(true)
    }, 2000)

    // Cleanup: Clear the timer if the component is unmounted before 2 seconds
    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <>
      <Heading
        size="h4"
        weight="bold"
        padding="standard"
        className="text-center"
      >
        Product Name
      </Heading>
      {/* <div className="flex lg:flex-row lg:gap-5 w-full xl:max-w-1400"> */}
      {/* <Card id="pdfView" margin="none" padding="none"> */}
      {/* <LayoutContainer
        variant="flex"
        direction="col"
        alignY="center"
        alignX="center"
        padding="none"
        margin="none"
      > */}
      {/* --- PDF container starts here --- */}
      <Card
        id="pdfView"
        interactionStyle="none"
        className="
          overflow-y-hidden 
          lg:max-h-[70vh] lg:w-[70vw] rounded-xl lg:p-6
          print:max-h-none"
      >
        <LayoutContainer
          variant="flex"
          direction="col"
          gap="medium"
          padding="none"
          margin="none"
          className="w-full lg:flex-row xl:max-w-1400"
        >
          {!displayPDF ? (
            loadingMessage
          ) : (
            // <div className="relative overflow-y-auto max-h-[70vh] lg:w-[70vw] print:max-h-none rounded-xl lg:bg-white lg:py-4 lg:px-6 text-xl font-light">
            <div
              ref={pdfRef}
              className={"max-h-[70vh] print:max-h-none w-full "}
            >
              {/* Need to pass formData directly as prop instead of useFormContext() or passing all methods because PDFViewer creates a separate context */}
              <PDFViewer style={pdfStyles.pdfViewer}>
                <DynamicPDF formData={testData} />
              </PDFViewer>
            </div>
            // </div>
          )}
          <div className="hidden lg:block max-w-xs overflow-visible ">
            {/* div needed for sticky to work. Cannot use overflow: scroll/hidden/auto with sticky https://www.digitalocean.com/community/tutorials/css-position-sticky */}
            {/* select-none needed to prevent user from copying text from preview */}
            <div className="lg:sticky top-0 overflow-y-auto select-none">
              <Card id="loadTemplatePreviewSection" variant="aside" type="flex">
                <div className="flex flex-row gap-2">
                  TODO: Toolbox goes here
                </div>
                <Divider padding="large" />
              </Card>
            </div>
          </div>
        </LayoutContainer>
      </Card>
      {/* --- Toolbar starts here --- */}
      <div className="flex max-w-full w-full flex-nowrap overflow-x-auto bg-slate-100 rounded-full py-1">
        <PrintToolBar displayPDF={displayPDF} handlePrint={handlePrint} />
        <button className="items-center justify-center gap-1 text-slate-500 hover:text-slate-400 focus:shadow-green-700 inline-flex h-[35px] rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
          <ArrowDownToLine className="w-4" />

          {/* PDF download docs: https://react-pdf.org/advanced#on-the-fly-rendering */}
          {/* NOTE: Need conditional check to prevent SSR of PDFDownloadLink */}
          {displayPDF && (
            <PDFDownloadLink
              document={<DynamicPDF formData={testData} />}
              fileName={`${testProductTitle}.pdf`}
            >
              {({ blob, url, loading, error }) =>
                loading ? "Loading PDF..." : "Download PDF"
              }
            </PDFDownloadLink>
          )}
        </button>

        <button className="items-center justify-center gap-1 text-slate-500 hover:text-slate-400 focus:shadow-green-700 inline-flex h-[35px] rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
          <Send className="w-4" /> Share
        </button>

        <button className="text-slate-500 hover:text-slate-400 focus:shadow-green-700 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
          Lock
        </button>

        <PrintButton onClick={handlePrint}>
          <Printer className="w-4" />
          Print
        </PrintButton>
      </div>
      {/* </LayoutContainer> */}
      {/* </Card> */}
      {/* </div> */}
    </>
  )
}
