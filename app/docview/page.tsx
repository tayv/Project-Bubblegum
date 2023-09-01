import LayoutContainer from "@ui/LayoutContainer"
import Heading from "@ui/Heading"
import Paragraph from "@ui/Paragraph"
import { Wand } from "lucide-react"

export default function DocView() {
  return (
    <>
      <Heading
        size="h1"
        weight="bold"
        padding="standard"
        className="text-center"
      >
        Product Name
      </Heading>
      <LayoutContainer
        variant="flex"
        direction="col"
        alignY="center"
        alignX="center"
      >
        <Wand className="w-[30%] h-[30%]" />
        <Paragraph
          size="xxxlarge"
          textAlign="center"
          padding="large"
          space="snug"
        >
          Building your document ...
        </Paragraph>
      </LayoutContainer>
    </>
  )
}
