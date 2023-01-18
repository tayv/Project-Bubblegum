import LayoutContainerSide from '@components/layout/LayoutContainerSide'
import Breadcrumbs from '@components/layout/Breadcrumbs'
import Heading from '@components/layout/Heading'
import Paragraph from '@components/layout/Paragraph'
import { FC } from 'react'
import Section from '@components/layout/Section'
import Input from '@components/atoms/Input'
import Divider from '@components/layout/Divider'

// data for Breadcrumbs
const crumbs = [
  {
    text: "Home", 
    path: "/",
    currentPg: false,
  }, {
    text: "Messages (Help)", 
    path: "/",
    currentPg: true,
  }
]

const MessagesHelpArticle: FC = () => {

  return (
  <>
    <LayoutContainerSide>
      <Breadcrumbs crumbs={crumbs} />
      <Heading text="Messages" size="h1" type="primary"/>
      <Paragraph text="On this page you'll find help message components." size="standard" type="primary" />

      <Section id="tipMessage" style="standard">
        <Heading text="Tip Messages" size="h3" type="primary"/>
          <Paragraph 
            text="
            There are two prop variations of the Tip component: tip and example. 
            The tip prop is for proactive help and context for a specific field. It should appear below the input's label.
            The example prop is for providing context for a specific field. It should appear below the field.
            " 
            size="standard" 
            type="primary" 
          />
          
          <Divider padding="xl" />

          <Heading text="Example: Tip Message" size="h4" type="primary"/>
          <Input name="tipMessage" label="This is a label:" tipText="This is a tip messsage." />
          
          <Divider padding="xl" />
          
          <Heading text="Example: Example Message" size="h4" type="primary"/>
          <Input name="exampleMessage" label="This is a label:" exampleText="This is an example messsage." />

      </Section>

    </LayoutContainerSide>

  </>
  )
}
export default MessagesHelpArticle
