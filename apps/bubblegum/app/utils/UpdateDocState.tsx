// Used to track the states needed to build a document

const UpdateDocState = (
  getValues: any,
  setDocValue: any,
  docValue: { docID: Number; formData: {} }
) => {
  setDocValue({
    docID: docValue.docID,
    formData: getValues(),
  })
}

export default UpdateDocState
