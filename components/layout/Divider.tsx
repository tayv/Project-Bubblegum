import { FC } from 'react'

export type DividerProps = {
  type?: "horizontal" | "vertical"
  color?: "standard" | "white"
  width?: "small" | "standard" | "large"
  padding?: "small" | "standard" | "large"
}

const Divider: FC<DividerProps> = ({
  type = "horizontal",
  color = "standard",
  width = "standard",
  padding = "standard",
  ...props
}) => {

  return (
     <div className="flex w-full py-2">
      <div className="bg-black h-0.5 w-full rounded-full"></div>
     </div>
  )
}
  

export default Divider