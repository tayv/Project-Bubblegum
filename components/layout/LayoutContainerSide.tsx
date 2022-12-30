import { FC, ReactNode } from 'react'
import SideNav from '@components/layout/SideNav'


const LayoutContainerSide = ({children}: any) => {

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 overflow-hidden">
        <SideNav articleList={[
          {title: "Test Form", path: "/forms/test-form"},
          {title: "Breadcrumbs", path: "/forms/breadcrumbs-article"}, 
          {title: "Buttons", path: "/forms/buttons-article"}, 
          {title: "Checkbox", path: "/forms/checkbox-article"}, 
          {title: "Date Pick", path: "/forms/date-pick-article"}, 
          {title: "Label", path: "/forms/label-article"}, 
          {title: "Messages (Help)", path: "/forms/help-messages-article"}, 
          {title: "Messages (System)", path: "/forms/system-messages-article"}, 
          {title: "Radio Buttons", path: "/forms/radio-buttons-article"}, 
          {title: "Sections", path: "/forms/section-article"}, 
          {title: "Select/DropDown", path: "/forms/select-article"}, 
          {title: "Text", path: "/forms/text-article"}, 
          {title: "Kitchen Sink (TBD)", path: "/forms/kitchen-sink"}, 
        ]} />
        <div className="w-full overflow-y-scroll">
         <div className="block max-w-4xl px-4 py-3">{children}</div>
        </div>
     </div>
    </div>
  )
}

export default LayoutContainerSide


