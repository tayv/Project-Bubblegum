// base schema

{
  "checkboxExample": {
    "true": {
      "a_body": "Sometimes",
      "b_body": "Always",
      "b_header": "This is a header"
    },
    "false": {
      "a_body": "Never",
      "b_body": "Never Ever"
    }
  },
  "radioExample": {
    "option1": {
      "a_body": "hello It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
    },
    "option2": {
      "a_body": "hello"
    },
    "option3": {
      "a_header": "This is a header",
      "a_body": "This is a body",
      "b_header": "This is a second Header",
      "b_body": "Second body text here",
      "body_b": "This is a body",
      "bodyA": "This is a body",
      "bodyB": "This is a body"
    }
  }
}

// Location specific schema
[{
  "page": [
    {
      "header": "option3.a_header",
      "body": "<DynamicTemplateContent watchedInputName="checkboxExample" condition="a_body" />"
    },
    {
      "header": "This is a second Header",
      "body": "Second body text here"
    }
  ]
},{}]

// helper functions

// get generic schema
const getGenericSchema = ({ selectedLocation } ) => {
  switch (selectedLocation) {
    case 'locationA':
      return schemaLocationA
    case 'locationB':
      return schemaLocationB
    case 'locationC':
      return schemaLocationC
    default:
      return defaultSchema
  }
}

// get dynamic schema
const getLocationSchema = ({ selectedLocation } ) => {
  switch (selectedLocation) {
    case 'locationA':
      return schemaLocationA
    case 'locationB':
      return schemaLocationB
    case 'locationC':
      return schemaLocationC
    default:
      return defaultSchema
  }
}

// export from separate file
export const getSchemas = ({ formData }) => {

  // The schemas are specific to the location so need to be fetched dynamically
  const selectedLocation = formData.location
  const locationSchema = getLocationSchema(selectedLocation)
  const genericSchema = getGenericSchema(selectedLocation)

  return (
    { locationSchema, genericSchema } // destructure these and use in the next function. Didn't spread into a single object since the template needs to handle logic from many different locations.
  )
}

// build doc template
// Need to fill the schema with correct formData values

export const fillDocTemplate = ( { formData } ) => {

  
}



// render final doc

export const buildFinalDoc = ( { formData } ) => {
  section1: [
    {
      location: ["all"],
      type: "header", 
      value: baseA.checkboxExample.option3.a_header 
    },
    {
      location: ["locationA", "locationB"],
      type: "body", 
      value: locationA.option3.a_body
    }
  ]
}