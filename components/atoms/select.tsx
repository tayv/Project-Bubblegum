import { forwardRef, SelectHTMLAttributes } from 'react'
import * as Select from '@radix-ui/react-select'

export type SelectProps = {
  
}

const SelectItem = forwardRef(
  (
    {children,
    ...props},
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
            <Select.Item value="something" className="outline-none cursor-pointer">
              <Select.ItemText>something</Select.ItemText>
              <Select.ItemIndicator />
            </Select.Item>

            <Select.Group>
              <Select.Label className="text-sm text-slate-500 pt-2">Greetings</Select.Label>
              <Select.Item value="bye" className="outline-none cursor-pointer hover:bg-sky-300 px-2">
                <Select.ItemText>bye bye</Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
              <Select.Item value="hi" className="outline-none cursor-pointer hover:bg-sky-300 px-2">
                <Select.ItemText>howdy</Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
            </Select.Group>

            <Select.Separator />
          </Select.Viewport>
          <Select.ScrollDownButton />
        </Select.Content>
      </Select.Portal>
    </Select.Root>

   )
  }
)

export default SelectItem