export type FormData = {
  checkboxExample?: boolean
  radioExample?: "option1" | "option2" | "option3"
  textExample?: string
  jurisdiction: "location1" | "location2" | "location3"
}

export type DocTemplate = {
  sectionID: string
  location: ["all"] | FormData["jurisdiction"][]
  content: {
    location: ["all"] | ("location1" | "location2" | "location3")[]
    type:
      | "header"
      | "subheader"
      | "paragraph"
      | "listUnordered"
      | "listOrdered"
      | "sectionTitle"
    value: string | string[] // lists need to be mapped so use string[]
  }[]
}[]

// Used to filter sub schemas
export type SelectedLocation = FormData["jurisdiction"]

// SUB SCHEMAS --------------------------
type SchemaLocationA = {
  radioExample: {
    option1: {
      bodyA: string[]
    }
    option2: {
      bodyA: string[]
    }
    option3: {
      headerA: string
      bodyA: string[]
      headerB: string
      bodyB: string[]
      bodyC: string[]
    }
  }
}
type SchemaLocationB = {
  radioExample: {
    option1: {
      bodyA: string[]
    }
    option2: {
      bodyA: string[]
    }
  }
}
type SchemaGenericA = {
  checkboxExample: {
    true: {
      headerA: string
      bodyA: string[]
      bodyB: string[]
      listA: string[]
    }
    false: {
      bodyA: string[]
    }
  }
}
type SchemaGenericB = {
  checkboxExample: {
    true: {
      headerA: string
      bodyA: string[]
    }
    false: {
      bodyA: string[]
    }
  }
}

export type SubSchemas = {
  schemaLocationFiltered: SchemaLocationA | SchemaLocationB
  schemaGenericFiltered: SchemaGenericA | SchemaGenericB
}
// End Sub Schemas --------------------------
