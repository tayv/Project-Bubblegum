"use client"

import { FC, useState, useContext, useEffect } from "react"
import { useFormContext, UseFormReturn } from "react-hook-form"
import { ProductContext } from "@contexts/ProductContext"
import {
  ArrowBigDownDash,
  ArrowBigUpDash,
  HelpCircle,
  RotateCcwIcon,
  Send,
  Trash2,
  View,
  Wrench,
  XCircle,
} from "lucide-react"
import Divider from "@ui/Divider"
import ModalViewDoc from "@ui/ModalViewDoc"
import dynamic from "next/dynamic"
import ModalAlert from "@ui/ModalAlert"
import { pdfStyles } from "utils/_pdfHelpers/pdfStyles"
import DynamicPDF from "@components/buildDoc/DynamicPDF"
import { useLoadPreviewPDF } from "@hooks/useLoadPreviewPDF"
import { SignedIn, SignedOut } from "@clerk/nextjs"
import SheetUpsell from "@uiTemplates/SheetUpsell"

type PillBarProps = {
  productTitle: string
  methods: UseFormReturn // used so we can render preview of document in Toolbox for authenticated users
  variant?: "standard" | "multibar"
}

type StandardBarProps = {
  productTitle: string
  methods: UseFormReturn
  showToolBox: boolean
  setShowToolBox: React.Dispatch<React.SetStateAction<boolean>>
}

type ToolBoxProps = {
  productTitle: string
  showToolBox: StandardBarProps["showToolBox"]
  setShowToolBox: StandardBarProps["setShowToolBox"]
  methods: UseFormReturn
}

// COLOR TOKENS ---------
const primarySelectColor = "rgb(2 132 199)"
const secondarySelectColor = "rgb(100 116 139)"

// HELPER COMPONENTS ----------
const ToolBox: FC<ToolBoxProps> = ({
  productTitle,
  showToolBox,
  setShowToolBox,
  methods,
}) => {
  // Start by getting context values from product page and Form ----
  // NOTE: Used valueFromProductContext in ToolBox because rhf's reset() needs defaultValues which are defined in the product's page.tsx
  // NOTES: Used rhf's FormProvider in ToolBox so we can reset the form. Methods grabbed from Form component.
  const valueFromProductContext = useContext(ProductContext) // Values are defined in page.tsx
  const { reset, getValues } = useFormContext()

  // Event handlers for toolbox
  const handleResetForm = () => {
    reset((valueFromProductContext as any).defaultValues) // type cast here as check less important because the form won't work if defaultValues doesn't exist anyways
    setShowToolBox(false) // want to hide the toolbox if user resets form
  }

  // Dynamically import PDFViewer to fix build bug since Next uses SSR. See: https://www.youtube.com/watch?v=HhLa-D0SXlI
  const PDFViewer = dynamic(
    () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
    { ssr: false }
  )

  // This hook gets use the latest form values based on when trigger button is clicked
  const { handlePreviewPDF, latestFormData } = useLoadPreviewPDF()

  return (
    <>
      <div className="lg:hidden flex gap-4 justify-between items-center h-12 w-full max-w-md p-4 bg-slate-200  border border-slate-300 shadow-md sm:rounded-lg">
        <button type="button" className="flex flex-row gap-1 p-2 text-red-600">
          <Trash2 className="text-red-600" />
          Delete
        </button>

        <ModalAlert
          handleConfirmClick={handleResetForm}
          title="Are you sure you want to reset the form?"
          description="This action can't be undone. Any unsaved values will be lost."
          confirmText="Reset Form"
        >
          <button type="button" className="flex flex-row gap-1 p-2  ">
            <RotateCcwIcon className="" />
            Reset
          </button>
        </ModalAlert>

        <SignedOut>
          <SheetUpsell
            triggerComponent={
              <button
                onClick={handlePreviewPDF}
                className="flex flex-row gap-1 py-2"
              >
                <View />
                Preview
              </button>
            }
          />
        </SignedOut>

        <SignedIn>
          <ModalViewDoc
            variant="preview"
            triggerText="Preview"
            title={`Preview: ${productTitle}`}
            description="This is a preview not your final document."
            formData={latestFormData}
            handlePreviewPDF={handlePreviewPDF}
          >
            {/* Need to pass formData directly as prop instead of useFormContext() or passing all methods because PDFViewer creates a separate context */}
            <PDFViewer style={pdfStyles.pdfViewer}>
              <DynamicPDF formData={getValues()} />
            </PDFViewer>
          </ModalViewDoc>
        </SignedIn>

        {/* <button type="button" className="flex flex-row gap-1 p-2  ">
          <HelpCircle className="" />
          Help
        </button> */}

        <button type="button" onClick={() => setShowToolBox(!showToolBox)}>
          <XCircle className="text-slate-500" />
        </button>
      </div>
    </>
  )
}

const StandardBar: FC<StandardBarProps> = ({
  productTitle,
  showToolBox,
  setShowToolBox,
  methods,
}) => (
  <>
    <div className="z-10 fixed bottom-0 left-0 w-full flex flex-col justify-center items-center">
      {/* Toolbox works best with 3 items. Any more and will have to remove labels to fit on mobile. */}
      {showToolBox && (
        <ToolBox
          productTitle={productTitle}
          methods={methods}
          showToolBox={showToolBox}
          setShowToolBox={setShowToolBox}
        />
      )}
      <div className="flex flex-row flex-1 justify-center items-center">
        <div className="lg:hidden flex flex-row gap-4 items-center m-4 px-6 py-3 border border-slate-300 rounded-full bg-white drop-shadow-md max-w-md">
          <button
            type="button"
            className="max-w-xs bottom-0 p-2 border-2 border-slate-500 rounded-full "
          >
            <ArrowBigUpDash className="text-slate-500" />
          </button>
          <button
            type="button"
            className="max-w-xs bottom-0 p-2 shadow border-2 border-cta-600 bg-cta-500 rounded-full "
          >
            <ArrowBigDownDash fill="white" stroke="white" />
          </button>
          <div className="flex items-center ml-px h-6">
            <Divider variant="vertical" color="standard" />
          </div>
          <button type="button" onClick={() => setShowToolBox(!showToolBox)}>
            <Wrench
              fill={showToolBox ? secondarySelectColor : "transparent"}
              stroke={secondarySelectColor}
              className="w-6 shrink-0 hover:text-slate-300"
            />
          </button>
        </div>
      </div>
    </div>
  </>
)

const MultiBar: FC<ToolBoxProps> = ({
  productTitle,
  showToolBox,
  setShowToolBox,
  methods,
}) => (
  <>
    {/* Bottom pill bar */}
    <div className="z-10 fixed bottom-0 left-0 w-full flex flex-col justify-center items-center">
      {showToolBox && (
        <ToolBox
          productTitle={productTitle}
          methods={methods}
          showToolBox={showToolBox}
          setShowToolBox={setShowToolBox}
        />
      )}

      <div className="flex flex-row flex-1 justify-center items-center">
        <div className="flex flex-1 pl-6">
          {/* This invisible div is needed so flexbox can center the stepper buttons while right aligning the toolbar button*/}
          {/* IMPORTANT: left padding here must match right padding on toolbar button so steppers are centered.*/}
        </div>
        <div className="lg:hidden flex flex-row gap-4 items-center m-4 px-6 py-3 border border-slate-300 rounded-full bg-white drop-shadow-md max-w-md">
          <button className="max-w-xs bottom-0 p-2 border-2 border-slate-500 rounded-full ">
            <ArrowBigUpDash className="text-slate-500" />
          </button>
          <button className="max-w-xs bottom-0 p-2 shadow border-2 border-cta-600 bg-cta-500 rounded-full ">
            <ArrowBigDownDash fill="white" stroke="white" />
          </button>
        </div>

        {/* Toolbar options don't need to be collapsed on desktop so also hide it for large screens*/}
        <div className="flex flex-1 justify-end pr-6 lg:hidden">
          <button
            onClick={() => setShowToolBox(!showToolBox)}
            className="max-w-xs bottom-0 p-2  border bg-slate-100 border-slate-300 rounded-full drop-shadow "
          >
            <Wrench
              fill={showToolBox ? secondarySelectColor : "transparent"}
              stroke={secondarySelectColor}
              className="hover:text-slate-300 "
            />
          </button>
        </div>
      </div>
    </div>
  </>
)

// MAIN FUNCTION
const PillBar: FC<PillBarProps> = ({
  variant = "standard",
  productTitle,
  ...props
}) => {
  const [showToolBox, setShowToolBox] = useState(false)

  return variant === "multibar" ? (
    <MultiBar
      productTitle={productTitle}
      methods={props.methods}
      showToolBox={showToolBox}
      setShowToolBox={setShowToolBox}
    />
  ) : (
    <StandardBar
      productTitle={productTitle}
      showToolBox={showToolBox}
      setShowToolBox={setShowToolBox}
      methods={props.methods}
    />
  )
}

export default PillBar

// NOTES ----------------------------

// VARIANTS
// Two different pill bar styles. The multi pill bar has a center main action bar with a separated right aligned "tool" button.
// Intended for actions that need to be kept separated from main pillbar actions.

// CONTEXT
// Use of valueFromProductContext in ToolBox because rhf's reset() needs defaultValues which are defined in the product's page.tsx
// Use rhf's FormProvider in ToolBox so we can reset the form. Methods grabbed from Form component.
