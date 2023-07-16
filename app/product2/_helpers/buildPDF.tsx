import { combineSchemas } from "./combineSchemas"
import { fillDocTemplate } from "./fillDocTemplate"
import {
  genericSchemaA,
  genericSchemaB,
} from "../_schemas/schemaProductAGeneric"
import {
  schemaLocationA,
  schemaLocationB,
} from "../_schemas/schemaProductALocation"

// suppported location groups
// Used to build docTemplate from correct schemas
// Intended to be used to batch closely related locations/countries so the number of genericSchemas can be limited
const locationGroups = {
  locationGroupA: ["location1", "location3"],
  locationGroupB: ["location2"],
}
const allLocations = [
  ...locationGroups.locationGroupA,
  ...locationGroups.locationGroupB,
]

// helper functions

// render final doc
const buildPDF = ({ formData }) => {
  // get the user's selected location since this determines which parts of docTemplate to use
  const selectedLocation = formData.jurisdiction
  // get schemas
  const { locationSchema, genericSchema } = combineSchemas({
    selectedLocation: selectedLocation,
  })

  // set up doc template
  // NOTE: Be careful using "all" since it can break if the genericSchema changes
  const docTemplate = [
    {
      sectionID: "s1",
      location: ["all"], // can be "all" or a specific location
      content: [
        {
          location: ["all"],
          type: "header",
          value:
            genericSchema.checkboxExample.true.headerA || // can also have conditional logic values but this should be minimized to avoid confusing schemas
            genericSchemaB.checkboxExample.true.headerA,
        },
        {
          // Can include multiple groups by spreading them into the array
          location: [
            ...locationGroups.locationGroupA,
            ...locationGroups.locationGroupB,
          ],
          type: "body",
          value: genericSchema.checkboxExample.true.bodyA,
        },
      ],
    },
    {
      sectionID: "s2",
      location: [...locationGroups.locationGroupB],
      content: [
        {
          location: [...locationGroups.locationGroupB],
          type: "header",
          value: "Section 2 Header",
        },
        {
          location: [...locationGroups.locationGroupB],
          type: "body",
          value: locationSchema.radioExample.option2.bodyA,
        },
      ],
    },
    {
      sectionID: "s3",
      location: [...locationGroups.locationGroupA],
      content: [
        {
          location: [...locationGroups.locationGroupA],
          type: "header",
          value: "Section 3 Header",
        },
        {
          location: [...locationGroups.locationGroupA],
          type: "listUnordered",
          value: genericSchema.checkboxExample.true.listA,
        },
      ],
    },
    {
      sectionID: "s4",
      location: [...locationGroups.locationGroupA],
      content: [
        {
          location: [...locationGroups.locationGroupA],
          type: "header",
          value: "Section 4 Header",
        },
        {
          location: [...locationGroups.locationGroupA],
          type: "listOrdered",
          value: genericSchema.checkboxExample.true.listA,
        },
      ],
    },
    {
      sectionID: "s5",
      location: [...locationGroups.locationGroupA],
      content: [
        {
          location: [...locationGroups.locationGroupA],
          type: "header",
          value: "Hardcoded sectionStart",
        },
        {
          location: [...locationGroups.locationGroupA],
          type: "sectionStart",
          value: "A New Section Starts Here",
        },
      ],
    },
  ]

  const generatedDoc = fillDocTemplate({
    docTemplate: docTemplate,
    selectedLocation: selectedLocation,
  })

  return generatedDoc
}

export default buildPDF
