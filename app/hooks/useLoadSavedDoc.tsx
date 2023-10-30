import React from "react"
import {
  AppContext,
  AppContextProps,
  UserDataTypes,
} from "@contexts/AppContext"

type FilterSpecificDocDataProps = {
  userDocData: UserDataTypes["userDocData"]
  productId: UserDataTypes["document"]["productId"]
  docId: UserDataTypes["document"]["docId"]
}

const useLoadSavedDoc = () => {
  // Set up global context from AppContext.tsx
  const appContextValues = React.useContext(AppContext)
  if (!appContextValues) {
    throw new Error(
      "This must be used within App.Provider in order for useLoadSavedDoc hook to work."
    )
  }
  const { currentDoc, setCurrentDoc, userDocData, setUserDocData } =
    appContextValues

  // 1. Ability to extract specific docData from user data
  const filterSpecificDocData = ({
    userDocData,
    productId,
    docId,
  }: FilterSpecificDocDataProps) => {
    if (!userDocData || !productId || !docId) {
      console.log(
        "Missing userDocData:",
        userDocData,
        " or productId:",
        productId,
        " or docId:",
        docId
      )
      return
    }

    // Find the object with the matching productId and docId
    const specificDoc = userDocData.find(
      (doc) => doc.productId === productId && doc.docId === docId
    )

    if (!specificDoc) {
      console.log(
        "No document found with productId:",
        productId,
        " and docId:",
        docId
      )
      return null
    }

    return specificDoc
  }

  return { filterSpecificDocData, userDocData, setUserDocData }
}
export default useLoadSavedDoc
