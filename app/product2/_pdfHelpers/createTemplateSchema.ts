import {
  schemaGenericA,
  schemaGenericB,
} from "../_schemas/schemaProductAGeneric"
import {
  locationGroups,
  schemaLocationA,
  schemaLocationB,
} from "../_schemas/schemaProductALocation"
import { SubSchemas } from "../_schemas/productATypes"

// TODO: Remove need to import separate schemas

// Document Template Schema
// NOTE: Be careful using "all" since it can break if the schemaGenericFiltered changes
export const createTemplateSchema = (
  schemaLocationFiltered: SubSchemas["schemaLocationFiltered"],
  schemaGenericFiltered: SubSchemas["schemaGenericFiltered"]
) => [
  {
    sectionID: "s1",
    location: ["all"], // can be "all" or a specific location
    content: [
      {
        location: ["all"],
        type: "header",
        value: schemaGenericB.checkboxExample.true.headerA,
      },
      {
        // Can include multiple groups by spreading them into the array
        location: [
          ...locationGroups.locationGroupA,
          ...locationGroups.locationGroupB,
        ],
        type: "paragraph",
        value: schemaGenericFiltered.checkboxExample.true.bodyA,
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
        type: "paragraph",
        value: schemaLocationFiltered.radioExample.option2.bodyA,
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
        type: "listOrdered",
        value: schemaGenericFiltered.checkboxExample.true.listA,
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
        value: schemaGenericFiltered.checkboxExample.true.listA,
      },
    ],
  },
  {
    sectionID: "s5",
    location: [...locationGroups.locationGroupA],
    content: [
      {
        location: [...locationGroups.locationGroupA],
        type: "sectionTitle",
        value: "Hardcoded sectionTitle",
      },
      {
        location: [...locationGroups.locationGroupA],
        type: "subheader",
        value: "Hardcoded sub header",
      },
      {
        location: [...locationGroups.locationGroupA],
        type: "paragraph",
        value: ["This is a hardcoded paragraph", "This is a second paragraph"],
      },
    ],
  },
]
