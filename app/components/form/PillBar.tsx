import { FC, useState, useContext } from "react"
import { useFormContext } from "react-hook-form"
import { PageContext } from "@components/templates/context"
import {
  ArrowBigDownDash,
  ArrowBigUpDash,
  HelpCircle,
  RotateCcwIcon,
  Send,
  Trash2,
  Wrench,
  XCircle,
} from "lucide-react"
import Divider from "@ui/Divider"
import ModalAlert from "@ui/ModalAlert"

type PillBarProps = {
  variant?: "standard" | "multibar"
}

type StandardBarProps = {
  showToolBox: boolean
  setShowToolBox: React.Dispatch<React.SetStateAction<boolean>>
}

type ToolBoxProps = {
  showToolBox: StandardBarProps["showToolBox"]
  setShowToolBox: StandardBarProps["setShowToolBox"]
}

// COLOR TOKENS ---------
const primarySelectColor = "rgb(2 132 199)"
const secondarySelectColor = "rgb(100 116 139)"

// HELPER COMPONENTS ----------
const ToolBox: FC<ToolBoxProps> = ({ showToolBox, setShowToolBox }) => {
  // Start by getting context values from product page and Form
  const pageContextValue = useContext(PageContext) // Values are defined in page.tsx
  const { reset } = useFormContext()

  // Event handlers for toolbox
  const handleResetForm = () => {
    reset((pageContextValue as any).defaultValues) // type cast here as check less important because the form won't work if defaultValues doesn't exist anyways
    setShowToolBox(false) // want to hide the toolbox if user resets form
  }

  return (
    <>
      <div className="lg:hidden flex gap-4 justify-between items-center h-10 w-full max-w-md p-4 bg-slate-300 shadow sm:rounded-lg">
        <button type="button" className="flex flex-row gap-1 p-2 text-red-600 ">
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

        <button type="button" className="flex flex-row gap-1 p-2  ">
          <HelpCircle className="" />
          Help
        </button>

        <button type="button" onClick={() => setShowToolBox(!showToolBox)}>
          <XCircle className="text-slate-500" />
        </button>
      </div>
    </>
  )
}

const StandardBar: FC<StandardBarProps> = ({ showToolBox, setShowToolBox }) => (
  <>
    <div className="z-10 fixed bottom-0 left-0 w-full flex flex-col justify-center items-center">
      {/* Toolbox works best with 3 items. Any more and will have to remove labels to fit on mobile. */}
      {showToolBox && (
        <ToolBox showToolBox={showToolBox} setShowToolBox={setShowToolBox} />
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
            className="max-w-xs bottom-0 p-2 shadow border-2 border-sky-600 bg-sky-500 rounded-full "
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

const MultiBar: FC<ToolBoxProps> = ({ showToolBox, setShowToolBox }) => (
  <>
    {/* Bottom pill bar */}
    <div className="z-10 fixed bottom-0 left-0 w-full flex flex-col justify-center items-center">
      {showToolBox && (
        <ToolBox showToolBox={showToolBox} setShowToolBox={setShowToolBox} />
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
          <button className="max-w-xs bottom-0 p-2 shadow border-2 border-sky-600 bg-sky-500 rounded-full ">
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

  ...props
}) => {
  const [showToolBox, setShowToolBox] = useState(false)

  return variant === "multibar" ? (
    <MultiBar showToolBox={showToolBox} setShowToolBox={setShowToolBox} />
  ) : (
    <StandardBar showToolBox={showToolBox} setShowToolBox={setShowToolBox} />
  )
}

export default PillBar

// NOTES ----------------------------

// VARIANTS
// Two different pill bar styles. The multi pill bar has a center main action bar with a separated right aligned "tool" button.
// Intended for actions that need to be kept separated from main pillbar actions.

// CONTEXT
// Use of pageContextValue in ToolBox because rhf's reset() needs defaultValues which are defined in the product's page.tsx
// Use rhf's FormProvider in ToolBox so we can reset the form. Methods grabbed from Form component.