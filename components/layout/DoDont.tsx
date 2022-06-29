import { FC } from 'react'

export type DoDontProps = {
  type?: "do" | "dont",
  text?: string | number,
  image?: "test.jpg" 
}

const DoDont: FC<DoDontProps> = ({
  type,
  text,
  ...props
}) => {

  return (
    <>
     <div className="grid grid-cols-2 gap-2 pt-1 p-4 text-left border-solid border-2 border-sky-500 bg-sky-100">
      <div>
        <div className="font-bold text-lg pt-2 pb-4">🙌 Do</div>
        <div className="pb-1">Do this</div>
        <div className="pb-1">And this</div>
      </div>
      <div>
        <div className="font-bold text-lg pt-2 pb-4">🙅‍♀️ Don't</div> 
        <div className="pb-1">Don't do this</div>
        <div className="pb-1">Or this</div>
      </div>    
    </div>
  </>
  )
}
  

export default DoDont