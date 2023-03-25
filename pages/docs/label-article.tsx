import LayoutContainerSide from '@designSystem/layouts/LayoutContainerSide'
import Breadcrumbs from '@designSystem/layouts/Breadcrumbs'
import Heading from '@designSystem/layouts/Heading'
import Paragraph from '@designSystem/layouts/Paragraph'
import { FC } from 'react'
import Section from '@designSystem/layouts/Section'
import InputLabel from 'designSystem/atoms/InputLabelRadix'
import Divider from '@designSystem/layouts/Divider'

// data for Breadcrumbs
const crumbs = [
  {
    text: "Home", 
    path: "/",
    currentPg: false,
  }, {
    text: "Label", 
    path: "/",
    currentPg: true,
  }
]

const LabelArticle: FC = () => {

  return (
  <>
    <LayoutContainerSide>
      <Breadcrumbs crumbs={crumbs} />
      <Heading size="h1">Labels</Heading>
      <Paragraph>On this page you'll find label components</Paragraph>

      <Section id="header" style="standard">
        <Heading size="h3">Input Label</Heading>
          <Paragraph>
{`
The label component should be used with every input component (or input group). It's build using Radix UI's label primitive. The intent is to have each input component have the label component built in so you just need to pass a label prop.

The label component supports two styles: 'standard' and 'inline'. The inline style is used in the Checkbox component.
`}
          </Paragraph>
          <Divider padding="xl" />

         <Heading size="h4">Example: Standard Label</Heading>
         <InputLabel type="standard" label="This is a standard label" htmlFor="" />
      </Section>

    </LayoutContainerSide>

  </>
  )
}
export default LabelArticle
