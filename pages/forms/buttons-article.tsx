import LayoutContainerSide from 'designSystem/layout/LayoutContainerSide'
import Breadcrumbs from 'designSystem/layout/Breadcrumbs'
import Heading from 'designSystem/layout/Heading'
import Paragraph from 'designSystem/layout/Paragraph'
import { FC } from 'react'
import Section from 'designSystem/layout/Section'

// data for Breadcrumbs
const crumbs = [
  {
    text: "Home", 
    path: "/",
    currentPg: false,
  }, {
    text: "Buttons", 
    path: "/",
    currentPg: true,
  }
]

const ButtonsArticle: FC = () => {

  return (
  <>
    <LayoutContainerSide>
      <Breadcrumbs crumbs={crumbs} />
      <Heading size="h1">Buttons</Heading>
      <Paragraph>On this page you'll find button components.</Paragraph>

      <Section id="header" style="standard">
        <Heading size="h3">Primary Button</Heading>
          <Paragraph>🚧 Work in progress</Paragraph>
      </Section>

      <Section id="header" style="standard">
        <Heading size="h3">Secondary Button</Heading>
          <Paragraph>🚧 Work in progress</Paragraph>
      </Section>

      <Section id="header" style="standard">
        <Heading size="h3">Submit Button</Heading>
          <Paragraph>🚧 Work in progress</Paragraph>
      </Section>

    </LayoutContainerSide>

  </>
  )
}
export default ButtonsArticle
