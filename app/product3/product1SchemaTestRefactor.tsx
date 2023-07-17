import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer"
import { doc } from "prettier"

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

// generic schemas
const schemaGenericA = {
  checkboxExample: {
    true: {
      bodyA: ["TRUE: Generic schema body A", "second paragraph starts here"],
      headerA: "TRUE: Generic schema header location 2",
      bodyB: ["TRUE: Generic schema body B"],
      listA: ["item a", "item b", "item c"],
    },
    false: {
      bodyA: ["FALSE: Generic schema body A"],
    },
  },
}

const schemaGenericB = {
  checkboxExample: {
    true: {
      headerA: "1. GB: checkbox is true. ",
      bodyA: ["2. GB: checkbox is true"],
    },
    false: {
      bodyA: ["3. GB: checkbox is false"],
    },
  },
}

// location specific schemas
const schemaLocationA = {
  radioExample: {
    option1: {
      bodyA: ["LA: Radio option 1"],
    },
    option2: {
      bodyA: ["LA: Radio option 2"],
    },
    option3: {
      headerA: "LA: Radio option 3 header",
      bodyA: ["LA: Radio option 3 body"],
      headerB: "LA: Radio option 3 header B",
      bodyB: ["LA: Radio option 3 body B"],
      bodyC: ["LA: Radio option 3 body C"],
    },
  },
}

const schemaLocationB = {
  radioExample: {
    option1: {
      bodyA: ["LB: Radio option 1"],
    },
    option2: {
      bodyA: ["LB: Radio option 2"],
    },
  },
}

// helper functions

// get generic schema
const getGenericSchema = ({ selectedLocation }) => {
  switch (selectedLocation) {
    case "location1":
      return schemaGenericA
    case "location2":
      return schemaGenericB
    default:
      return schemaGenericA
  }
}

// get dynamic schema
const getLocationSchema = ({ selectedLocation }) => {
  switch (selectedLocation) {
    case "location1":
      return schemaLocationA
    case "location2":
      return schemaLocationB
    default:
      return schemaLocationA
  }
}

// export from separate file
export const getSchemas = ({ selectedLocation }) => {
  // The schemas are specific to the location so need to be fetched dynamically
  const schemaLocationFiltered = getLocationSchema({ selectedLocation })
  const schemaGenericFiltered = getGenericSchema({ selectedLocation })

  return { schemaLocationFiltered, schemaGenericFiltered } // destructure these and use in the next function. Didn't spread into a single object since the template needs to handle logic from many different locations.
}

// build doc template
// Need to fill the schema with correct formData values
// Create PDF styles
const testStyles = StyleSheet.create({
  h1: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 0,
  },
  body: {
    fontSize: 16,
    marginTop: 0,
    marginBottom: 0,
    padding: 0,
  },
  section: {
    fontSize: 16,
    marginTop: 0,
    marginBottom: 0,
    padding: 0,
  },
  paragraph: {
    marginBottom: 2,
  },
  listUnordered: {
    textIndent: 10,
  },
  listOrdered: {
    textIndent: 10,
  },
  sectionTitle: {
    fontSize: 20,
    borderBottom: "2 solid #ccc",
    paddingTop: 5,
    paddingBottom: 5,
  },
})

const renderPDFComponent = ({
  schemaSectionContent,
  sectionIndex,
  contentIndex,
}) => {
  const sectionNumber = sectionIndex + 1
  const contentNumber = contentIndex + 1

  switch (schemaSectionContent.type) {
    case "header":
      return (
        <Text
          style={testStyles.h1}
        >{`${sectionNumber}. ${schemaSectionContent.value}`}</Text>
      )
    case "subheader":
      return (
        <Text
          style={testStyles.h2}
        >{`${sectionNumber}.${contentIndex} ${schemaSectionContent.value}`}</Text>
      )
    case "body":
      return (
        <View style={testStyles.section}>
          {schemaSectionContent.value.map((item, index) => {
            return (
              <Text key={index} style={testStyles.paragraph}>
                {`${sectionNumber}.${contentIndex} ${item} `}
              </Text>
            )
          })}
        </View>
      )

    case "listUnordered":
      return schemaSectionContent.value.map((item, index) => {
        return (
          <Text key={index} style={testStyles.listUnordered}>
            - {item}
          </Text>
        )
      })
    case "listOrdered":
      return schemaSectionContent.value.map((item, index) => {
        return (
          <Text key={index} style={testStyles.listOrdered}>
            {index + 1}. {item}
          </Text>
        )
      })
    case "sectionTitle":
      return (
        <Text
          {...{ bookmark: schemaSectionContent.value }} // NOTE: Spread bookmark as a Typescript bug workaround. See: https://github.com/diegomura/react-pdf/issues/1979
          style={testStyles.sectionTitle}
          id="test"
        >{`${sectionNumber}.${contentIndex} ${schemaSectionContent.value}`}</Text>
      )
    default:
      return schemaGenericA
  }
}

export const fillDocTemplate = ({ docTemplate, selectedLocation }) => {
  // Render PDF according to docTemplate layout
  return docTemplate.map((schemaSection, sectionIndex) => {
    // get the location array inside each section
    const sectionValidLocations = schemaSection.location

    // See if at least one location matches
    const hasCorrectLocation = sectionValidLocations.some(
      (location: string) => {
        return location === "all" || location === selectedLocation
      }
    )
    // and only return section values that match the location
    if (hasCorrectLocation) {
      // CATCH ERRORS -----------------
      // Check if sectionValidLocations is defined since everything breaks if we don't have this info
      if (!sectionValidLocations) {
        throw new Error(
          `Jurisdiction isn't defined for section: ${JSON.stringify(
            sectionIndex
          )} at index: ${JSON.stringify(sectionIndex)}`
        )
      }

      // ------------------------------ MOVE TO schema content map function
      // Check if the value field exists in content since template is incorrect if this is missing
      // if (schemaSection.value === undefined) {
      //   //return <Text key={sectionIndex}>Nothing to see here</Text>
      //   throw new Error(
      //     `The following section is trying to access a non-existent value in your schema: ${JSON.stringify(
      //       schemaSection.sectionID
      //     )} at index: ${JSON.stringify(sectionIndex)}
      //    \n Troubleshooting: Review the following docTempate schema and also check that schemaGenericFiltered and schemaLocationFiltered are correct as they can lead to undefined values. => ${JSON.stringify(
      //      docTemplate,
      //      null,
      //      2
      //    )}.`
      //   )
      // }
      // End  ----------------

      return schemaSection.content.map((schemaSectionContent, contentIndex) => {
        return renderPDFComponent({
          schemaSectionContent: schemaSectionContent,
          sectionIndex: sectionIndex,
          contentIndex: contentIndex,
        })
      })
    } else {
      return null // to prevent rendering content for sections that don't match the location
    }
  })
}

// render final doc
const buildFinalDoc = ({ formData }) => {
  // get the user's selected location since this determines which parts of docTemplate to use
  const selectedLocation = formData.jurisdiction
  // get schemas
  const { schemaLocationFiltered, schemaGenericFiltered } = getSchemas({
    selectedLocation: selectedLocation,
  })

  // set up doc template
  // NOTE: Be careful using "all" since it can break if the schemaGenericFiltered changes
  const docTemplate = [
    {
      sectionID: "s1",
      location: ["all"], // can be "all" or a specific location
      content: [
        {
          location: ["all"],
          type: "header",
          value:
            schemaGenericFiltered.checkboxExample.true.headerA || // can also have conditional logic values but this should be minimized to avoid confusing schemas
            schemaGenericB.checkboxExample.true.headerA,
        },
        {
          // Can include multiple groups by spreading them into the array
          location: [
            ...locationGroups.locationGroupA,
            ...locationGroups.locationGroupB,
          ],
          type: "body",
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
          type: "body",
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
          type: "listUnordered",
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
          type: "header",
          value: "Hardcoded sectionTitle",
        },
        {
          location: [...locationGroups.locationGroupA],
          type: "sectionTitle",
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

export default buildFinalDoc
