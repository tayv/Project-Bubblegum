import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import { Checkbox } from "@uiRepo/forms"

// Extend JestMatchers to include toBeInTheDocument. Impacts all test files in the app.
declare global {
  namespace jest {
    interface Matchers<R, T> {
      toBeInTheDocument(): R
    }
  }
}

describe("Test Checkbox", () => {
  it("renders with label", () => {
    const labelText = "Example Label"
    const { getByLabelText } = render(<Checkbox>This is a label</Checkbox>)

    expect(screen.getByLabelText(labelText)).toBeInTheDocument()
  })
})
