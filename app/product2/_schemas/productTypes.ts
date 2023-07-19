// All locations supported by the Product
type ProductLocationKeys = "location1" | "location2" | "location3" | "location4"

// Used by supportedLocations.ts
export type SupportedLocationsType = {
  [K in ProductLocationKeys]: K
}

// The shape of the formData when user submits form. This is the user data we use to fill the document template
export type FormDataType = {
  checkboxExample?: boolean
  radioExample?: "option1" | "option2" | "option3"
  textExample?: string
  jurisdiction: ProductLocationKeys[] | ["all"]
}
