import { FC, useState, useContext } from "react"
import { PageContext } from "@components/templates/context"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, FormProvider } from "react-hook-form"

import Divider from "@ui/Divider"
import ModalSheet from "@ui/ModalSheet"
import Heading from "@ui/Heading"
import Paragraph from "@ui/Paragraph"
import Field from "@formControl/Field"
import Input from "@form/Input"
import Checkbox from "@form/Checkbox"
import CardSection from "@ui/CardSection"

// TYPES ---------
type SheetSignUpProps = {
  id: string
}

// COLOR TOKENS ---------

// FORM SETUP ----------
const defaultValues = {
  userEmailInput: "",
  checkboxAcceptMarketingEmails: false,
}

const zodSchema = z.object({
  userEmailInput: z.string().nonempty("This field cannot be empty."),
  checkboxAcceptMarketingEmails: z.boolean().optional(),
})

// HELPER COMPONENTS ----------

// MAIN FUNCTION
const SheetSignUp: FC<SheetSignUpProps> = ({ id, ...props }) => {
  // Start by getting context values from product page and Form
  const pageContextValue = useContext(PageContext) // Values are defined in page.tsx

  const methods = useForm({ resolver: zodResolver(zodSchema), defaultValues })
  // State
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [open, setOpen] = useState(false)

  const onSubmit = methods.handleSubmit(
    (data) => {
      console.log("This is sent", data)
      setOpen(false)
    },
    (errors) => {
      console.log("Errors", errors)
    }
  )

  return (
    <div className="flex justify-center gap-[25px] mt-10 mb-28 ">
      <ModalSheet
        open={open}
        setOpen={setOpen}
        triggerComponent={
          <button className="items-center justify-center inline-flex h-10 px-4 font-medium text-slate-500 bg-slate-200 hover:bg-slate-300 border-2 border-slate-400 rounded-lg leading-none outline-none focus:shadow-[0_0_0_2px] shadow-md focus:shadow-sky-400">
            Test
          </button>
        }
        title="Document Title"
        description="This is a description"
      >
        <div className="max-w-prose">
          <FormProvider {...methods}>
            <form
              id={id}
              className="lg:col-span-3"
              onSubmit={onSubmit}

              //   methods.handleSubmit((data) => {
              //   console.log("Submitted contact details", data)
              //   setOpen(false)
              // })} // use RHF's handleSubmit to prevent default form submission behavior
            >
              <CardSection id="signupModalContent" variant="blank">
                <Heading size="h2">Last step ...</Heading>
                <Paragraph>
                  Your document contains sensitive information. Protect your
                  privacy by creating a free account to save, edit, and download
                  your document.
                </Paragraph>
                <Field
                  name="userEmailInput"
                  //</CardSection>validateOnBlur={true}
                >
                  <Field.GroupLabel>Email:</Field.GroupLabel>
                  <Field.Tip>
                    Unsubscribe anytime. Your email is kept private and is only
                    used to send you the newsletter.
                  </Field.Tip>
                  <Field.Control>
                    <Input type="text" />
                  </Field.Control>
                </Field>
                <Field
                  name="checkboxAcceptMarketingEmails"
                  //validateOnBlur={false}
                >
                  <Field.GroupLabel>
                    Toggle checkbox to change PDF content:
                  </Field.GroupLabel>
                  <Field.Control>
                    <Checkbox>
                      Send me the newsletter for tips & promos
                    </Checkbox>
                  </Field.Control>
                </Field>
              </CardSection>
              <button type="submit">Sign Up Test</button>
            </form>
          </FormProvider>
        </div>
      </ModalSheet>
    </div>
  )
}

export default SheetSignUp
