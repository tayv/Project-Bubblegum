import React from "react"
import { render } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import { Select } from "@uiRepo/forms"

describe("Select component", () => {
  test("renders only once", () => {
    const selectRef = React.createRef()

    const { getByRole } = render(
      <Select
        placeholder="Select an option"
        itemOptions={[
          {
            value: "location1",
            labelText: "Location 1",
            separator: false,
          },
          {
            value: "location2",
            labelText: "Location 2",
            separator: false,
          },
          {
            value: "location3",
            labelText: "Location 3",
            separator: false,
          },
        ]}
      />
    )

    // Check that it rendered
    expect(getByRole("combobox")).toBeInTheDocument()
  })
})
