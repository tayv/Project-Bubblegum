import Heading from "./components/ui/Heading"
import Paragraph from "app/components/ui/Paragraph"
import HelloWorld from './hello.mdx'

export default function Home() {
  return (
    <>
     <Heading size="h1" weight="bold" padding="none">Home</Heading>
     <Paragraph>This is a test home page with app router.</Paragraph>
     <HelloWorld />
    </>
  )
}
