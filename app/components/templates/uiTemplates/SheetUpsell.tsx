"use client"

import { usePathname } from "next/navigation"
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
import { SignUp } from "@clerk/nextjs"

// TYPES ---------
type SheetUpsellProps = {
  formID: string
  isFormSubmitted?: boolean
  setIsFormSubmitted?: React.Dispatch<React.SetStateAction<boolean>>
  triggerComponent: React.ReactElement
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
const SheetUpsell: FC<SheetUpsellProps> = ({
  formID,
  isFormSubmitted,
  setIsFormSubmitted,
  triggerComponent,
  ...props
}) => {
  // Setup RHF
  const methods = useForm({ resolver: zodResolver(zodSchema), defaultValues })
  const formHasErrors = Object.keys(methods.formState.errors).length > 0

  // Setup routes for reloading current page after clerk signup completed
  const pathname = usePathname()

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
    // Need lg:hidden otherwise on large screens the toolbox will be bumped to bottom instead of sticking to right column because the SheetUpsellClerk div will be visually hidden but appear in the DOM and take up a grid column
    <div className="flex justify-start gap-[25px]">
      <ModalSheet
        isSheetOpen={isSheetOpen}
        setIsSheetOpen={setIsSheetOpen}
        description="Sign up"
        handleOnOpenChange={handleOnOpenChange}
        triggerComponent={triggerComponent}
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
                  Member-only feature
                </Heading>
                <Paragraph textAlign="center">
                  Access this and other member-only features with a free
                  account.
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
                    redirectUrl={pathname}
                    // afterSignInUrl={`${initialPathname}`}
                    appearance={{
                      elements: {
                        card: "gap-6 p-8 shadow-none border border-slate-100 bg-slate-50/30 rounded-none lg:rounded-xl",
                        headerSubtitle: "hidden",
                        formFieldInput:
                          "border border-gray-900 rounded-lg bg-white shadow-sm",
                        formButtonPrimary: "bg-cta-500 hover:bg-cta-600",
                        footerActionLink: "text-cta-500 font-semibold",
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

export default SheetUpsell
