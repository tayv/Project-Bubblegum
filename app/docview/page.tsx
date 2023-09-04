"use client"

import { useRef, useEffect, useState } from "react"
import LayoutContainer from "@ui/LayoutContainer"
import Heading from "@ui/Heading"
import Paragraph from "@ui/Paragraph"
import { Wand, ArrowDownToLine, Send, Printer } from "lucide-react"
import Card from "@ui/Card"
import PrintButton from "@ui/PrintButton"
import { useReactToPrint } from "react-to-print"
import { PDFDownloadLink, PDFViewer, pdf } from "@react-pdf/renderer"
import DynamicPDF from "@product2/DynamicPDF"
import dynamic from "next/dynamic"
import { pdfStyles } from "@product2/_pdfHelpers/pdfStyles"

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
        size="h1"
        weight="bold"
        padding="standard"
        className="text-center"
      >
        Product Name
      </Heading>
      <div className="flex lg:flex-row lg:gap-5 w-full xl:max-w-1400">
        <Card id="pdfView">
          <LayoutContainer
            variant="flex"
            direction="col"
            alignY="center"
            alignX="center"
          >
            {/* --- PDF container starts here --- */}
            {!displayPDF ? (
              loadingMessage
            ) : (
              <div className="relative overflow-y-auto max-h-[70vh] print:max-h-none rounded-xl bg-white py-4 px-6 text-xl font-light">
                <div
                  ref={pdfRef}
                  className={"max-h-[70vh] print:max-h-none w-full"}
                >
                  {/* Need to pass formData directly as prop instead of useFormContext() or passing all methods because PDFViewer creates a separate context */}
                  <PDFViewer style={pdfStyles.pdfViewer}>
                    <DynamicPDF formData={testData} />
                  </PDFViewer>
                </div>
              </div>
            )}

            {/* --- Toolbar starts here --- */}
            <div className="flex max-w-full w-full flex-nowrap overflow-x-auto bg-slate-100 rounded-full py-1">
              <button className="items-center justify-center gap-1 text-slate-500 hover:text-slate-400 focus:shadow-green-700 inline-flex h-[35px] rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
                <ArrowDownToLine className="w-4" />

                {/* PDF download docs: https://react-pdf.org/advanced#on-the-fly-rendering */}
                <PDFDownloadLink
                  document={<DynamicPDF formData={testData} />}
                  fileName={`${testProductTitle}.pdf`}
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

              <PrintButton onClick={handlePrint}>
                <Printer className="w-4" />
                Print
              </PrintButton>
            </div>
          </LayoutContainer>
        </Card>
      </div>
    </>
  )
}
