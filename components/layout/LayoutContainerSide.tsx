import { FC, ReactNode } from 'react'
import SideNav from '@components/layout/SideNav'


const LayoutContainerSide = ({children}: any) => {

  return (
    <div className="flex flex-col h-screen bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-300">
      <div className="flex flex-1 overflow-hidden">
        <SideNav articleList={[
          {title: "Test Form", path: "/forms/test-form"},
          {title: "Navigation", path: "/forms/navigation-article"}, 
          {title: "Buttons", path: "/forms/buttons-article"}, 
          {title: "Checkbox", path: "/forms/checkbox-article"}, 
          {title: "Date Pick", path: "/forms/date-pick-article"}, 
          {title: "Label", path: "/forms/label-article"}, 
          {title: "Messages (Help)", path: "/forms/messages-help-article"}, 
          {title: "Messages (System)", path: "/forms/messages-system-article"}, 
          {title: "Radio Buttons", path: "/forms/radio-buttons-article"}, 
          {title: "UI Cards", path: "/forms/ui-cards-article"}, 
          {title: "Select/DropDown", path: "/forms/select-article"}, 
          {title: "Text Styles", path: "/forms/text-styles-article"}, 
          {title: "Kitchen Sink (TBD)", path: "/forms/kitchen-sink"}, 
        ]} />
        <main className="w-full overflow-y-scroll pt-1">
         <div className="block max-w-4xl px-6 py-3 ">{children}</div>
        </main>
     </div>
    </div>
  )
}

export default LayoutContainerSide


