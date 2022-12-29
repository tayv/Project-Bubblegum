import { FC, ReactNode } from 'react'
import SideNav from '@components/layout/SideNav'


const LayoutContainerSide = ({children}: any) => {

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 overflow-hidden">
        <SideNav />
        <div className="block py-3 overflow-y-scroll">{children}</div>
     </div>
    </div>
  )
}

export default LayoutContainerSide


