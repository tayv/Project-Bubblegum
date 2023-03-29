import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
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

    expect(screen.getByLabelText(labelText)).toBeInTheDocument()
  })
})
