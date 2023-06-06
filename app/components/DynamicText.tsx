"use client"

import React, { FC, JSXElementConstructor } from "react"
import useInsertDynamicContent from "@hooks/useInsertDynamicContent"
import Paragraph from "@designSystem/atoms/Paragraph"
import Divider from "@designSystem/atoms/Divider"

export type DynamicTextProps = {
  formData: {} | { key: string; value: string } // Will typecheck specific key/value pairs from Form in actual implementation as this will be prone to errors as product library grows
  inputName: string
  schema: {}
}

// Helper functions ----------------------------

// Component Function Starts Here ----------------------------
const DynamicText: FC<DynamicTextProps> = ({
  formData,
  inputName,
  schema,
  ...props
}) => {
  return <>{useInsertDynamicContent({ formData, inputName, schema })}</>
}

export default DynamicText
