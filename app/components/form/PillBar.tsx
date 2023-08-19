import { FC } from "react"
import { ArrowBigDownDash, ArrowBigUpDash, Wrench } from "lucide-react"

type PillBarProps = {
  variant?: "standard" | "multibar"
}

const PillBar: FC<PillBarProps> = ({ variant = "standard", ...props }) => {
  return (
    <>
      {/* -------------------- Center pillbar with right aligned tool button ------------------- */}
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

          {/* Toolbar options don't need to be collapsed on desktop so hide this for large screens*/}
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
}

export default PillBar
