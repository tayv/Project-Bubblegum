import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer"

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
  sectionStart: {
    fontSize: 20,
    borderBottom: "2 solid #ccc",
    paddingTop: 5,
    paddingBottom: 5,
  },
})

export const renderPDFComponents = ({
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
    case "sectionStart":
      return (
        <Text
          {...{ bookmark: schemaSectionContent.value }} // NOTE: Spread bookmark as a Typescript bug workaround. See: https://github.com/diegomura/react-pdf/issues/1979
          style={testStyles.sectionStart}
          id="test"
        >{`${sectionNumber}.${contentIndex} ${schemaSectionContent.value}`}</Text>
      )
    default:
      return null
  }
}
