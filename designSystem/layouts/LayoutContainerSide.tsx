import { FC, ReactNode } from 'react'
import SideNav from '@designSystem/layouts/SideNav'


const LayoutContainerSide = ({children}: any) => {

  return (
    <div className="flex flex-col h-screen bg-zinc-100">
      <div className="flex flex-1 overflow-hidden">
        <SideNav articleList={[
          {title: "Testing", groupTitle: true},
          {title: "Test Form", path: "/docs/test-form"},
          {title: "🧰 Test Document Builder", path: "/restricted/test-document-builder"},
          {title: "Components", groupTitle: true},
          {title: "Navigation", path: "/docs/navigation-article"}, 
          {title: "Buttons", path: "/docs/buttons-article"}, 
          {title: "Checkbox", path: "/docs/checkbox-article"}, 
          {title: "Date Pick", path: "/docs/date-pick-article"}, 
          {title: "Dividers", path: "/docs/dividers-article"}, 
          {title: "Label", path: "/docs/label-article"}, 
          {title: "Messages (Help)", path: "docs/messages-help-article"}, 
          {title: "Messages (System)", path: "/docs/messages-system-article"}, 
          {title: "Radio Buttons", path: "/docs/radio-buttons-article"}, 
          {title: "Select/DropDown", path: "/docs/select-article"}, 
          {title: "Text Styles", path: "/docs/text-styles-article"}, 
          {title: "UI Containers", path: "/docs/ui-containers-article"}, 
        ]} />
        <main className="w-full overflow-y-scroll pt-1">
         <div className="block px-6 py-3">{children}</div>
        </main>
     </div>
    </div>
  )
}

export default LayoutContainerSide


