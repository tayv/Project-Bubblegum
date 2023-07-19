import {
  schemaGenericA,
  schemaGenericB,
} from "../_schemas/schemaProductAGeneric"
import {
  locationGroups,
  schemaLocationA,
  schemaLocationB,
} from "../_schemas/schemaProductALocation"
import { SubSchemas, SelectedLocation } from "../_schemas/productTypes"

// TODO: Remove need to import separate schemas

// Document Template Schema
// NOTE: Be careful using "all" since it can break if the schemaGenericFiltered changes
export const createTemplateSchema = <T extends SelectedLocation>(
  schemaLocationFiltered: SubSchemas<T>["schemaLocationFiltered"],
  schemaGenericFiltered: SubSchemas<T>["schemaGenericFiltered"]
) => [
  {
    sectionID: "s1",
    location: ["all"], // can be "all" or a specific location
    content: [
      {
        location: ["all"],
        type: "sectionTitle",
        value: "Hardcoded Section Title",
      },
      {
        location: ["all"],
        type: "paragraph",
        value: [
          "Hardcoded introduction to section. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam",
        ],
      },
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
        type: "sectionTitle",
        value: "Hardcoded Section Title",
      },
      {
        location: [...locationGroups.locationGroupB],
        type: "paragraph",
        value: [
          "Hardcoded introduction to section. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam",
        ],
      },
      {
        location: [...locationGroups.locationGroupB],
        type: "header",
        value: "A header",
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
        type: "sectionTitle",
        value: "Hardcoded Section Title",
      },
      {
        location: [...locationGroups.locationGroupA],
        type: "paragraph",
        value: [
          "Hardcoded introduction to section. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam",
        ],
      },
      {
        location: [...locationGroups.locationGroupA],
        type: "header",
        value: "A header",
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
        type: "sectionTitle",
        value: "Hardcoded Section Title",
      },
      {
        location: [...locationGroups.locationGroupA],
        type: "paragraph",
        value: [
          "Hardcoded introduction to section. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam",
        ],
      },
      {
        location: [...locationGroups.locationGroupA],
        type: "header",
        value: "A header",
      },
      {
        location: [...locationGroups.locationGroupA],
        type: "listUnordered",
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
        value: "Hardcoded Section Title",
      },
      {
        location: [...locationGroups.locationGroupA],
        type: "paragraph",
        value: [
          "Hardcoded introduction to section. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam",
        ],
      },
      {
        location: [...locationGroups.locationGroupA],
        type: "header",
        value: "Hardcoded heading",
      },
      {
        location: [...locationGroups.locationGroupA],
        type: "paragraph",
        value: ["This is a hardcoded paragraph"],
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
