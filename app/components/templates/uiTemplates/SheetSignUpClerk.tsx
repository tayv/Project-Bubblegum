"use client"

import { useRouter } from "next/navigation"
import { FC, useState, useEffect } from "react"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, FormProvider } from "react-hook-form"

import ModalSheet from "@ui/ModalSheet"
import Heading from "@ui/Heading"
import Paragraph from "@ui/Paragraph"
import Card from "@components/ui/Card"
import LayoutContainer from "@components/ui/LayoutContainer"
import Space from "@components/ui/Space"
import { SignUp } from "@clerk/nextjs"

// NOTES: Form/FormProvider/etc. isn't actually necessary as its been refactored to use standard clerk auth component. Keeping for now in case want to have opt in newsletter checkbox then will need form.

// TYPES ---------
type SheetSignUpClerkProps = {
  formID: string
  isFormSubmitted?: boolean
  setIsFormSubmitted?: React.Dispatch<React.SetStateAction<boolean>>
}

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
const SheetSignUpClerk: FC<SheetSignUpClerkProps> = ({
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
  const [isSheetOpen, setIsSheetOpen] = useState(isFormSubmitted || false) // This sign up sheet might be used outside forms so need to have logic gate

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
    // Need lg:hidden otherwise on large screens the toolbox will be bumped to bottom instead of sticking to right column because the SheetSignUpClerkClerk div will be visually hidden but appear in the DOM and take up a grid column
    <div className="flex justify-center gap-[25px] mt-10 mb-28 lg:hidden">
      <ModalSheet
        isSheetOpen={isSheetOpen}
        setIsSheetOpen={setIsSheetOpen}
        description="Sign up"
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
                <Heading size="h2" textAlign="center">
                  Last step ...
                </Heading>
                <Paragraph textAlign="center">
                  Save, edit, and download your document with a free account.
                </Paragraph>
                <aside className="text-sm text-center text-brand-500">
                  No credit card required. Delete your account at any time.
                </aside>

                <Space ySize="medium" />

                <LayoutContainer
                  variant="flex"
                  direction="row"
                  alignX="center"
                  margin="none"
                  gap="xsmall"
                  padding="none"
                >
                  <SignUp
                    redirectUrl="/docviewer"
                    //  signInUrl="/signin"
                    appearance={{
                      elements: {
                        card: "gap-6 p-8 shadow-none border border-slate-100 bg-slate-50/30 rounded-none lg:rounded-xl",
                        headerSubtitle: "hidden",
                        formFieldInput:
                          "border border-gray-900 rounded-lg bg-white shadow-sm",
                        formButtonPrimary: "bg-cta-500 hover:bg-cta-600",
                        footerActionLink: "text-cta-500 font-semibold",
                      },
                      layout: {
                        socialButtonsPlacement: "bottom",
                        socialButtonsVariant: "iconButton",
                        privacyPageUrl: "/",
                        termsPageUrl: "/",
                      },
                    }}
                  />
                </LayoutContainer>
              </Card>
            </form>
          </FormProvider>
        </div>
      </ModalSheet>
    </div>
  )
}

export default SheetSignUpClerk
