"use client"
import { useEffect, useState } from "react"
import LayoutContainer from "@ui/LayoutContainer"
import Heading from "@ui/Heading"
import Paragraph from "@ui/Paragraph"
import { MapPin, ScrollText, RefreshCcw } from "lucide-react"
import ButtonCTA from "@components/form/ButtonCTA"
import { getUserData } from "@utils/getUserData"
import Card from "@ui/Card"
import ModalSheet from "@components/ui/ModalSheet"

// This should probably be centralized as will be reused
type DocumentData = {
  status: string
  docName: string
  formData: {
    jurisdiction: string
    // add other properties of formData
  }
}

// FETCH USERS DOCUMENT DATA
const userId = "user_22665" // TODO replace with function that gets userId from clerk

export default function Dashboard() {
  const [userData, setUserData] = useState<DocumentData[] | null>(null)

  const handleGetUserData = async () => {
    try {
      const data = await getUserData(userId)
      setUserData(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    // Fetch user data when component mounts
    handleGetUserData()
  }, [])

  return (
    <LayoutContainer
      variant="flex"
      direction="col"
      padding="none"
      // alignY="center"
      //  alignX="center"
      className="max-w-3xl"
    >
      <Heading
        size="h1"
        weight="bold"
        padding="standard"
        className="text-center"
      >
        Hello 👋
      </Heading>
      <Paragraph
        size="xxxlarge"
        textAlign="center"
        padding="large"
        space="snug"
        className="max-w-prose"
      >
        Pick a product below and get started for free. No credit card required!
      </Paragraph>
      <LayoutContainer
        variant="flex"
        direction="col"
        padding="none"
        className="max-w-3xl"
        tag="section"
      >
        <LayoutContainer
          variant="flex"
          direction="row"
          padding="none"
          className="justify-between"
        >
          <Heading
            size="h3"
            weight="medium"
            padding="large"
            className="text-left"
          >
            Your Documents
          </Heading>
          <ButtonCTA
            variant="secondary"
            type="button"
            size="smallButton"
            icon="none"
            onClick={handleGetUserData}
            buttonText="Fetch User Data"
          />
        </LayoutContainer>

        {userData &&
          userData.map((document, index) => {
            return (
              <>
                <ModalSheet
                  description={`${document.docName} Details`}
                  triggerComponent={
                    <Card key={index} className="mb-4 cursor-pointer">
                      <LayoutContainer
                        variant="flex"
                        direction="row"
                        gap="standard"
                        margin="none"
                        padding="none"
                        className="lg:gap-6 "
                      >
                        <LayoutContainer
                          variant="flex"
                          direction="col"
                          margin="none"
                          padding="none"
                          alignX="center"
                          gap="xsmall"
                          className="basis-2/12 lg:basis-1/12 "
                        >
                          <ScrollText className="min-h-12 max-h-10 lg:max-h-12 min-w-12 max-w-10 lg:max-w-12 w-full h-full" />
                          <Paragraph
                            size="small"
                            weight="medium"
                            textAlign="center"
                            padding="none"
                          >
                            {document.status ? document.status : "No status"}
                          </Paragraph>
                        </LayoutContainer>

                        <LayoutContainer
                          variant="flex"
                          direction="col"
                          margin="none"
                          padding="none"
                          className=""
                        >
                          <Heading size="h2" padding="none">
                            {document.docName
                              ? document.docName
                              : "No document name"}
                          </Heading>
                          <LayoutContainer
                            variant="flex"
                            direction="row"
                            margin="none"
                            padding="none"
                            alignX="start"
                            //  gap="xsmall"
                            className="opacity-60 gap-px lg:gap-1"
                          >
                            <MapPin className="min-h-4 max-h-5 lg:max-h-6  " />
                            <Paragraph
                              size="small"
                              weight="standard"
                              textAlign="left"
                            >
                              {document.formData.jurisdiction
                                ? document.formData.jurisdiction
                                : "No location"}
                            </Paragraph>
                          </LayoutContainer>
                        </LayoutContainer>
                      </LayoutContainer>
                    </Card>
                  }
                >
                  <LayoutContainer
                    variant="flex"
                    direction="col"
                    margin="none"
                    padding="none"
                    className=""
                  >
                    <Heading size="h2" padding="none">
                      {document.docName ? document.docName : "No document name"}
                    </Heading>
                    <LayoutContainer
                      variant="flex"
                      direction="row"
                      margin="none"
                      padding="none"
                      alignX="start"
                      className="opacity-60 gap-px lg:gap-1"
                    >
                      <MapPin className="min-h-4 max-h-5 lg:max-h-6  " />
                      <Paragraph
                        size="small"
                        weight="standard"
                        textAlign="left"
                      >
                        {document.formData.jurisdiction
                          ? document.formData.jurisdiction
                          : "No location"}
                      </Paragraph>
                    </LayoutContainer>
                  </LayoutContainer>
                </ModalSheet>
              </>
            )
          })}
      </LayoutContainer>
    </LayoutContainer>
  )
}
