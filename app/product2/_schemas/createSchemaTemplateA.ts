import { supportedLocationGroups } from "./supportedLocations"
import { FormDataType } from "./productTypes"

// TYPES ------------------
// The locations supported by this document template (may be a subset of all locations supported by the product)
export type LocationKeysDocTemplateA = "location1" | "location2" | "location3"
// Each document template should follow this shape so rendering logic works
export type DocTemplateAType = {
  sectionID: string
  location: LocationKeysDocTemplateA[] | ["all"]
  condition?: boolean | null
  content: {
    location: LocationKeysDocTemplateA[] | ["all"]
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

// MAIN FUNCTION ------------------
export const createSchemaTemplateA = (
  formData: FormDataType
): DocTemplateAType => [
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
        condition: formData.checkboxExample,
        value: [
          "Depends on checkbox answer. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam",
        ],
      },
      {
        location: ["all"],
        type: "header",
        condition: formData.checkboxExample,
        value: "GB Header: checkbox true",
      },
      {
        // Can include multiple groups by spreading them into the array
        location: [
          ...supportedLocationGroups.locationGroupA,
          ...supportedLocationGroups.locationGroupB,
        ],
        type: "paragraph",
        value: ["TRUE: Generic schema body A", "second paragraph starts here"],
      },
      {
        location: [...supportedLocationGroups.locationGroupB],
        type: "paragraph",
        value: ["GB: checkbox is true"],
      },
    ],
  },
  {
    sectionID: "s2",
    location: [...supportedLocationGroups.locationGroupB],
    condition: formData.radioExample === "option2",
    content: [
      {
        location: ["location3"],
        type: "sectionTitle",
        value: "Section: location 3 + radio option 2 selected",
      },
      {
        location: [...supportedLocationGroups.locationGroupB],
        type: "paragraph",
        value: [
          "Hardcoded introduction to section. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam",
        ],
      },
      {
        location: [...supportedLocationGroups.locationGroupB],
        type: "header",
        value: "A header",
      },
      {
        location: [...supportedLocationGroups.locationGroupB],
        type: "paragraph",
        value: ["Location: Radio option 2 paragraph"],
      },
    ],
  },
  {
    sectionID: "s3",
    location: [...supportedLocationGroups.locationGroupA],
    content: [
      {
        location: [...supportedLocationGroups.locationGroupA],
        type: "sectionTitle",
        value: "Hardcoded Section Title",
      },
      {
        location: [...supportedLocationGroups.locationGroupA],
        type: "paragraph",
        value: [
          "Hardcoded introduction to section. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam",
        ],
      },
      {
        location: [...supportedLocationGroups.locationGroupA],
        type: "header",
        value: "A header",
      },
      {
        location: [...supportedLocationGroups.locationGroupA],
        type: "listOrdered",
        value: ["item a", "item b", "item c"],
      },
    ],
  },
  {
    sectionID: "s4",
    location: [...supportedLocationGroups.locationGroupA],
    content: [
      {
        location: [...supportedLocationGroups.locationGroupA],
        type: "sectionTitle",
        value: "Hardcoded Section Title",
      },
      {
        location: [...supportedLocationGroups.locationGroupA],
        type: "paragraph",
        value: [
          "Hardcoded introduction to section. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam",
        ],
      },
      {
        location: [...supportedLocationGroups.locationGroupA],
        type: "header",
        value: "A header",
      },
      {
        location: ["location2"],
        type: "listUnordered",
        value: ["item a", "item b", "item c"],
      },
    ],
  },
  {
    sectionID: "s5",
    location: [...supportedLocationGroups.locationGroupA],
    content: [
      {
        location: [...supportedLocationGroups.locationGroupA],
        type: "sectionTitle",
        value: "Hardcoded Section Title",
      },
      {
        location: [...supportedLocationGroups.locationGroupA],
        type: "paragraph",
        value: [
          "Hardcoded introduction to section. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam",
        ],
      },
      {
        location: [...supportedLocationGroups.locationGroupA],
        type: "header",
        value: "Hardcoded heading",
      },
      {
        location: [...supportedLocationGroups.locationGroupA],
        type: "paragraph",
        value: ["This is a hardcoded paragraph"],
      },
      {
        location: [...supportedLocationGroups.locationGroupA],
        type: "subheader",
        value: "Hardcoded sub header",
      },
      {
        location: [...supportedLocationGroups.locationGroupA],
        type: "paragraph",
        value: ["This is a hardcoded paragraph", "This is a second paragraph"],
      },
    ],
  },
]
