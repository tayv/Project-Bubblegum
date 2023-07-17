// generic schema to be used to build docTemplate schema alongside location shcmeas
// Try to limit the number of generic schemas whenever possible
export const schemaGenericA = {
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

export const schemaGenericB = {
  checkboxExample: {
    true: {
      headerA: "GB: checkbox is true. ",
      bodyA: ["GB: checkbox is true"],
    },
    false: {
      bodyA: ["GB: checkbox is false"],
    },
  },
}
