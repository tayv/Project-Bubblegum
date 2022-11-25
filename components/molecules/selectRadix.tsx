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

const SelectRadix: FC<SelectRadixProps> = forwardRef<HTMLButtonElement, SelectRadixProps>(
  (
    {
      placeholder,
      itemOptions,
      children,
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

            <Select.Group>
              { itemOptions.map((itemOption: ItemOptions, index: number) => {
                return (
                <>
                  <Select.Label key={"a" + index} className="text-sm text-slate-500 pt-2">{itemOption.groupLabel}</Select.Label>
                  
                  { itemOption.items.map((item: ItemDetails, index: number) => {
                    return (
                      <Select.Item key={index} value={item.value} className="outline-none cursor-pointer hover:bg-sky-300 px-2">
                        <Select.ItemText key={"b" + index}>{item.labelText}</Select.ItemText>
                        <Select.ItemIndicator key={"c" + index} />
                        
                        { (item.separator) && <Select.SelectSeparator key={"d" + index} className="h-px bg-slate-300" /> } 
                      </Select.Item>
                    )
                  })}
                 
                </>
                )
              } ) }
            </Select.Group>

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