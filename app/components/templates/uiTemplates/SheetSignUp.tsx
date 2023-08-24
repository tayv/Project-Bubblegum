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
import ButtonCTA from "@form/ButtonCTA"

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
  // Setup RHF
  const methods = useForm({ resolver: zodResolver(zodSchema), defaultValues })
  const formHasErrors = Object.keys(methods.formState.errors).length > 0
  // State
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  // Actions
  const handleSignUpSubmit = methods.handleSubmit(
    (data) => {
      console.log("This is sent", data)
      setIsOpen(false) // Need to close the modal after submitting form
    },
    (errors) => {
      console.log("Errors", errors)
    }
  )

  return (
    <div className="flex justify-center gap-[25px] mt-10 mb-28 ">
      <ModalSheet
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        triggerComponent={
          <button className="items-center justify-center inline-flex h-10 px-4 font-medium text-slate-500 bg-slate-200 hover:bg-slate-300 border-2 border-slate-400 rounded-lg leading-none outline-none focus:shadow-[0_0_0_2px] shadow-md focus:shadow-sky-400">
            Test
          </button>
        }
        title="Document Title"
        description="This is a description"
      >
        <div className="max-w-prose">
          {/* Need to wrap in FormProvider or the state won't work */}
          <FormProvider {...methods}>
            <form
              id={id}
              className="lg:col-span-3"
              onSubmit={handleSignUpSubmit}
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
              <CardSection id="signupButton" variant="blank">
                <ButtonCTA
                  formHasErrors={formHasErrors}
                  type="submit"
                  icon="user"
                  buttonText="Create Account"
                  variant="secondary"
                />
              </CardSection>
            </form>
          </FormProvider>
        </div>
      </ModalSheet>
    </div>
  )
}

export default SheetSignUp
