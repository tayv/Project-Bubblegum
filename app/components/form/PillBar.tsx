import { FC } from "react"
import { ArrowBigDownDash, ArrowBigUpDash, Wrench } from "lucide-react"
import Divider from "@ui/Divider"

type PillBarProps = {
  variant?: "standard" | "multibar"
}

const standardPillBar = (
  <>
    <div className="z-10 fixed bottom-0 left-0 w-full flex flex-col justify-center items-center">
      {/* Action toolbar */}
      <div className="h-6 bg-slate-400 w-full"></div>
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
          <Wrench className="w-6 shrink-0 text-slate-500 hover:text-slate-300" />
        </div>
      </div>
    </div>
  </>
)

const multiBar = (
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
    {/* ------------------------------------------------------------------------------------- */}
  </>
)

// MAIN FUNCTION
const PillBar: FC<PillBarProps> = ({ variant = "standard", ...props }) => {
  return variant === "multibar" ? multiBar : standardPillBar
}

export default PillBar

// NOTES
// Two different pill bar styles. The multi pill bar has a center main action bar with a separated right aligned "tool" button.
// Intended for actions that need to be kept separated from main pillbar actions.
