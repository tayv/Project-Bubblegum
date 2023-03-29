import React from 'react'
import { render } from '@testing-library/react'
import SelectRadix from '@atoms/SelectRadix' // why doesn't @atoms/SelectRadix work here?

describe('SelectRadix component', () => {
 
  test('renders only once', () => {
    const selectRef = React.createRef()

    const { getByTestId } = render(
    
      <SelectRadix 
       // onValueChange={onChange}
        value={"test-value"}
        forwardedRef={selectRef}
        placeholder="test-placeholder"
        itemOptions={ [
            {value:"first", labelText:"firstText", separator: false}, 
            {value:"second", labelText:"secondText", separator: true}
          ] }
       // data-testid="test-select"
      />
      
    )
    
    // Verify that the SelectRadix component renders properly

      // Attempt 1:
    expect(selectRef.current).toBe(true) // this fails, returns null

     // Attempt 2:
   // expect(getByTestId('test-select')).toBeInTheDocument() // this fails, unable to find an element by: [data-testid="test-select"]

  })
})
