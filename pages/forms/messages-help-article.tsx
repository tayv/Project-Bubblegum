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
      <Heading size="h1">Messages</Heading>
      <Paragraph>On this page you'll find help message components</Paragraph>

      <Section id="tipMessage" style="standard">
        <Heading size="h3">Tip Messages</Heading>
          <Paragraph>
{`There are two prop variations of the Tip component: tip and example. 
The tip prop is for proactive help and context for a specific field. It should appear below the input's label.
The example prop is for providing context for a specific field. It should appear below the field.
`}
          </Paragraph>
          <Divider padding="xl" />

          <Heading size="h4">Example: Tip Message</Heading>
          <Input name="tipMessage" label="This is a label:" tipText="This is a tip messsage." />
          
          <Divider padding="xl" />
          
          <Heading size="h4">Example: Example Message</Heading>
          <Input name="exampleMessage" label="This is a label:" exampleText="This is an example messsage." />

      </Section>

    </LayoutContainerSide>

  </>
  )
}
export default MessagesHelpArticle
