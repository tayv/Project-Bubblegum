import { Ref, forwardRef, SelectHTMLAttributes, FC, ReactNode, RefObject } from 'react'
import * as Select from '@radix-ui/react-select'
import SelectItem from '@components/atoms/atomsRadix/SelectItem'

export type SelectProps = {
  value: string
  name: string
  options: []
  onValueChange: (value: string) => void
  forwardedRef: Ref<HTMLFormElement>
}

const SelectRadix: FC<SelectProps> = forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      options,
      children,
      ...props
    },
    forwardedRef

  ) => {
   return (
      <Select.Root {...props} >
      <Select.Trigger ref={forwardedRef} className="outline-none text-md border-solid border-2 border-slate-500 px-2 hover:bg-white">
        <Select.Value placeholder="select something" aria-label={props.value}></Select.Value>
        <Select.Icon />
      </Select.Trigger>
 
      <Select.Portal>
        <Select.Content className="outline-none border-solid border-2 border-slate-500 bg-white px-2">
          <Select.ScrollUpButton />
          <Select.Viewport>
            { options.map((option: {value: string, labelText: string}, index: number) => {
              return (

                <Select.Item key={index} value={option.value} className="outline-none cursor-pointer hover:bg-sky-300 px-2">
                  <Select.ItemText>{option.labelText}</Select.ItemText>
                  <Select.ItemIndicator />
                </Select.Item>

              )
            } ) }
           <SelectItem value="test" labelText="label test" />

            <Select.Group>
              <Select.Label className="text-sm text-slate-500 pt-2">Greetings</Select.Label>
              <SelectItem value="test2" labelText="label test 2" />
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