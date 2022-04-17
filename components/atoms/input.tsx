import React, { FC, forwardRef} from 'react'

export const Input = forwardRef(
  (
    {
      id,
      name,
      label,
      type = 'text',
      className = 'mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm',
      ...props
    },
    ref
  ) => {
    return (
      <div className="max-w-sm">
        <label htmlFor="text" className="block text-sm font-medium text-gray-700">
          { label }
        </label>
        <input
          ref={ref}
          name={name}
          type={type}
          aria-label={label}
          className={className}
        />
      </div>
    )
  }
)