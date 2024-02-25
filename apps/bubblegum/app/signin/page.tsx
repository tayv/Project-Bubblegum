import { Heading } from "@uiRepo/components"
import Paragraph from "@ui/Paragraph"
import { LayoutContainer } from "@uiRepo/layout"
import { Space } from "@uiRepo/layout"
import { SignIn } from "@clerk/nextjs"

export default function Home() {
  return (
    <>
      {/* PAGE CONTENT (use gap to distribute sections evenly) */}
      <LayoutContainer
        tag="div"
        direction="col"
        variant="flex"
        gap="large"
        padding="none"
        margin="none"
      >
        {/* HEADING */}
        <LayoutContainer
          variant="flex"
          direction="col"
          padding="none"
          margin="none"
          className=""
        >
          {/* <Heading size="h1" weight="bold" padding="standard">
            Sign in
          </Heading> */}
          {/* <Paragraph
            weight="medium"
            color="secondary"
            size="large"
            className="pl-1"
          >
            
          </Paragraph> */}
          <SignIn />
        </LayoutContainer>
      </LayoutContainer>
    </>
  )
}
