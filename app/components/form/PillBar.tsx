import { FC, useState } from "react"
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

type PillBarProps = {
  variant?: "standard" | "multibar"
}

type StandardBarProps = {
  showToolBox: boolean
  setShowToolBox: React.Dispatch<React.SetStateAction<boolean>>
}
const StandardBar: FC<StandardBarProps> = ({ showToolBox, setShowToolBox }) => (
  <>
    <div className="z-10 fixed bottom-0 left-0 w-full flex flex-col justify-center items-center">
      {/* Toolbox works best with 3 items. Any more and will have to remove labels to fit on mobile. */}
      {showToolBox && (
        <div className="flex gap-4 justify-between items-center h-10 w-full max-w-md p-4 bg-slate-400 shadow sm:rounded-lg">
          <button className="flex flex-row gap-1 p-2 text-red-600 ">
            <Trash2 className="text-red-600" />
            Delete
          </button>

          <button className="flex flex-row gap-1 p-2  ">
            <RotateCcwIcon className="" />
            Reset
          </button>

          <button className="flex flex-row gap-1 p-2  ">
            <HelpCircle className="" />
            Help
          </button>

          <button onClick={() => setShowToolBox(!showToolBox)}>
            <XCircle className="text-slate-500" />
          </button>
        </div>
      )}
      <div className="flex flex-row flex-1 justify-center items-center">
        <div className="lg:hidden flex flex-row gap-4 items-center m-4 px-6 py-3 border border-slate-300 rounded-full bg-white drop-shadow-md max-w-md">
          <button className="max-w-xs bottom-0 p-2 border-2 border-slate-500 rounded-full ">
            <ArrowBigUpDash className="text-slate-500" />
          </button>
          <button className="max-w-xs bottom-0 p-2 shadow border-2 border-sky-600 bg-sky-500 rounded-full ">
            <ArrowBigDownDash fill="white" stroke="white" />
          </button>
          <div className="flex items-center ml-px h-6">
            <Divider variant="vertical" color="standard" />
          </div>
          <button onClick={() => setShowToolBox(!showToolBox)}>
            <Wrench className="w-6 shrink-0 text-slate-500 hover:text-slate-300" />
          </button>
        </div>
      </div>
    </div>
  </>
)

const MultiBar: FC = () => (
  <>
    {/* Bottom pill bar */}
    <div className="z-10 fixed bottom-0 left-0 w-full flex  justify-center items-center">
      {/* Action toolbar */}
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
          <button className="max-w-xs bottom-0 p-2  border bg-slate-100 border-slate-300 rounded-full drop-shadow ">
            <Wrench className="text-slate-500 " />
          </button>
        </div>
      </div>
    </div>
  </>
)

// MAIN FUNCTION
const PillBar: FC<PillBarProps> = ({ variant = "standard", ...props }) => {
  const [showToolBox, setShowToolBox] = useState(false)

  return variant === "multibar" ? (
    <MultiBar />
  ) : (
    <StandardBar showToolBox={showToolBox} setShowToolBox={setShowToolBox} />
  )
}

export default PillBar

// NOTES
// Two different pill bar styles. The multi pill bar has a center main action bar with a separated right aligned "tool" button.
// Intended for actions that need to be kept separated from main pillbar actions.
