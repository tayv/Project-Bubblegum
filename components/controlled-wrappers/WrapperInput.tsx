import React, {FC, useEffect} from 'react'
import { Input } from '@components/atoms/input'
import { useForm, useWatch, Controller } from 'react-hook-form'
import { InputProps } from '@components/atoms/input'
import UpdateInputState from '@components/UpdateInputState'
import WarningMessage from '@components/utils/WarningMessage'


const WrapperInput: FC<InputProps> = ({
  name,
  rules,
  control,
  label,
 // errors,
  onChange,
  defaultValue,
  tipText,
  exampleText,
  ...props
}) => {  

  const { getValues } = useForm()
  const testWatch = useWatch({
    control,
    name: "controlledInput",
  });
  const regEx = /(a)/g

  return (
    <div>

      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field }) => (
          <Input {...field} // Need to place field above custom event handlers so that the built in handlers are overridden
            label={label} 
            tipText={tipText} 
            exampleText={exampleText} 
            onChange={e => {
              {console.log("TestWatch: ", testWatch)}
              { regEx.test(testWatch) 
              console.log(field.value == "a") }
              field.onChange(e)
              }
            } 
            />
        )}
      />
    <>
    { useEffect( () => console.log("use effect: ", testWatch), [testWatch]) } 
    </>
    </div>  
  )
}

export default WrapperInput