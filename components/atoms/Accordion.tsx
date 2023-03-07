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

const Accordion = () => (
  <AccordionRadix.Root
    className="flex flex-col shrink rounded-md"
    type="single"
   // defaultValue="item-1"
    collapsible
  >
    
    <AccordionRadix.Item value="item-1" className="mt-1">
    <AccordionRadix.Header className="group flex shadow bg-neutral-300 data-[state=closed]:rounded-md data-[state=open]:rounded-tl-lg data-[state=open]:rounded-tr-lg">
     
      <AccordionRadix.Trigger className="inline-flex justify-between items-center px-3 py-2 w-full text-left">
        Is it accessible?
        <PlusIcon className="group-data-[state=open]:hidden h-4 w-4 text-neutral-500 " />
        <MinusIcon className="group-data-[state=closed]:hidden h-4 w-4 text-neutral-500 " />
      </AccordionRadix.Trigger>
      </AccordionRadix.Header>
     
      <AccordionRadix.Content className="data-[state=closed]:w-60 data-[state=open]:w-full bg-neutral-200 px-3 py-2 rounded-br-lg rounded-bl-lg">
        Yes. It adheres to the WAI-ARIA design pattern.
      </AccordionRadix.Content>
    </AccordionRadix.Item>


  </AccordionRadix.Root>


//   <Accordion.Root type="single" collapsible className="flex shrink" > {/* Flex shrink used since can't change Root styles like width using Data Attributes */}
//   <Accordion.Item value={"CalendarOpen"} className="mt-1 ">
//     <Accordion.Header className="group flex shadow data-[state=closed]:w-48 data-[state=open]:w-full bg-neutral-200 data-[state=closed]:rounded-md data-[state=open]:rounded-tl-lg data-[state=open]:rounded-tr-lg">
//       <Accordion.Trigger className="inline-flex justify-between items-center px-3 py-2 w-full text-left ">
       
//       { /* Integrated an input field into Accordian Header so that the form has an input value to submit */}
//         <div className="inline-flex align-left">
        
//           <input 
//             name="name"
//             readOnly 
//             type="text" 
//             className="shrink w-full p-0 m-0 bg-transparent border-none focus:ring-0 text-black cursor-pointer"
//             value="this is a test"
//           />
//         </div>

      
//       </Accordion.Trigger>
//     </Accordion.Header>

//     <Accordion.Content className="data-[state=closed]:w-60 data-[state=open]:w-full">
//       Here's some content
//     </Accordion.Content>
//   </Accordion.Item>
// </Accordion.Root>  
 )

export default Accordion


// NOTES
  // Radix documentation: https://www.radix-ui.com/docs/primitives/components/accordion
  // Use data-[state=closed] or data-[state=open] to target open/closed states. For example: data-[state=closed]:w-48 data-[state=open]:w-full


