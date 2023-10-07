import { FieldValues } from "react-hook-form"

// All locations supported by the Product
export type AllProductLocationKeys =
  | "all"
  | "location1"
  | "location2"
  | "location3"
  | "location4"
  | "location5"

// Used by supportedLocations.ts
export type AllSupportedLocationsType = {
  [K in AllProductLocationKeys]: K
}

// The shape of the formData when user submits form. This is the user data we use to fill the document template
export type FormDataType = FieldValues
// ------------------------ Example Form Data ------------------------
// {
// checkboxExample?: boolean
// radioExample?: "option1" | "option2" | "option3"
// textExample?: string
// jurisdiction: AllProductLocationKeys
// signingDate: string
// }

// ------------------------ Document Template Types ------------------------
// This is the general shape for the document template schema. Every sub template should follow this shape for rendering logic to work
// Each document template is specifically defined in its file as location keys will vary between templates
// The common type is used in _pdfHelper functions
export type DocTemplateCommonType = {
  sectionID: string
  location: AllProductLocationKeys[] | ["all"]
  condition?: boolean | null
  content: {
    location: AllProductLocationKeys[] | ["all"]
    condition?: boolean | null
    type:
      | "sectionTitle"
      | "header"
      | "subheader"
      | "paragraph"
      | "listUnordered"
      | "listOrdered"
    value: string | string[] // lists and paragraphs use map() so include string[]
  }[]
}[]

// ------------------------ PDF Helper Types ------------------------
export type SelectedTemplateProps = {
  docTemplate: DocTemplateCommonType
  selectedLocation: FormDataType["jurisdiction"]
}
