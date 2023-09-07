"use client"

import { FC, useRef, useEffect, useState } from "react"
import LayoutContainer from "@ui/LayoutContainer"
import Heading from "@ui/Heading"
import Paragraph from "@ui/Paragraph"
import {
  Wand,
  ArrowDownToLine,
  Send,
  Printer,
  PencilRuler,
  Maximize2,
} from "lucide-react"
import Card from "@ui/Card"
import PrintButton from "@ui/PrintButton"
import { useReactToPrint } from "react-to-print"
import { PDFDownloadLink, PDFViewer, pdf } from "@react-pdf/renderer"
import DynamicPDF from "@components/buildDoc/DynamicPDF"
import dynamic from "next/dynamic"
import { pdfStyles } from "utils/_pdfHelpers/pdfStyles"
import Divider from "@ui/Divider"
import ButtonCTA from "@components/form/ButtonCTA"
import ModalFullScreenView from "@components/ui/ModalFullScreenView"

// TEST DATA ---
const testData = {
  checkboxExample: true,
  radioExample: "option1",
  textExample: "d",
  jurisdiction: "location1",
  signingDate: "Sep-04-2023",
}

const testProductTitle = "Test Product"

// HELPERS ---
const loadingMessage = (
  <div className="flex flex-col items-center w-full">
    <Wand className="w-[30%] h-[30%]" />
    <Paragraph
      size="xxxlarge"
      textAlign="center"
      padding="standard"
      space="snug"
    >
      Building your document ...
    </Paragraph>
  </div>
)

type PrintToolBarProps = {
  displayPDF: boolean
  handlePrint: () => void
}
const PrintToolBarDesktop: FC<PrintToolBarProps> = ({
  displayPDF,
  handlePrint,
  ...props
}) => (
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

      {/* 
      // Future functionality
      <button className="items-center justify-center gap-1 text-slate-500 hover:text-slate-400  inline-flex h-[35px] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-lime-500 text-md font-medium leading-none py-4">
        <Send className="w-5 shrink-0" /> Send Copy
      </button> */}
    </LayoutContainer>
  </Card>
)

const PrintToolBarMobile: FC<PrintToolBarProps> = ({
  displayPDF,
  handlePrint,
  ...props
}) => (
  <>
    <div className="z-10 fixed bottom-0 left-0 max-w-screen h-16 w-full flex flex-col justify-center items-center my-2 px-4">
      {/* <div className="flex flex-row flex-1 justify-center items-center"> */}
      <div className="lg:hidden flex flex-row gap-4 items-centerh-16  m-4 pl-6 border border-slate-300 rounded-full bg-white drop-shadow-md max-w-md">
        <button className="flex flex-col flex-wrap items-center justify-center text-center font-normal text-xs gap-1 px-1 py-2 text-slate-500 hover:text-slate-400 leading-none focus:shadow focus:outline-none focus:ring-2 focus:ring-lime-500">
          <ArrowDownToLine className="w-6 shrink-0" />
          {/* PDF download docs: https://react-pdf.org/advanced#on-the-fly-rendering */}
          {/* NOTE: Need conditional check to prevent SSR of PDFDownloadLink */}
          {displayPDF && (
            <>
              <div className="min-w-max">
                <PDFDownloadLink
                  document={<DynamicPDF formData={testData} />}
                  fileName={`${testProductTitle}.pdf`}
                >
                  {({ blob, url, loading, error }) =>
                    loading ? "Loading PDF..." : "Download PDF"
                  }
                </PDFDownloadLink>
              </div>
            </>
          )}
        </button>

        {/* 
        // Future functionality
        <button className="flex flex-col flex-wrap items-center justify-center text-center font-normal text-xs gap-1 px-1 text-slate-500 hover:text-slate-400 leading-none focus:shadow focus:outline-none focus:ring-2 focus:ring-lime-500">
          <Send className="w-5 shrink-0" />
          <div className="min-w-max">Send Copy</div>
        </button> */}

        <PrintButton onClick={handlePrint}>
          <Printer className="w-6 shrink-0" />
          Print
        </PrintButton>
      </div>
      {/* </div> */}
    </div>
  </>
)

// MAIN FUNCTION ---
export default function DocView() {
  const [viewFullScreen, setViewFullScreen] = useState(false)

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
      <LayoutContainer
        variant="flex"
        direction="row"
        // alignY="bottom"
        padding="none"
        margin="none"
        className="px-3 sm:px-6 sm:pt-2 sm:pb-1 justify-between max-w-screen-lg"
      >
        <Heading
          size="h4"
          color="secondary"
          weight="normal"
          padding="none"
          className="text-center lg:text-left"
        >
          {testProductTitle}
        </Heading>

        <ModalFullScreenView>
          <PDFViewer style={pdfStyles.pdfViewer}>
            <DynamicPDF formData={testData} />
          </PDFViewer>
        </ModalFullScreenView>
      </LayoutContainer>

      {/* --- PDF container starts here --- */}
      <Card
        id="pdfDisplayCard"
        interactionStyle="none"
        corners="none"
        className="
          overflow-y-hidden w-full min-w-[100vw] 
          lg:p-6 lg:min-w-0 lg:rounded-2xl
          print:max-h-none"
      >
        <LayoutContainer
          variant="flex"
          direction="col"
          alignY="top"
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
                "lg:max-h-[80vh] lg:w-[50vw] w-full max-w-screen-lg print:max-h-none select-none"
              }
            >
              {/* Need to pass formData directly as prop instead of useFormContext() or passing all methods because PDFViewer creates a separate context */}
              <PDFViewer style={pdfStyles.pdfViewer}>
                <DynamicPDF formData={testData} />
              </PDFViewer>
            </div>
            // </div>
          )}

          {/* --- Desktop tool box --- */}
          <PrintToolBarDesktop
            displayPDF={displayPDF}
            handlePrint={handlePrint}
          />
        </LayoutContainer>
      </Card>

      {/* --- Mobile print toolbox starts here --- */}
      <div className="flex max-w-screen flex-nowrap overflow-x-auto bg-slate-100 rounded-full px-4 py-1">
        <PrintToolBarMobile displayPDF={displayPDF} handlePrint={handlePrint} />
      </div>
    </>
  )
}
