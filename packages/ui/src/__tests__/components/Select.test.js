import React from "react"
import { render } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import { Select } from "@uiRepo/forms"

describe("Select component", () => {
  test("renders only once", () => {
    const selectRef = React.createRef()

    const { getByRole } = render(
      <Select
        // onValueChange={onChange}
        value={"test-value"}
        forwardedRef={selectRef}
        placeholder="test-placeholder"
        itemOptions={[
          { value: "first", labelText: "firstText", separator: false },
          { value: "second", labelText: "secondText", separator: true },
        ]}
        data-testid="select-test"
      />
    )

    // Check that it rendered
    expect(getByRole("combobox")).toBeInTheDocument()
  })
})
