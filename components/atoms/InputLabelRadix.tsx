import React, { FC, forwardRef } from 'react'
import classNames from 'classnames'
import * as Label from '@radix-ui/react-label' 

export type InputLabelProps = {
 labelText: string
 htmlFor: string
 children: React.ReactElement
} 

export const InputLabel: FC<InputLabelProps> = forwardRef(
  (
    {
      labelText,
      htmlFor,
      children,
      ...props
    },
    ref
  ) => {
    return (
     
    <div>
      <Label.Root htmlFor={htmlFor} className="block text-md font-bold text-gray-900">
        {labelText}
      </Label.Root>
      {children}
    </div>
  
    )
  }
)
