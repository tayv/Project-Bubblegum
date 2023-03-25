import LayoutContainerSide from '@designSystem/layouts/LayoutContainerSide'
import Breadcrumbs from '@designSystem/layouts/Breadcrumbs'
import Heading from '@designSystem/atoms/Heading'
import Paragraph from '@designSystem/atoms/Paragraph'
import { FC } from 'react'
import SectionCard from '@designSystem/molecules/SectionCard'
import Divider from '@designSystem/atoms/Divider'

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

      <SectionCard id="header" style="standard">
        <Heading size="h3">Info Messages</Heading>
          <Paragraph>🚧 Work in progress</Paragraph>
      </SectionCard>

    </LayoutContainerSide>

  </>
  )
}
export default MessagesSystemArticle
