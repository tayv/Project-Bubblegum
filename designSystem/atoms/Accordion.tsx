import React, { FC, forwardRef, ReactElement } from "react"
import classNames from "classnames"
import * as AccordionRadix from "@radix-ui/react-accordion"
import { Minus, Plus, Lightbulb, AlertCircle } from "lucide-react"

// Types
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

  rootStyle?: RootStyle
  accordionStyle?: AccordionStyle
}

// Conditional Styles
type RootStyle = "standard" | "shrink"
const rootStyleMap: { [key in RootStyle]: string } = {
  standard: "",
  shrink: "flex flex-col shrink",
}

type AccordionStyle = "standard" | "warning" | "tip"
const accordionStyleMap: { [key in AccordionStyle]: string } = {
  standard: "bg-neutral-300",
  warning: "bg-red-300",
  tip: "bg-blue-300",
}

// Sets the icon for each accordionStyle
const iconTypeMap: { [key in AccordionStyle]: ReactElement | null } = {
  standard: null,
  warning: <AlertCircle className=" h-5 w-5 text-red-600" />,
  tip: <Lightbulb className=" h-5 w-5 text-blue-600" />,
}

// Helper Functions
const renderAccordionItems = (
  accordionItems: AccordionItems[],
  accordionStyle: AccordionStyle
) => {
  return accordionItems.map(
    (item: { value: string; headerText: string; contentText: string }) => (
      <AccordionRadix.Item value={item.value} className="mt-1">
        <AccordionRadix.Header
          className={classNames([
            "group flex shadow data-[state=closed]:rounded-md data-[state=open]:rounded-tl-lg data-[state=open]:rounded-tr-lg font-normal", // standard css styles go here.
            accordionStyleMap[accordionStyle],
            // className
          ])}
        >
          {/* This is the clickable header content */}
          <AccordionRadix.Trigger className="inline-flex justify-between items-center px-3 py-2 w-full text-left">
            <div className="flex items-center gap-1.5">
              {iconTypeMap[accordionStyle]}
              {item.headerText}
            </div>
            <Plus className="group-data-[state=open]:hidden h-4 w-4 text-neutral-500" />
            <Minus className="group-data-[state=closed]:hidden h-4 w-4 text-neutral-500" />
          </AccordionRadix.Trigger>
        </AccordionRadix.Header>

        {/* This is the Accordion body content */}
        <AccordionRadix.Content
          className={classNames([
            "data-[state=closed]:w-60 data-[state=open]:w-full px-3 py-2 rounded-br-lg rounded-bl-lg opacity-70",
            accordionStyleMap[accordionStyle],
            // className
          ])}
        >
          {item.contentText}
        </AccordionRadix.Content>
      </AccordionRadix.Item>
    )
  )
}

// Component
const Accordion: FC<MyAccordionProps> = ({
  type,
  items,
  defaultValue,
  collapsible = true,
  rootStyle = "standard",
  accordionStyle = "standard",
}) => (
  <AccordionRadix.Root
    type={type}
    defaultValue={defaultValue}
    collapsible={collapsible}
    className={classNames([
      "max-w-lg", // standard css styles go here.
      rootStyleMap[rootStyle],
      // className
    ])}
  >
    {renderAccordionItems(items, accordionStyle)}
  </AccordionRadix.Root>
)

export default Accordion

// NOTES
// Radix documentation: https://www.radix-ui.com/docs/primitives/components/accordion
// Use data-[state=closed] or data-[state=open] to target open/closed states. For example: data-[state=closed]:w-48 data-[state=open]:w-full
