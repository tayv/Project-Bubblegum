import { Ref, forwardRef, SelectHTMLAttributes, FC, ReactNode, RefObject } from 'react'
import * as Select from '@radix-ui/react-select'
import SelectItem from '@components/atoms/atomsRadix/SelectItem'

export type SelectRadixProps = {
  value: string
  name: string
  placeholder: string
  options: Array<{value: string, labelText: string, separator: Boolean}>
  onValueChange: (value: string) => void
  forwardedRef: Ref<HTMLFormElement>
}

const SelectRadix: FC<SelectRadixProps> = forwardRef<HTMLButtonElement, SelectRadixProps>(
  (
    {
      placeholder,
      options,
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
              { options.map((option: {value: string, labelText: string, separator: Boolean}, index: number) => {
                return (
                <>
                  <Select.Label className="text-sm text-slate-500 pt-2">Greetings</Select.Label>
                  
                  { option.options.map((option: {value: string, labelText: string, separator: Boolean}, index: number) => {
                    return (
                    <Select.Item key={index} value={option.value} className="outline-none cursor-pointer hover:bg-sky-300 px-2">
                      <Select.ItemText>{option.labelText}</Select.ItemText>
                      <Select.ItemIndicator />
                      { (option.separator) && <Select.SelectSeparator className="h-px bg-slate-300" /> }
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