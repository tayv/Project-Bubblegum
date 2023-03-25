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
      <Heading size="h1">UI Cards</Heading>
      <Paragraph>On this page you'll find UI container components</Paragraph>

      <Section id="intro" style="standard">
        <Heading size="h3">Section Container</Heading>
        <Paragraph>
{`Each section should be in its own UI container. Containers are used to group related content like input fields.

There's four props available: Standard, Blank, and Color. Standard is the default style. Blank has a transparent background. Color has a background color.
`}
        </Paragraph>
      </Section>

      <Divider padding="large" />
      
      <Section id="example-standard" style="standard">
        <Heading size="h3">Example: Standard Section Container"</Heading>
        <Paragraph>This is an example of a standard section container. It has a white background.</Paragraph>
      </Section>

      <Section id="example-blank" style="blank">
        <Heading size="h3">Example: Blank Section Container</Heading>
        <Paragraph>This is an example of a blank section container. It has a no background.</Paragraph>
      </Section>

      <Section id="example-color" style="colorRed">
        <Heading size="h3">Example: Color Section Container</Heading>
        <Paragraph>This is an example of a styled section container. It has a colored background.</Paragraph>
      </Section>

      <Section id="example-color" style="colorBlue">
        <Heading size="h3">Example: Color Section Container</Heading> 
        <Paragraph>This is an example of a styled section container. It has a colored background.</Paragraph>
      </Section>

      <Section id="example-color" style="colorGreen">
       <Heading size="h3">Example: Color Section Container</Heading>
        <Paragraph>This is an example of a styled section container. It has a colored background.</Paragraph>
      </Section>

      <Section id="example-color" style="colorYellow">
       <Heading size="h3">Example: Color Section Container</Heading>
        <Paragraph>This is an example of a styled section container. It has a colored background.</Paragraph>
      </Section>

      <Section id="example-color" style="colorPink">
        <Heading size="h3">Example: Color Section Container</Heading>
        <Paragraph>This is an example of a styled section container. It has a colored background.</Paragraph>
      </Section>

      <Section id="example-color" style="colorPurple">
        <Heading size="h3">Example: Color Section Container</Heading>
        <Paragraph>This is an example of a styled section container. It has a colored background.</Paragraph>
      </Section>

      <Section id="example-color" style="colorBlack">
        <Heading size="h3">Example: Color Section Container</Heading>
        <Paragraph>This is an example of a styled section container. It has a colored background.</Paragraph>
      </Section>

    </LayoutContainerSide>

  </>
  )
}
export default UIContainersArticle
