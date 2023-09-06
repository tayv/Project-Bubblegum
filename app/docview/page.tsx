"use client"

import { FC, useRef, useEffect, useState } from "react"
import LayoutContainer from "@ui/LayoutContainer"
import Heading from "@ui/Heading"
import Paragraph from "@ui/Paragraph"
import { Wand, ArrowDownToLine, Send, Printer, PencilRuler } from "lucide-react"
import Card from "@ui/Card"
import PrintButton from "@ui/PrintButton"
import { useReactToPrint } from "react-to-print"
import { PDFDownloadLink, PDFViewer, pdf } from "@react-pdf/renderer"
import DynamicPDF from "@components/buildDoc/DynamicPDF"
import dynamic from "next/dynamic"
import { pdfStyles } from "utils/_pdfHelpers/pdfStyles"
import Divider from "@ui/Divider"
import ButtonCTA from "@components/form/ButtonCTA"

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
        color="secondary"
        weight="normal"
        padding="standard"
        className="pl-2 text-center lg:text-left"
      >
        {testProductTitle}
      </Heading>

      {/* --- PDF container starts here --- */}
      <Card
        id="pdfView"
        interactionStyle="none"
        className="
          overflow-y-hidden w-full rounded-xl 
          lg:p-6
          print:max-h-none"
      >
        <LayoutContainer
          variant="flex"
          direction="col"
          gap="medium"
          padding="none"
          margin="none"
          className="w-full lg:flex-row max-w-screen-lg"
        >
          {!displayPDF ? (
            loadingMessage
          ) : (
            // <div className="relative overflow-y-auto max-h-[70vh] lg:w-[70vw] print:max-h-none rounded-xl lg:bg-white lg:py-4 lg:px-6 text-xl font-light">
            <div
              ref={pdfRef}
              className={
                "lg:max-h-[80vh] w-[50vw] max-w-screen-lg print:max-h-none select-none"
              }
            >
              {/* Need to pass formData directly as prop instead of useFormContext() or passing all methods because PDFViewer creates a separate context */}
              <PDFViewer style={pdfStyles.pdfViewer}>
                <DynamicPDF formData={testData} />
              </PDFViewer>
            </div>
            // </div>
          )}

          <Card
            id="desktopPrintToolbox"
            variant="aside"
            color="glass"
            type="flex"
            direction="col"
            margin="none"
            className="hidden lg:flex lg:flex-col shrink max-w-[200px]"
          >
            {/* Design decision: Necessary to call out toolbox or is it implied? */}
            {/* <LayoutContainer
              variant="flex"
              direction="row"
              alignY="center"
              alignX="center"
              gap="xsmall"
              margin="none"
              padding="small"
              className=""
            >
              <PencilRuler
                strokeWidth={1.5}
                className="w-5 shrink-0 text-slate-500"
              />
              <div className="font-normal text-base text-slate-500">
                TOOLBOX
              </div>
            </LayoutContainer>
            <div className="flex flex-row justify-center">
              <Divider padding="standard" width="small" />
            </div> */}

            <LayoutContainer
              variant="flex"
              direction="col"
              alignY="top"
              gap="xsmall"
              margin="none"
              padding="none"
              className=""
            >
              <PrintButton onClick={handlePrint} className="w-full mb-3">
                <Printer className="w-5 shrink-0" />
                Print
              </PrintButton>

              <button className="items-center justify-center gap-1 text-slate-500 hover:text-slate-400  inline-flex h-[35px] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-lime-500 text-md font-medium leading-none py-4">
                <ArrowDownToLine className="w-5 shrink-0" />
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

              <button className="items-center justify-center gap-1 text-slate-500 hover:text-slate-400  inline-flex h-[35px] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-lime-500 text-md font-medium leading-none py-4">
                <Send className="w-5 shrink-0" /> Send Copy
              </button>
            </LayoutContainer>
          </Card>
        </LayoutContainer>
      </Card>

      {/* --- Mobile Toolbar starts here --- */}
      <div className="flex max-w-full w-full flex-nowrap overflow-x-auto bg-slate-100 rounded-full py-1">
        <PrintToolBar displayPDF={displayPDF} handlePrint={handlePrint} />
      </div>
    </>
  )
}
