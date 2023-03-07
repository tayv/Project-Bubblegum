import React, { FC, forwardRef } from 'react'
import classNames from 'classnames'
import * as AccordionRadix from '@radix-ui/react-accordion'
import { PlusIcon, MinusIcon } from '@heroicons/react/24/solid'

type AccordionProps = {
  children: React.ReactNode
  className?: string
}

// const AccordionRadix: FC<AccordionProps> = forwardRef<HTMLDivElement, AccordionProps>( (
//   {
//     children,
//     className = "",
//   },
//   forwardRef
// ) => {
//   return (
//     <div ref={forwardRef} className={classNames("accordion", className)}>
//       {children}
//     </div>
//   )
// })

const renderAccordionItems = (accordionItems) => {

  return accordionItems.map((item: {value: string, headerText: string, contentText: string}) => (
    
      <AccordionRadix.Item value={item.value} className="mt-1">
      <AccordionRadix.Header className="group flex shadow bg-neutral-300 data-[state=closed]:rounded-md data-[state=open]:rounded-tl-lg data-[state=open]:rounded-tr-lg">
      
        <AccordionRadix.Trigger className="inline-flex justify-between items-center px-3 py-2 w-full text-left">
          {item.headerText}
          <PlusIcon className="group-data-[state=open]:hidden h-4 w-4 text-neutral-500 " />
          <MinusIcon className="group-data-[state=closed]:hidden h-4 w-4 text-neutral-500 " />
        </AccordionRadix.Trigger>
        </AccordionRadix.Header>
      
        <AccordionRadix.Content className="data-[state=closed]:w-60 data-[state=open]:w-full bg-neutral-200 px-3 py-2 rounded-br-lg rounded-bl-lg">
          {item.contentText}
        </AccordionRadix.Content>
      </AccordionRadix.Item>
    
  ))
}

const Accordion:FC<AccordionProps> = () => (
  <AccordionRadix.Root
    className="flex flex-col shrink rounded-md"
    type="single"
    defaultValue="item-1"
    collapsible
  >
    
    { renderAccordionItems([{ 
        value: "item-1", 
        headerText: "Is it accessible lol?", 
        contentText: "Yes. It adheres to the WAI-ARIA design pattern."
      }, 
      { value: "item-2", 
        headerText: "Is it pretty lol?", 
        contentText: "Not yet"
      }
    ]) }
    
  </AccordionRadix.Root>

 )

export default Accordion


// NOTES
  // Radix documentation: https://www.radix-ui.com/docs/primitives/components/accordion
  // Use data-[state=closed] or data-[state=open] to target open/closed states. For example: data-[state=closed]:w-48 data-[state=open]:w-full


