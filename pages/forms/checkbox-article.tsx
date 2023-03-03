import LayoutContainerSide from '@components/layout/LayoutContainerSide'
import Breadcrumbs from '@components/layout/Breadcrumbs'
import Heading from '@components/layout/Heading'
import Paragraph from '@components/layout/Paragraph'
import { FC } from 'react'
import Section from '@components/layout/Section'
import Checkbox from '@components/atoms/Checkbox'
import Divider from '@components/layout/Divider'


// data for Breadcrumbs
const crumbs = [
  {
    text: "Home", 
    path: "/",
    currentPg: false,
  }, {
    text: "Checkbox", 
    path: "/",
    currentPg: true,
  }
]

const CheckboxArticle: FC = () => {

  return (
  <>
    <LayoutContainerSide>
      <Breadcrumbs crumbs={crumbs} />
      <Heading size="h1">Checkboxes</Heading>
      <Paragraph>On this page you'll find checkbox components.</Paragraph>

      <Section id="header" style="standard">
        <Heading size="h3">Checkbox</Heading>
          <Paragraph>This is a standard checkbox. It's used for binary choices.</Paragraph>
          <Divider padding="xl" />

          <Heading size="h4" type="secondary">Example:</Heading>
          <Checkbox 
            id="checkboxInput" 
            style="standard" 
            label="This is a checkbox label" 
          />
      </Section>

      <Section id="header" style="standard">
        <Heading size="h3">Checkbox List</Heading>
          <Paragraph>This is a list of checkboxes. It's used for multi-select choices.</Paragraph>
          <Divider padding="xl" />
          <Heading size="h4" type="secondary">Example: WIP</Heading>
          
      </Section>

    </LayoutContainerSide>

  </>
  )
}
export default CheckboxArticle
