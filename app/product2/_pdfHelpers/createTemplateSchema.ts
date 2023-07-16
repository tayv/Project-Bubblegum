import { locationGroups } from "../_schemas/schemaProductALocationGroups"
import {
  genericSchemaA,
  genericSchemaB,
} from "../_schemas/schemaProductAGeneric"
import {
  schemaLocationA,
  schemaLocationB,
} from "../_schemas/schemaProductALocation"

// TODO: Remove need to import separate schemas

// Document Template Schema
// NOTE: Be careful using "all" since it can break if the genericSchema changes
export const createTemplateSchema = (locationSchema, genericSchema) => [
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
