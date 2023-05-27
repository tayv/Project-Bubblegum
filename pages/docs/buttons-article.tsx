import LayoutContainerSide from "@designSystem/layouts/LayoutContainerSide"
import Breadcrumbs from "@designSystem/molecules/Breadcrumbs"
import Heading from "@designSystem/atoms/Heading"
import Paragraph from "@designSystem/atoms/Paragraph"
import { FC } from "react"
import CardSection from "@designSystem/molecules/CardSection"

// data for Breadcrumbs
const crumbs = [
  {
    text: "Home",
    path: "/",
  },
  {
    text: "Buttons",
    path: "/",
  },
]

const ButtonsArticle: FC = () => {
  return (
    <>
      <LayoutContainerSide>
        <Breadcrumbs crumbs={crumbs} />
        <Heading size="h1">Buttons</Heading>
        <Paragraph>On this page you&apos;ll find button components.</Paragraph>

        <CardSection id="header" style="standard">
          <Heading size="h3">Primary Button</Heading>
          <Paragraph>🚧 Work in progress</Paragraph>
        </CardSection>

        <CardSection id="header" style="standard">
          <Heading size="h3">Secondary Button</Heading>
          <Paragraph>🚧 Work in progress</Paragraph>
        </CardSection>

        <CardSection id="header" style="standard">
          <Heading size="h3">Submit Button</Heading>
          <Paragraph>🚧 Work in progress</Paragraph>
        </CardSection>
      </LayoutContainerSide>
    </>
  )
}
export default ButtonsArticle
