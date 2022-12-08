import { Ref, forwardRef, SelectHTMLAttributes, FC, ReactNode, RefObject } from 'react'
import * as Select from '@radix-ui/react-select'
import { ChevronDownIcon } from '@heroicons/react/24/solid'

export type SelectItemProps = {
  value: string
  labelText: string
  
}

const SelectItem: FC<SelectItemProps> = 
  (
    {
      value,
      labelText,
      children,
      ...props
    },
    forwardedRef

  ) => {
   return (

      <Select.Item value={value} className="outline-none cursor-pointer">
        <Select.ItemText>{labelText}</Select.ItemText>
        <Select.ItemIndicator />
        <Select.Separator className="h-px bg-slate-300"/>
      </Select.Item>

   )
  }


export default SelectItem

// Radix documentation: https://www.radix-ui.com/docs/primitives/components/select 