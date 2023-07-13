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
const genericSchemaA = {
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

const genericSchemaB = {
  checkboxExample: {
    true: {
      headerA: "Using generic schema B",
      bodyA: ["TRUE: Generic schema body A"],
    },
    false: {
      bodyA: ["FALSE: Generic schema body A"],
    },
  },
}

// location specific schemas
const schemaLocationA = {
  radioExample: {
    option1: {
      bodyA: ["Schema location A was selected"],
    },
    option2: {
      bodyA: ["hello"],
    },
    option3: {
      headerA: "This is a header",
      bodyA: ["This is a body"],
      headerB: "This is a second Header",
      bodyB: ["Second body text here"],
      bodyC: ["This is a body"],
    },
  },
}

const schemaLocationB = {
  radioExample: {
    option1: {
      bodyA: [
        "hello It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
      ],
    },
    option2: {
      bodyA: ["Schema Location B"],
    },
  },
}

// helper functions

// get generic schema
const getGenericSchema = ({ selectedLocation }) => {
  // NOTE: Should create a separate docTemplate for each genericSchema otherwise can't use location "all" since changing genericSchema will result in undefined values
  switch (selectedLocation) {
    case "location1":
      return genericSchemaA
    case "location2":
      return genericSchemaB
    default:
      return genericSchemaA
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
  const locationSchema = getLocationSchema({ selectedLocation })
  const genericSchema = getGenericSchema({ selectedLocation })

  return { locationSchema, genericSchema } // destructure these and use in the next function. Didn't spread into a single object since the template needs to handle logic from many different locations.
}

// build doc template
// Need to fill the schema with correct formData values
// Create PDF styles
const testStyles = StyleSheet.create({
  h1: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  body: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
  },
  section: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
  },
  paragraph: {
    marginBottom: 8,
  },
  listUnordered: {
    textIndent: 10,
  },
  listOrdered: {
    textIndent: 10,
  },
  sectionStart: {
    fontSize: 20,
    borderBottom: "2 solid #ccc",
    paddingTop: 5,
    paddingBottom: 5,
  },
})

const renderPDFComponent = ({ schemaSection }) => {
  switch (schemaSection.type) {
    case "header":
      return <Text style={testStyles.h1}>{schemaSection.value}</Text>
    case "body":
      return (
        <View style={testStyles.section}>
          {schemaSection.value.map((item, index) => {
            return (
              <Text key={index} style={testStyles.paragraph}>
                {item}
              </Text>
            )
          })}
        </View>
      )

    case "listUnordered":
      return schemaSection.value.map((item, index) => {
        return (
          <Text key={index} style={testStyles.listUnordered}>
            - {item}
          </Text>
        )
      })
    case "listOrdered":
      return schemaSection.value.map((item, index) => {
        return (
          <Text key={index} style={testStyles.listOrdered}>
            {index + 1}. {item}
          </Text>
        )
      })
    case "sectionStart":
      return <Text style={testStyles.sectionStart}>{schemaSection.value}</Text>
    default:
      return genericSchemaA
  }
}

export const fillDocTemplate = ({ docTemplate, selectedLocation }) => {
  // Render PDF according to docTemplate layout
  return docTemplate.map((schemaSection, sectionIndex) => {
    // get the location array inside each section
    const sectionValidLocations = schemaSection.location

    // CATCH ERRORS -----------------
    // Check if sectionValidLocations is defined since everything breaks if we don't have this info
    if (!sectionValidLocations) {
      throw new Error(
        `Jurisdiction isn't defined for section: ${JSON.stringify(
          sectionIndex
        )} at index: ${JSON.stringify(sectionIndex)}`
      )
    }
    // Check if the value field exists since template is incorrect if this is missing
    if (schemaSection.value === undefined) {
      throw new Error(
        `The following section is trying to access a non-existent value in your schema: ${JSON.stringify(
          schemaSection,
          null,
          2
        )} at index: ${JSON.stringify(sectionIndex)} 
         \n Troubleshooting: Review the following docTempate schema and also check that genericSchema and locationSchema are correct as they can lead to undefined values. => ${JSON.stringify(
           docTemplate,
           null,
           2
         )}.`
      )
    }
    // End catch errors ----------------

    // See if at least one location matches
    const hasCorrectLocation = sectionValidLocations.some(
      (location: string) => {
        return location === "all" || location === selectedLocation
      }
    )
    // and only return section values that match the location
    if (hasCorrectLocation) {
      return renderPDFComponent({ schemaSection }) // This could potentially just be a condition to render a style. Need to figure out how to handle lists though
    } else {
      return <Text key={sectionIndex}>Failed</Text>
    }
  })
}

// render final doc
const buildFinalDoc = ({ formData }) => {
  console.log("buildFinalDoc formData", formData)
  // get the user's selected location since this determines which parts of docTemplate to use
  const selectedLocation = formData.jurisdiction
  // get schemas
  const { locationSchema, genericSchema } = getSchemas({
    selectedLocation: selectedLocation,
  })

  // set up doc template
  // NOTE: Be careful using "all" since it can break if the genericSchema changes
  const docTemplate = [
    {
      location: ["all"],
      type: "header",
      value:
        genericSchema.checkboxExample.true.headerA ||
        genericSchemaB.checkboxExample.true.headerA,
    },
    {
      location: [
        ...locationGroups.locationGroupA,
        ...locationGroups.locationGroupB,
      ],
      type: "body",
      value: genericSchema.checkboxExample.true.bodyA,
    },
    {
      location: [...locationGroups.locationGroupB],
      type: "body",
      value: locationSchema.radioExample.option2.bodyA,
    },
    {
      location: [...locationGroups.locationGroupA],
      type: "listUnordered",
      value: genericSchema.checkboxExample.true.listA,
    },
    {
      location: [...locationGroups.locationGroupA],
      type: "listOrdered",
      value: genericSchema.checkboxExample.true.listA,
    },
    {
      location: [...locationGroups.locationGroupA],
      type: "sectionStart",
      value: "A New Section Starts Here",
    },
  ]

  const generatedDoc = fillDocTemplate({
    docTemplate: docTemplate,
    selectedLocation: selectedLocation,
  })

  return generatedDoc
}

export default buildFinalDoc
