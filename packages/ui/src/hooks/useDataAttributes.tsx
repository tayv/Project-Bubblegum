import React from "react"

type GetDataAttributeProps = {
  attributeName: string
  value: string
}

type SetDataAttributeProps = {
  elementId: string | Element
  attributeName: string
  value: string
}

const useDataAttributes = () => {
  // useCallback so we can memoize the list of data attributes as these might be changed frequently
  const getDataAttributes = React.useCallback(
    ({ attributeName, value }: GetDataAttributeProps) => {
      // Remember this is a node list so convert to array if need .map() etc.
      const elementsWithValueNodeList = document.querySelectorAll(
        `[data-${attributeName}="${value}"]`
      )
      return elementsWithValueNodeList
    },
    []
  )

  // Top consumer: useActiveSection to set form sections
  const setDataAttribute = React.useCallback(
    ({ elementId, attributeName, value }: SetDataAttributeProps) => {
      // Need to check since could be passed an #id or full dom element
      const getElement = (elementId: SetDataAttributeProps["elementId"]) => {
        if (typeof elementId === "string") {
          return document.getElementById(elementId)
        } else if (elementId instanceof Element) {
          return elementId
        }
      }

      const elementToSet = getElement(elementId)

      // There's a valid element then update with new attribute name and value
      if (elementToSet) {
        elementToSet.setAttribute(`data-${attributeName}`, value)
      }
    },
    []
  )

  return { getDataAttributes, setDataAttribute }
}

export { useDataAttributes }
