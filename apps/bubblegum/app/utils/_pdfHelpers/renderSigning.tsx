"use client"
import { View, Text, StyleSheet } from "@react-pdf/renderer"
import { pdfStyles } from "./pdfStyles"
import { FormDataType } from "../../components/templates/productSchemas/productTypes"
import { capitalizeFirstLetter } from "@uiRepo/utils"

const pdfSigningStyles = StyleSheet.create({
  tableContainer: {
    borderLeftWidth: 1,
    borderLeftColor: "#D3D3D3",
    marginLeft: 6,
  },
  tableRow: {
    flexDirection: "row",
    paddingBottom: 2,
    paddingLeft: 6,
    alignItems: "flex-start",
  },
  tableRowData: {
    flexDirection: "row",
    alignItems: "flex-end",
    minHeight: 15,
  },
  tableRowLine: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  tableCell: {
    fontSize: 10,
    width: 330,
    paddingRight: 2,
    alignItems: "flex-end",
    textAlign: "center",
  },
  tableCellTitle: {
    fontSize: 7,
    color: "#919291",
    width: 330,
    textAlign: "left",
    paddingLeft: 6,
  },
  tableCellLine: {
    lineHeight: 0.5,
    fontSize: 10,
    width: 330,
    paddingRight: 2,
    alignItems: "center",
    textAlign: "center",
  },
  tableCellLabel: {
    fontSize: 8,
    width: 330,
    textAlign: "center",
    color: "#919291",
  },
  tableCellData: {
    width: 330,
    textAlign: "center",
    alignItems: "flex-end",
    lineHeight: 0.9,
  },
})

type RenderSigningProps = {
  formData: FormDataType
}

export const renderSigning = ({ formData }: RenderSigningProps) => {
  // TODO: Once multiple party component is added it will likely use the array structure from useFieldArray: https://www.react-hook-form.com/api/usefieldarray/
  type Party1DetailsType = {
    partyRole: "seller"
    partyName: string
    partyType: "person" | "company"
    partyAddress: string
    partyEmail: string
    partyPhone: string
  }[]

  type Party2DetailsType = {
    partyRole: "buyer"
    partyName: string
    partyType: "person" | "company"
    partyAddress: string
    partyEmail: string
    partyPhone: string
  }[]

  type ThirdPartyDetailsType = {
    partyRole: "guarantor"
    partyName: string
    partyType: "person" | "company"
    partyAddress: string
    partyEmail: string
    partyPhone: string
  }[]

  // TODO: Replace this with actual form data ---------------------------
  // Only use this for demo purposes. In production, grab actual form data
  const party1Details: Party1DetailsType = [
    {
      partyRole: "seller",
      partyName: "Luke Skywalker",
      partyType: "person",
      partyAddress: "123 Main St, Tatooine",
      partyEmail: "party1@gmail.com",
      partyPhone: "123-456-7890",
    },
  ]

  // Only use this for demo purposes. In production, grab actual form data
  const party2Details: Party2DetailsType = [
    {
      partyRole: "buyer",
      partyName: "Lewis Hamilton",
      partyType: "person",
      partyAddress: "123 Pit Lane, Silverstone Great Britain",
      partyEmail: "lhamilton@gmail.com",
      partyPhone: "123-888-7890",
    },
    {
      partyRole: "buyer",
      partyName: "Kimi Raikkonen",
      partyType: "person",
      partyAddress: "123 Yacht Club, Monaco",
      partyEmail: "kimi@gmail.com",
      partyPhone: "123-654-7890",
    },
  ]

  // Only use this for demo purposes. In production, grab actual form data
  const thirdPartyDetails: ThirdPartyDetailsType = [
    {
      partyRole: "guarantor",
      partyName: "Jeff Bezos",
      partyType: "person",
      partyAddress: "123 Wall Street, New York",
      partyEmail: "money@gmail.com",
      partyPhone: "123-456-0000",
    },
  ]

  const renderPartyDetails = (
    partyDetailsObj:
      | Party1DetailsType[0]
      | Party2DetailsType[0]
      | ThirdPartyDetailsType[0],
    index: number
  ) => {
    return (
      <div key={`${partyDetailsObj.partyRole}-${index}`}>
        <View style={pdfSigningStyles.tableRow}>
          <Text style={pdfSigningStyles.tableCellTitle}>
            {`${partyDetailsObj.partyRole.toUpperCase()} ${index + 1}`}
          </Text>
          <Text style={pdfSigningStyles.tableCell} />
          <Text style={pdfSigningStyles.tableCell} />
        </View>
        <View style={pdfSigningStyles.tableRowData}>
          <Text style={pdfSigningStyles.tableCellData}>
            {/*Leave blank if there's no value so user can write it in by hand */}
            {partyDetailsObj.partyName ? partyDetailsObj.partyName : ""}
          </Text>
          <Text style={pdfSigningStyles.tableCellData}></Text>
          <Text style={pdfSigningStyles.tableCellData}>
            {/*Leave blank if there's no value so user can write it in by hand */}
            {formData.signingDate ? formData.signingDate : ""}
          </Text>
        </View>
        <View style={pdfSigningStyles.tableRowLine}>
          <Text style={pdfSigningStyles.tableCell}>
            ______________________________
          </Text>
          <Text style={pdfSigningStyles.tableCell}>
            ______________________________
          </Text>
          <Text style={pdfSigningStyles.tableCell}>
            ______________________________
          </Text>
        </View>
        <View style={pdfSigningStyles.tableRow}>
          <Text style={pdfSigningStyles.tableCellLabel}>Full Name</Text>
          <Text style={pdfSigningStyles.tableCellLabel}>Signature</Text>
          <Text style={pdfSigningStyles.tableCellLabel}>Date</Text>
        </View>
      </div>
    )
  }

  const resultParty1 = party1Details.map((partyObj, index) => {
    return renderPartyDetails(partyObj, index)
  })

  const resultParty2 = party2Details.map((partyObj, index) => {
    return renderPartyDetails(partyObj, index)
  })

  const resultThirdParty = thirdPartyDetails.map((partyObj, index) => {
    return renderPartyDetails(partyObj, index)
  })

  return (
    <View style={pdfStyles.section} wrap={false}>
      <Text style={pdfStyles.h2}>
        {capitalizeFirstLetter(party1Details[0].partyRole)}
      </Text>
      <View style={pdfSigningStyles.tableContainer}>{resultParty1}</View>

      <Text style={pdfStyles.h2}>
        {capitalizeFirstLetter(party2Details[0].partyRole)}
      </Text>
      <View style={pdfSigningStyles.tableContainer}>{resultParty2}</View>
      <Text style={pdfStyles.h2}>
        {capitalizeFirstLetter(thirdPartyDetails[0].partyRole)}
      </Text>
      <View style={pdfSigningStyles.tableContainer}>{resultThirdParty}</View>
    </View>
  )
}
