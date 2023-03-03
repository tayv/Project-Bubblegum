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
      <Heading text="Checkbox" size="h1" type="primary"/>
      <Paragraph>On this page you'll find checkbox components.</Paragraph>

      <Section id="header" style="standard">
        <Heading text="Checkbox" size="h3" type="primary"/>
          <Paragraph>This is a standard checkbox. It's used for binary choices.</Paragraph>
          <Divider padding="xl" />

          <Heading text="Example:" size="h4" type="primary"/>
          <Checkbox 
            id="checkboxInput" 
            style="standard" 
            label="This is a checkbox label" 
          />
      </Section>

      <Section id="header" style="standard">
        <Heading text="Checkbox List" size="h3" type="primary"/>
          <Paragraph>This is a list of checkboxes. It's used for multi-select choices.</Paragraph>
          <Divider padding="xl" />
          <Heading text="Example: WIP" size="h4" type="primary"/>
          
      </Section>

    </LayoutContainerSide>

  </>
  )
}
export default CheckboxArticle
