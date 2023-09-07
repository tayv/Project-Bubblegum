"use client"

import { useRouter } from "next/navigation"
import { FC, useState, useContext, useEffect } from "react"
import { ProductContext } from "@contexts/ProductContext"
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
import Card from "@components/ui/Card"
import ButtonCTA from "@form/ButtonCTA"
import LayoutContainer from "@components/ui/LayoutContainer"
import Space from "@components/ui/Space"

// TYPES ---------
type SheetSignUpProps = {
  formID: string
  isFormSubmitted?: boolean
  setIsFormSubmitted?: React.Dispatch<React.SetStateAction<boolean>>
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
const SheetSignUp: FC<SheetSignUpProps> = ({
  formID,
  isFormSubmitted,
  setIsFormSubmitted,
  ...props
}) => {
  // Setup RHF
  const methods = useForm({ resolver: zodResolver(zodSchema), defaultValues })
  const formHasErrors = Object.keys(methods.formState.errors).length > 0

  // Setup routes for loading steps after signup completed
  const router = useRouter()

  // State
  const [isSheetOpen, setIsSheetOpen] = useState(isFormSubmitted || false) // This sign up sheet might be used outside forms so need to have logical gate

  // Need to recheck since user could cancel out of modal and resubmit form
  useEffect(() => {
    setIsSheetOpen(!!isFormSubmitted)
  }, [isFormSubmitted])

  // Event handlers
  const handleSignUpSubmit = methods.handleSubmit(
    (data) => {
      console.log("is form Submitted", isFormSubmitted)
      console.log("This is sent", data)
      setIsSheetOpen(false) // Need to close the modal after submitting form
    },
    (errors) => {
      console.log("Errors", errors)
    }
  )
  // Used by Radix UI Dialog for modal open/close
  const handleOnOpenChange = () => {
    setIsSheetOpen(!isSheetOpen)
    !!setIsFormSubmitted && setIsFormSubmitted(false) // To reset the form submission state if user cancels out of sign up/in. Need logical check since this might be trigger from non-form pages.
  }

  return (
    // Need lg:hidden otherwise on large screens the toolbox will be bumped to bottom instead of sticking to right column because the SheetSignUp div will be visually hidden but appear in the DOM and take up a grid column
    <div className="flex justify-center gap-[25px] mt-10 mb-28 lg:hidden">
      <ModalSheet
        isSheetOpen={isSheetOpen}
        setIsSheetOpen={setIsSheetOpen}
        // triggerComponent={
        //   <button className="items-center justify-center inline-flex h-10 px-4 font-medium text-slate-500 bg-slate-200 hover:bg-slate-300 border-2 border-slate-400 rounded-lg leading-none outline-none focus:shadow-[0_0_0_2px] shadow-md focus:shadow-sky-400">
        //     Test
        //   </button>
        // }
        title="Document Title"
        description="This is a description"
        handleOnOpenChange={handleOnOpenChange}
      >
        <div className="max-w-prose">
          {/* Need to wrap in FormProvider or the state won't work */}
          <FormProvider {...methods}>
            <form
              id={formID}
              className="lg:col-span-3"
              onSubmit={handleSignUpSubmit}
            >
              <Card id="signupModalContent" color="none">
                <Heading size="h2">Last step ...</Heading>
                <Paragraph>
                  Your document contains sensitive information. Protect your
                  privacy by creating a free account to save, edit, and download
                  your document.
                </Paragraph>
                <Field
                  name="userEmailInput"
                  //</Card>validateOnBlur={true}
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
                  <Field.Control>
                    <Checkbox>
                      Send me the newsletter for tips & promos
                    </Checkbox>
                  </Field.Control>
                </Field>
                {/* <Field.Example>
                  Unsubscribe anytime. Your email is kept private and is only
                  used to send you the newsletter.
                </Field.Example> */}
                <Space ySize="large" />

                <LayoutContainer
                  variant="flex"
                  direction="col"
                  gap="standard"
                  alignX="center"
                  padding="standard"
                  margin="none"
                >
                  <ButtonCTA
                    formID={formID}
                    formHasErrors={formHasErrors}
                    type="submit"
                    variant="secondary"
                    icon="user"
                    buttonText="Create Account"
                    onClick={() => router.push("/docviewer")}
                  />
                  <aside className="text-sm text-center">
                    No credit card required. Delete your account at any time.
                  </aside>
                </LayoutContainer>
                <div className="flex flex-row justify-center ">
                  <Divider padding="large" width="medium" />
                </div>
                <LayoutContainer
                  variant="flex"
                  direction="row"
                  alignX="center"
                  margin="none"
                  gap="xsmall"
                  padding="none"
                >
                  <Paragraph size="large">Already have an account?</Paragraph>
                  <button
                    type="button"
                    className="underline underline-offset-2 text-lg lg:text-xl"
                  >
                    Sign In
                  </button>
                </LayoutContainer>
              </Card>
            </form>
          </FormProvider>
        </div>
      </ModalSheet>
    </div>
  )
}

export default SheetSignUp
