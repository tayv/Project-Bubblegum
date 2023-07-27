import { supportedLocationGroups } from "./supportedLocations"
import { FormDataType } from "./productTypes"
import { FieldValues } from "react-hook-form"

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
  formData: FieldValues
): DocTemplateAType => [
  {
    sectionID: "s1",
    location: ["all"], // can be "all" or a specific location
    content: [
      {
        location: ["all"],
        type: "sectionTitle",
        value: "This is a section title",
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
        value: "Conditional header: checkbox true",
      },
      {
        // Can include multiple groups by spreading them into the array
        location: [
          ...supportedLocationGroups.locationGroupA,
          ...supportedLocationGroups.locationGroupB,
        ],
        type: "paragraph",
        value: [
          "Conditional paragraph: checkbox is true",
          "Second paragraph starts here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam",
        ],
      },
      {
        location: [...supportedLocationGroups.locationGroupB],
        type: "paragraph",
        value: [
          "Conditional paragraph: checkbox is true",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam.",
        ],
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
          "Introduction to section. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam.",
        ],
      },
      {
        location: [...supportedLocationGroups.locationGroupB],
        type: "header",
        value: "This is a header",
      },
      {
        location: [...supportedLocationGroups.locationGroupB],
        type: "paragraph",
        value: [
          "Location: Radio option 2 paragraph",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam.",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam",
        ],
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
        value: "This is another section title",
      },
      {
        location: [...supportedLocationGroups.locationGroupA],
        type: "paragraph",
        value: [
          "Introduction to section. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam",
        ],
      },
      {
        location: [...supportedLocationGroups.locationGroupA],
        type: "header",
        value: "A header to an ordered list:",
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
        value: "Here lies a section title",
      },
      {
        location: [...supportedLocationGroups.locationGroupA],
        type: "paragraph",
        value: [
          "Introduction to section. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam",
          "Second paragraph: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam.",
          "Third paragraph: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam.",
          "Fourth paragraph: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam.",
        ],
      },
      {
        location: [...supportedLocationGroups.locationGroupA],
        type: "header",
        value: "A header to an unordered list:",
      },
      {
        location: [...supportedLocationGroups.locationGroupA],
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
        value: "Hardcoded section title",
      },
      {
        location: [...supportedLocationGroups.locationGroupA],
        type: "paragraph",
        value: [
          "Hardcoded introduction to section. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam.",
        ],
      },
      {
        location: [...supportedLocationGroups.locationGroupA],
        type: "header",
        value: "A heading",
      },
      {
        location: [...supportedLocationGroups.locationGroupA],
        type: "paragraph",
        value: [
          "This is a paragraph",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam.",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam.",
        ],
      },
      {
        location: [...supportedLocationGroups.locationGroupA],
        type: "subheader",
        value: "This is a sub header",
      },
      {
        location: [...supportedLocationGroups.locationGroupA],
        type: "paragraph",
        value: [
          "This is a paragraph",
          "This is a second paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam.",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam.",
        ],
      },
    ],
  },
  {
    sectionID: "s6",
    location: [...supportedLocationGroups.locationGroupA],
    content: [
      {
        location: [...supportedLocationGroups.locationGroupA],
        type: "sectionTitle",
        value: "The last section",
      },
      {
        location: [...supportedLocationGroups.locationGroupA],
        type: "paragraph",
        value: [
          "Introduction to section. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam.",
        ],
      },
      {
        location: [...supportedLocationGroups.locationGroupA],
        type: "header",
        value: "A heading",
      },
      {
        location: [...supportedLocationGroups.locationGroupA],
        type: "paragraph",
        value: [
          "This is a paragraph",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam.",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam.",
        ],
      },
      {
        location: [...supportedLocationGroups.locationGroupA],
        type: "subheader",
        value: "This is a sub header",
      },
      {
        location: [...supportedLocationGroups.locationGroupA],
        type: "paragraph",
        value: [
          "This is a paragraph",
          "This is a second paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam.",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam.",
        ],
      },
      {
        location: [...supportedLocationGroups.locationGroupA],
        type: "subheader",
        value: "This is a sub header",
      },
      {
        location: [...supportedLocationGroups.locationGroupA],
        type: "paragraph",
        value: [
          "This is a paragraph",
          "This is a second paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam.",
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, vitae aliquam.",
        ],
      },
    ],
  },
]
