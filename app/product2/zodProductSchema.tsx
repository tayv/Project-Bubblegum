import * as z from "zod"

export const zodProductSchema = z.object({
  checkboxExample: z.boolean().optional(),
  radioExample: z.enum(["option1", "option2", "option3"]).optional(),
  textExample: z.string().nonempty("This field cannot be empty."),
  jurisdiction: z.enum(["location1", "location2", "location3"]),
  signingDate: z.string().optional(),
})

export type ZodProductSchemaType = z.infer<typeof zodProductSchema>
