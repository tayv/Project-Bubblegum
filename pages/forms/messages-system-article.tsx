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
      <Paragraph text="On this page you'll find system message components." size="standard" type="primary" />

      <Section id="header" style="standard">
        <Heading text="Info Message" size="h3" type="primary"/>
          <Paragraph 
            text="🚧 Work in progress" 
            size="standard" 
            type="primary" 
          />
      </Section>

    </LayoutContainerSide>

  </>
  )
}
export default MessagesSystemArticle
