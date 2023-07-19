// Type definitions for template component

export type FormData = { [key: string]: string | number | boolean | Date } // Will typecheck specific key/value pairs from Form in actual implementation as this will be prone to errors as product library grows

export type Schema = {
  [key: string]: { [key: string]: { [key: string]: string } }
} // 2 level deep nested object with key/value pairs

export type PageContextType = {
  formData: FormData
  // schema: Schema
}

export type DynamicContentProps = {
  watchedInputName: string
  watchedInputValue: string | number | boolean | Date
}

export type ProductNameProps = {
  productName: "product1" | "product2" | "product3"
}
