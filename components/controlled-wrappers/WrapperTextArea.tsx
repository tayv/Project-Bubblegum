import React, { FC } from 'react'
import { TextArea, TextAreaProps } from '@components/atoms/textarea'
import { Controller } from 'react-hook-form'

const WrapperTextArea: FC<TextAreaProps> = ({
  name,
  size,
  rules,
  control,
  label,
  onChange,
  tipText,
  exampleText,
  children,
  ...props
}) => {  

  return (
    <div>

      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <TextArea {...field} // Need to place ...field above custom event handlers so that the built in handlers are overridden
            label={label} 
            size={size}
            tipText={tipText} 
            exampleText={exampleText} 
          />
        )}
      />
      {children} {/* Children here will be warning message components, etc. */}
    </div>  
  )
}

export default WrapperTextArea

// Controller documentation
  // Controller supports custom onChange and onBlur. 
    // See https://stackoverflow.com/questions/67917480/onchange-input-in-react-hook-form 
  