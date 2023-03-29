import { render } from '@testing-library/react'
import Checkbox from '@atoms/Checkbox.tsx'

describe('Test Checkbox', () => {
  it('renders with label', () => {
    const labelText = 'Example Label'
    const { getByLabelText } = render(
      <Checkbox 
        id="test-checkbox" 
        style="standard" 
        label={labelText}
      />
    )

    expect(getByLabelText(labelText)).toBeInTheDocument()
  })
})
