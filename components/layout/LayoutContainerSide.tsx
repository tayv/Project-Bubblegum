import { FC, ReactNode } from 'react'
import SideNav from '@components/layout/SideNav'


const LayoutContainerSide = ({children}: any) => {

  return (
    <div className="min-h-screen flex flex-initial flex-row">
     <SideNav />
     <div className="py-3">{children}</div>
    </div>
  )
}

export default LayoutContainerSide


