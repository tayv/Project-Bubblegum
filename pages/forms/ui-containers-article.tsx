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
    text: "UI Cards", 
    path: "/",
    currentPg: true,
  }
]

const UIContainersArticle: FC = () => {

  return (
  <>
    <LayoutContainerSide>
      <Breadcrumbs crumbs={crumbs} />
      <Heading text="UI Cards" size="h1" type="primary"/>
      <Paragraph>On this page you'll find UI container components</Paragraph>

      <Section id="intro" style="standard">
        <Heading text="Section Container" size="h3" type="primary"/>
          <Paragraph>
{`Each section should be in its own UI container. Containers are used to group related content like input fields.

There's four props available: Standard, Blank, and Color. Standard is the default style. Blank has a transparent background. Color has a background color.
`}
          </Paragraph>
      </Section>

      <Divider padding="large" />
      
      <Section id="example-standard" style="standard">
        <Heading text="Example: Standard Section Container" size="h3" type="primary"/>
          <Paragraph>This is an example of a standard section container. It has a white background.</Paragraph>
      </Section>

      <Section id="example-blank" style="blank">
        <Heading text="Example: Blank Section Container" size="h3" type="primary"/>
          <Paragraph>This is an example of a blank section container. It has a no background.</Paragraph>
      </Section>

      <Section id="example-color" style="colorRed">
        <Heading text="Example: Color Section Container" size="h3" type="primary"/>
          <Paragraph>This is an example of a styled section container. It has a colored background.</Paragraph>
      </Section>

      <Section id="example-color" style="colorBlue">
        <Heading text="Example: Color Section Container" size="h3" type="primary"/>
        <Paragraph>This is an example of a styled section container. It has a colored background.</Paragraph>
      </Section>

      <Section id="example-color" style="colorGreen">
        <Heading text="Example: Color Section Container" size="h3" type="primary"/>
        <Paragraph>This is an example of a styled section container. It has a colored background.</Paragraph>
      </Section>

      <Section id="example-color" style="colorYellow">
        <Heading text="Example: Color Section Container" size="h3" type="primary"/>
        <Paragraph>This is an example of a styled section container. It has a colored background.</Paragraph>
      </Section>

      <Section id="example-color" style="colorPink">
        <Heading text="Example: Color Section Container" size="h3" type="primary"/>
        <Paragraph>This is an example of a styled section container. It has a colored background.</Paragraph>
      </Section>

      <Section id="example-color" style="colorPurple">
        <Heading text="Example: Color Section Container" size="h3" type="primary"/>
        <Paragraph>This is an example of a styled section container. It has a colored background.</Paragraph>
      </Section>

      <Section id="example-color" style="colorBlack">
        <Heading text="Example: Color Section Container" size="h3" type="primary"/>
        <Paragraph>This is an example of a styled section container. It has a colored background.</Paragraph>
      </Section>

    </LayoutContainerSide>

  </>
  )
}
export default UIContainersArticle
