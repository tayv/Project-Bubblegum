// set up doc template. There should be one per product ideally
// NOTE: Be careful using "all" since it will apply to all generic and location schemas
export const docTemplate = [
  {
    sectionID: "s1",
    location: ["all"], // can be "all" or a specific location
    content: [
      {
        location: ["all"],
        type: "header",
        value:
          genericSchemaA.checkboxExample.true.headerA || // can also have conditional logic values but this should be minimized to avoid confusing schemas
          genericSchemaB.checkboxExample.true.headerA,
      },
      {
        // Can include multiple groups by spreading them into the array
        location: [
          ...locationGroups.locationGroupA,
          ...locationGroups.locationGroupB,
        ],
        type: "body",
        value: genericSchemaA.checkboxExample.true.bodyA,
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
        value: genericSchemaA.checkboxExample.true.listA,
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
        value: genericSchemaA.checkboxExample.true.listA,
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
