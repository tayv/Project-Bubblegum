import LayoutContainerSide from "@designSystem/layouts/LayoutContainerSide"
import Breadcrumbs from "@designSystem/molecules/Breadcrumbs"
import Heading from "@designSystem/atoms/Heading"
import Paragraph from "@designSystem/atoms/Paragraph"
import { FC } from "react"
import CardSection from "@designSystem/molecules/CardSection"
import Divider from "@designSystem/atoms/Divider"

// data for Breadcrumbs
const crumbs = [
  {
    text: "Home",
    path: "/",
  },
  {
    text: "Messages (System)",
    path: "/",
  },
]

const MessagesSystemArticle: FC = () => {
  return (
    <>
      <LayoutContainerSide>
        <Breadcrumbs crumbs={crumbs} />
        <Heading size="h1">Messages (Systm)</Heading>
        <Paragraph>
          On this page you&apos;ll find system message components
        </Paragraph>

        <CardSection id="header" style="standard">
          <Heading size="h3">Info Messages</Heading>
          <Paragraph>🚧 Work in progress</Paragraph>
        </CardSection>
      </LayoutContainerSide>
    </>
  )
}
export default MessagesSystemArticle
