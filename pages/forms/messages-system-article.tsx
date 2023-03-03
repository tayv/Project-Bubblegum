import LayoutContainerSide from '@components/layout/LayoutContainerSide'
import Breadcrumbs from '@components/layout/Breadcrumbs'
import Heading from '@components/layout/Heading'
import Paragraph from '@components/layout/Paragraph'
import { FC } from 'react'
import Section from '@components/layout/Section'
import Divider from '@components/layout/Divider'

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
      <Heading text="Messages (System)" size="h1" type="primary"/>
      <Paragraph>On this page you'll find system message components</Paragraph>

      <Section id="header" style="standard">
        <Heading text="Info Message" size="h3" type="primary"/>
          <Paragraph>🚧 Work in progress</Paragraph>
      </Section>

    </LayoutContainerSide>

  </>
  )
}
export default MessagesSystemArticle
