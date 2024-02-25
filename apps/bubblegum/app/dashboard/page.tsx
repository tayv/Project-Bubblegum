import { LayoutContainer } from "@uiRepo/layout"
import { Heading } from "@uiRepo/components"
import { Paragraph } from "@uiRepo/components"
import { Wand } from "lucide-react"

export default function Dashboard() {
  return (
    <>
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
      >
        Pick a product below and get started for free. No credit card required!
      </Paragraph>
      <LayoutContainer
        variant="flex"
        direction="col"
        alignY="center"
        alignX="center"
      >
        Stuff goes here
      </LayoutContainer>
    </>
  )
}
