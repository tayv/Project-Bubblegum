import React, { FC, forwardRef } from 'react'
import classNames from 'classnames'
import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDownIcon } from '@radix-ui/react-icons'

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

const AccordionRadix = () => (
  <Accordion.Root
    className="flex shrink w-64rounded-md shadow-[0_2px_10px] shadow-black/5"
    type="single"
   // defaultValue="item-1"
    collapsible
  >
    
    <Accordion.Item value="item-1" className="mt-1">
    <Accordion.Header className="group flex shadow data-[state=closed]:w-48 data-[state=open]:w-full bg-neutral-200 data-[state=closed]:rounded-md data-[state=open]:rounded-tl-lg data-[state=open]:rounded-tr-lg">
      <Accordion.Trigger className="inline-flex justify-between items-center px-3 py-2 w-full text-left">Is it accessible?</Accordion.Trigger>
      </Accordion.Header>
      <Accordion.Content className="data-[state=closed]:w-60 data-[state=open]:w-full bg-neutral-100">Yes. It adheres to the WAI-ARIA design pattern.</Accordion.Content>
    </Accordion.Item>
  

  </Accordion.Root>


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

export default AccordionRadix


// const AccordionRadix = () => (
//   <Accordion.Root
//     className="bg-mauve6 w-[300px] rounded-md shadow-[0_2px_10px] shadow-black/5"
//     type="single"
//     defaultValue="item-1"
//     collapsible
//   >
//     <Accordion.Item value="item-1" className="focus-within:shadow-mauve12 mt-px overflow-hidden first:mt-0 first:rounded-t last:rounded-b focus-within:relative focus-within:z-10 focus-within:shadow-[0_0_0_2px]">
//       <Accordion.Trigger className="text-violet11 shadow-mauve6 hover:bg-mauve2 group flex h-[45px] flex-1 cursor-default items-center justify-between bg-white px-5 text-[15px] leading-none shadow-[0_1px_0] outline-none">Is it accessible?</Accordion.Trigger>
//       <Accordion.Content className="text-mauve11 bg-mauve2 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden text-[15px]">Yes. It adheres to the WAI-ARIA design pattern.</Accordion.Content>
//     </Accordion.Item>

//   </Accordion.Root>
// )


