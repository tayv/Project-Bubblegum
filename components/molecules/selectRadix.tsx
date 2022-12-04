import { Ref, forwardRef, SelectHTMLAttributes, FC, ReactNode, RefObject } from 'react'
import * as Select from '@radix-ui/react-select'

export type ItemDetails = { value: string, labelText: string, separator: Boolean }

export type ItemOptions = { groupLabel: string | null, items: Array<ItemDetails> }

export type SelectRadixProps = {
  value: string
  name: string
  placeholder: string
  itemOptions: Array<ItemOptions>
  onValueChange: (value: string) => void
  forwardedRef: Ref<HTMLFormElement>
}

// Utility functions for this component
const renderItems = (itemOptions) => {
  return (
    <>
    { itemOptions[0].items.map((item: ItemDetails, index: number) => {
      return (
      
        <Select.Item key={index} value={item.value} className="outline-none cursor-pointer hover:bg-sky-300 px-2">
          <Select.ItemText>{item.labelText}</Select.ItemText>
          <Select.ItemIndicator />
          { (item.separator) && <Select.SelectSeparator className="h-px bg-slate-300" /> } 
        </Select.Item>
   
      )
    }) }
    </>
  )
}

const renderGroupedItems = (itemOptions) => {
  return (
    <>
      { itemOptions.map((itemOption: ItemOptions, index: number) => {
        return (
          <Select.Group key={index}>

            {/*  One label per group. It's not reachable via keyboard and used only for the respective group of items. It's different from the input's label. */}
            <Select.Label key={itemOption.groupLabel} className="text-sm text-slate-500 pt-2">{itemOption.groupLabel}</Select.Label>
            { renderItems(itemOption)}

          </Select.Group>
        )
      } ) }
    </>
  )
}


const SelectRadix: FC<SelectRadixProps> = forwardRef<HTMLButtonElement, SelectRadixProps>(
  (
    {
      placeholder,
      itemOptions,
      children,
      isGroup,
      ...props
    },
    forwardedRef

  ) => {

   return (
      <Select.Root {...props} >
      <Select.Trigger ref={forwardedRef} className="outline-none text-md border-solid border-2 border-slate-500 px-2 hover:bg-white">
        <Select.Value placeholder={placeholder} />
        <Select.Icon />
      </Select.Trigger>
 
      <Select.Portal>
        <Select.Content className="outline-none border-solid border-2 border-slate-500 bg-white py-1 px-2">
          <Select.ScrollUpButton />
          <Select.Viewport>
              {/* Need a condition here to check whether to render grouped lists vs standard select  */}
              { isGroup ? renderGroupedItems(itemOptions) : renderItems(itemOptions) }

          </Select.Viewport>
          <Select.ScrollDownButton />
        </Select.Content>
      </Select.Portal>
    </Select.Root>

   )
  }
)

export default SelectRadix

// Radix documentation: https://www.radix-ui.com/docs/primitives/components/select 

// Usage
  // To hide group label: Assign groupLabel value to null