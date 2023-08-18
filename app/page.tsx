import Heading from "@ui/Heading"
import Paragraph from "@ui/Paragraph"
import HelloWorld from "./hello.mdx"

export default function Home() {
  return (
    <>
      <Heading size="h1" weight="bold" padding="standard">
        Home
      </Heading>

      <HelloWorld />
    </>
  )
}
