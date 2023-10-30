"use client"
import {
  forwardRef,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react"
import LayoutContainer from "@ui/LayoutContainer"
import Heading from "@ui/Heading"
import Paragraph from "@ui/Paragraph"
import {
  MapPin,
  ScrollText,
  RefreshCcw,
  Trash2,
  Pencil,
  File,
  Calendar,
  Loader2,
} from "lucide-react"
import ButtonCTA from "@components/form/ButtonCTA"
import { getUserData } from "@utils/getUserData"
import Card from "@ui/Card"
import ModalSheet from "@ui/ModalSheet"
import Divider from "@ui/Divider"
import Space from "@components/ui/Space"
import { deleteDoc, DeleteDocParams } from "@utils/deleteDoc"
import useLoadSavedDoc from "@hooks/useLoadSavedDoc"
import { AppContextProps, UserDataTypes } from "@contexts/AppContext"

// HELPERS
type OverviewCardProps = {
  document: UserDataTypes["document"]
}

const OverviewCard = forwardRef<HTMLDivElement, OverviewCardProps>(
  function setOverviewCardRef(
    { document, ...props },
    ref: React.Ref<HTMLDivElement>
  ) {
    return (
      <Card
        ref={ref}
        className="mb-4 cursor-pointer"
        {...props} // NOTE: Must spread props in for event propagation to work in ModalSheet triggerComponent
      >
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
            className="basis-2/12 lg:basis-1/12 opacity-60 "
          >
            <ScrollText className="min-h-8 max-h-10 lg:max-h-10 min-w-8 max-w-10 lg:max-w-10 w-full h-full " />
            <Paragraph
              size="xsmall"
              weight="medium"
              textAlign="center"
              padding="none"
              color="none"
            >
              {document.status ? document.status : "No status"}
            </Paragraph>
          </LayoutContainer>
          <Divider
            width="full"
            height="xsmall"
            variant="vertical"
            className="self-center"
          />
          <LayoutContainer
            variant="flex"
            direction="col"
            margin="none"
            padding="none"
            className=""
          >
            <Heading size="h3" padding="none">
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
              <Paragraph size="small" weight="standard" textAlign="left">
                {document.formData.jurisdiction
                  ? document.formData.jurisdiction
                  : "No location"}
              </Paragraph>
            </LayoutContainer>
          </LayoutContainer>
        </LayoutContainer>
      </Card>
    )
  }
)

type OverviewCardContentProps = {
  document: OverviewCardProps["document"]
  handleDeleteDoc?: ({
    userId,
    productId,
    docId,
  }: DeleteDocParams) => Promise<void>
  setUserDocData: AppContextProps["setUserDocData"]
  userDocData: AppContextProps["userDocData"]
}
const OverviewCardContent = ({
  document,
  setUserDocData,
  userDocData,
}: OverviewCardContentProps) => {
  // Setup state
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false)
  const [deleteInProgress, setDeleteInProgress] = useState<boolean>(false)
  const [deleteError, setDeleteError] = useState<boolean>(false)

  //
  const handleDeleteDoc = async ({
    userId,
    productId,
    docId,
  }: DeleteDocParams) => {
    try {
      console.log("DELETE ATTEMPTED")
      await deleteDoc({ userId, productId, docId }) // Updated to match the signature
      const data = await getUserData(userId)
      setUserDocData(data)
      console.log("DELETE COMPLETE. New userDocData:", userDocData)
    } catch (error) {
      console.error(error)
      setDeleteError(true)
      setDeleteInProgress(false)
    }
  }

  const messageConfirmDelete = (
    <ModalSheet
      key={document.docName}
      description={`${document.docName} Details`}
      handleOnOpenChange={() => setConfirmDelete(!confirmDelete)}
      triggerComponent={<OverviewCard document={document} />}
    >
      <LayoutContainer
        variant="flex"
        direction="col"
        margin="none"
        padding="standard"
        gap="medium"
        alignX="center"
        className=""
      >
        <Heading size="h4" padding="none" textAlign="center">
          Are you sure you want to delete this document?
        </Heading>

        <Paragraph
          size="standard"
          weight="standard"
          textAlign="center"
          padding="small"
        >
          Deletion is permanent. Your document will be gone forever.
        </Paragraph>

        <Space ySize="xsmall" />

        <ButtonCTA
          type="button"
          onClick={() => {
            setDeleteInProgress(true)
            handleDeleteDoc({
              userId: userId,
              productId: document.productId,
              docId: document.docId,
            })
          }}
          variant="delete"
          isDisabled={deleteInProgress}
          size="standardButton"
          buttonText="Delete Document"
          iconPosition="left"
          icon={
            deleteInProgress ? <Loader2 className="animate-spin" /> : <Trash2 />
          }
          className="w-full"
          actionError={deleteError}
          errorMessage="Failed to delete the document. Please try again or contact support."
        />
        <ButtonCTA
          type="button"
          onClick={() => {
            setConfirmDelete(false)
            setDeleteInProgress(false)
            setDeleteError(false)
          }}
          isDisabled={deleteInProgress}
          variant="secondary"
          size="standardButton"
          buttonText="Cancel"
          icon="none"
          className="w-full"
        />
      </LayoutContainer>
    </ModalSheet>
  )

  const standardView = (
    <ModalSheet
      key={document.docName}
      description={`${document.docName} Details`}
      triggerComponent={<OverviewCard document={document} />}
    >
      <LayoutContainer
        variant="flex"
        direction="col"
        margin="none"
        gap="small"
        className="w-full h-full px-8 lg:px-10"
      >
        <Heading size="h3" padding="none" textAlign="left">
          {document.docName ? document.docName : "No document name"}
        </Heading>
        <Divider width="full" />
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
            padding="small"
          >
            {document.formData?.jurisdiction
              ? document.formData.jurisdiction
              : "No location"}
          </Paragraph>
        </LayoutContainer>

        <LayoutContainer
          variant="flex"
          direction="row"
          margin="none"
          padding="none"
          alignX="start"
          className="opacity-60 gap-px lg:gap-1"
        >
          <Calendar className="min-h-4 max-h-5 lg:max-h-6  " />
          <Paragraph
            size="small"
            weight="standard"
            textAlign="left"
            padding="small"
          >
            {document.formData.signingDate
              ? `Signing: ${document.formData.signingDate}`
              : "No Signing Date"}
          </Paragraph>
        </LayoutContainer>

        <Space ySize="standard" />
        <LayoutContainer
          variant="flex"
          direction="col"
          padding="none"
          margin="none"
          gap="small"
          alignY="top"
          className="w-full h-full pb-4"
        >
          <Heading
            size="h4"
            padding="none"
            textAlign="center"
            color="secondary"
          >
            Actions
          </Heading>
          <Divider width="full" />
          <Space ySize="standard" />
          <LayoutContainer
            variant="flex"
            direction="col"
            margin="none"
            padding="none"
            gap="large"
            className=" lg:gap-4 w-full lg:flex-row items-center lg:justify-between"
          >
            <LayoutContainer
              variant="flex"
              direction="col"
              margin="none"
              padding="none"
              gap="medium"
              className="lg:gap-1 lg:flex-row"
            >
              <ButtonCTA
                type="button"
                variant="primary"
                size="standardButton"
                buttonText="View Document"
                iconPosition="left"
                icon={<File />}
                className=""
              />
              <ButtonCTA
                type="button"
                variant="secondary"
                size="standardButton"
                buttonText="Edit Answers"
                iconPosition="left"
                icon={<Pencil />}
                className=""
              />
            </LayoutContainer>

            <ButtonCTA
              type="button"
              onClick={() => setConfirmDelete(true)}
              variant="text"
              isDisabled={confirmDelete}
              size="standardText"
              buttonText="Delete Document"
              iconPosition="left"
              icon={<Trash2 />}
              className="text-red-600 hover:text-red-700"
            />
          </LayoutContainer>
        </LayoutContainer>
      </LayoutContainer>
    </ModalSheet>
  )

  return confirmDelete ? messageConfirmDelete : standardView
}

// FETCH USERS DOCUMENT DATA
const userId = "user_22665" // TODO replace with function that gets userId from clerk

export default function Dashboard() {
  const { userDocData, setUserDocData } = useLoadSavedDoc()

  const handleGetUserData = async () => {
    try {
      const data = await getUserData(userId)
      setUserDocData(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    // Fetch user data when component mounts
    handleGetUserData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  console.log("This:", userDocData)
  return (
    <LayoutContainer
      variant="flex"
      direction="col"
      padding="none"
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
        size="xxlarge"
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
        <Heading
          size="h3"
          weight="medium"
          padding="large"
          className="text-left"
        >
          Your Documents
        </Heading>
        <LayoutContainer
          variant="flex"
          direction="row"
          padding="none"
          margin="none"
          alignX="end"
          className="pb-2"
        >
          <ButtonCTA
            variant="secondary"
            type="button"
            size="smallButton"
            icon={<RefreshCcw className="h-5" />}
            onClick={handleGetUserData}
            buttonText="Refresh"
          />
        </LayoutContainer>

        {userDocData &&
          userDocData.map((document, index) => {
            return (
              <OverviewCardContent
                key={document.docId}
                document={document}
                setUserDocData={setUserDocData}
                userDocData={userDocData}
              />
            )
          })}
      </LayoutContainer>
    </LayoutContainer>
  )
}
