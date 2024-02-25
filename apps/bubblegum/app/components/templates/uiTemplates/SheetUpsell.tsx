"use client"

import { usePathname } from "next/navigation"
import { FC, useState, useContext, useEffect } from "react"
import ModalSheet from "@ui/ModalSheet"
import Heading from "@ui/Heading"
import Paragraph from "@ui/Paragraph"
import { Card } from "@uiRepo/components"
import { LayoutContainer } from "@uiRepo/layout"
import { Space } from "@uiRepo/layout"
import { SignUp } from "@clerk/nextjs"

// TYPES ---------
type SheetUpsellProps = {
  triggerComponent: React.ReactElement
}

// HELPERS ----------

// MAIN FUNCTION
const SheetUpsell: FC<SheetUpsellProps> = ({ triggerComponent, ...props }) => {
  // Setup routes for reloading current page after clerk signup completed
  const pathname = usePathname()

  return (
    // Need lg:hidden otherwise on large screens the toolbox will be bumped to bottom instead of sticking to right column because the SheetUpsellClerk div will be visually hidden but appear in the DOM and take up a grid column
    <div className="flex justify-start gap-[25px]">
      <ModalSheet
        //   isSheetOpen={isSheetOpen}
        //  setIsSheetOpen={setIsSheetOpen}
        description="Sign up"
        //  handleOnOpenChange={handleOnOpenChange}
        triggerComponent={triggerComponent}
      >
        <div className="max-w-prose lg:col-span-3">
          <Card id="signupModalContent" color="none">
            <Heading size="h2" textAlign="center">
              VIP feature
            </Heading>
            <Paragraph textAlign="center">
              Access this and other member-only features with a free account.
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
        </div>
      </ModalSheet>
    </div>
  )
}

export default SheetUpsell
