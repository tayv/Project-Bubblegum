import LayoutContainerSide from '@designSystem/layouts/LayoutContainerSide'
import Breadcrumbs from '@designSystem/layouts/Breadcrumbs'
import Heading from '@designSystem/layouts/Heading'
import Paragraph from '@designSystem/layouts/Paragraph'
import { FC } from 'react'
import Section from '@designSystem/layouts/Section'
import Divider from '@designSystem/layouts/Divider'

// data for Breadcrumbs
const crumbs = [
  {
    text: "Home", 
    path: "/",
    currentPg: false,
  }, {
    text: "Messages (System)", 
    path: "/",
    currentPg: true,
  }
]

const MessagesSystemArticle: FC = () => {

  return (
  <>
    <LayoutContainerSide>
      <Breadcrumbs crumbs={crumbs} />
      <Heading size="h1">Messages (Systm)</Heading>
      <Paragraph>On this page you'll find system message components</Paragraph>

      <Section id="header" style="standard">
        <Heading size="h3">Info Messages</Heading>
          <Paragraph>🚧 Work in progress</Paragraph>
      </Section>

    </LayoutContainerSide>

  </>
  )
}
export default MessagesSystemArticle
