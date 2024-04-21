"use client"
import { Image, Text, Link, View } from "@react-pdf/renderer"
import { pdfStyles } from "./pdfStyles"
import { filterInvalidSections } from "../filterInvalidSections"
import { SelectedTemplateProps } from "../../components/templates/productSchemas/productTypes"

export const renderPDFTOC = ({
  docTemplate,
  selectedLocation,
}: SelectedTemplateProps) => {
  const validDocSectionsArray = filterInvalidSections({
    docTemplate: docTemplate,
    selectedLocation: selectedLocation,
  })

  const tocElements = validDocSectionsArray.map(
    (documentSection, sectionIndex) => {
      const sectionNumber = sectionIndex + 1
      const sectionContentArray = documentSection.content

      const sectionTitlesArray = sectionContentArray.map(
        (contentObj, contentIndex) => {
          if (contentObj.type === "sectionTitle") {
            const sectionTitle = contentObj.value
            return (
              <Link
                wrap={false}
                key={`sectionTitle-${sectionIndex}-${contentIndex}`}
                src={`#${sectionNumber}`}
                style={pdfStyles.tocItems}
              >
                <Text
                  style={{
                    position: "absolute",
                    left: -2,
                    paddingLeft: 6,
                    opacity: 0.5,
                  }}
                >
                  {sectionNumber}.
                </Text>
                <Text style={{ textIndent: 24 }}>{sectionTitle}</Text>
              </Link>
            )
          } else null
        }
      )

      return sectionTitlesArray
    }
  )

  return (
    <View>
      <View
        wrap={false}
        style={[
          pdfStyles.inlineIcon,
          { borderBottom: "0.5 solid #000", paddingBottom: 4, marginBottom: 4 },
        ]}
      >
        {/* eslint-disable-next-line jsx-a11y/alt-text*/}
        <Image
          src="/pdf/book-open.png"
          style={{
            width: 12,
            height: 12,
            opacity: 0.5,
            paddingLeft: 2,
          }}
        />

        <Text
          style={{
            fontSize: 12,
            fontWeight: "normal",
            paddingLeft: 6,
            opacity: 0.5,
          }}
        >
          CONTENTS
        </Text>
      </View>
      <View style={{ paddingTop: 6 }}>{tocElements}</View>
    </View>
  )
}
