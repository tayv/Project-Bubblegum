import React, {FC} from 'react'
import { Input } from '@components/atoms/input'
import { useForm, Controller } from 'react-hook-form'
import { InputProps } from '@components/atoms/input'
import UpdateInputState from '@components/UpdateInputState'


const WrapperInput: FC<InputProps> = ({
  name,
  rules,
  control,
  label,
 // errors,
  onChange,
  defaultValue,
  warnBlur,
  warnChange,
  ...props
}) => {
  
 


  return (
    <div>

      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field }) => (
          <Input label={label} {...field} onChange={e => {
            {warnChange(field.value)}
            field.onChange(e)
          }} onBlur={e => {
            
            {if (warnBlur) {
              const {trigger, include} = warnBlur
              trigger(field.value)}
            } // passed blur prop here
            field.onBlur(e)
          }} />
        )}
      />

    </div>  
  )
}

export default WrapperInput



// Need to pass a custom onChange inside Controller in order to support soft validation/warning messages
  // See https://stackoverflow.com/questions/67917480/onchange-input-in-react-hook-form 


// Able to pass custom onChange and onBlur function props from parent component that can do a custom action. 
  // can be used for soft validation/tip messages.
  // To allow further flexibility, can pass in an object with method and properties to determine if the custom event handler
  // should fire and/or specify custom messages by using a logical && operator