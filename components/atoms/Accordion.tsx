import React, { FC, forwardRef } from 'react'
import classNames from 'classnames'
import * as AccordionRadix from '@radix-ui/react-accordion'
import { PlusIcon, MinusIcon } from '@heroicons/react/24/solid'
import { Minus } from 'lucide-react'

type AccordionItems = {
  value: string
  headerText: string
  contentText: string
}

type MyAccordionProps = {
  items: AccordionItems[]
  type: "single" | "multiple" // Determines whether one or multiple items can be opened at the same time.
  defaultValue?: any // this is a workaround for the Radix type and defaultValue prop not working together. Should be string | string[] | undefined.
  collapsible?: boolean // When type is "single", allows closing content when clicking trigger for an open item.
  className?: string
}

const renderAccordionItems = (accordionItems: AccordionItems[]) => {

  return accordionItems.map((item: {value: string, headerText: string, contentText: string}) => (
    
      <AccordionRadix.Item value={item.value} className="mt-1">
      <AccordionRadix.Header className="group flex shadow bg-neutral-300 data-[state=closed]:rounded-md data-[state=open]:rounded-tl-lg data-[state=open]:rounded-tr-lg">
      
        <AccordionRadix.Trigger className="inline-flex justify-between items-center px-3 py-2 w-full text-left">
          <Minus />
          {item.headerText}
          <PlusIcon className="group-data-[state=open]:hidden h-4 w-4 text-neutral-500 " />
          <Minus className="group-data-[state=closed]:hidden " />
        </AccordionRadix.Trigger>
        </AccordionRadix.Header>
      
        <AccordionRadix.Content className="data-[state=closed]:w-60 data-[state=open]:w-full bg-neutral-200 px-3 py-2 rounded-br-lg rounded-bl-lg">
          {item.contentText}
        </AccordionRadix.Content>
      </AccordionRadix.Item>
    
  ))
}

const Accordion:FC<MyAccordionProps> = ({
  items,
  type,
  defaultValue = undefined,
  collapsible = true,
  className = "",
}) => (
  <AccordionRadix.Root
    type={type}
    defaultValue={defaultValue}
    collapsible={collapsible}
    className={ 
      classNames([
        "flex flex-col shrink rounded-md", // standard css styles go here. 
      //  accordionStyleMap[style], 
        className
      ]) }
  >
    
    { renderAccordionItems(items) }
    
  </AccordionRadix.Root>

 )

export default Accordion


// NOTES
  // Radix documentation: https://www.radix-ui.com/docs/primitives/components/accordion
  // Use data-[state=closed] or data-[state=open] to target open/closed states. For example: data-[state=closed]:w-48 data-[state=open]:w-full


