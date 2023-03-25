import LayoutContainerSide from '@designSystem/layouts/LayoutContainerSide'
import Breadcrumbs from '@designSystem/layouts/Breadcrumbs'
import Heading from '@designSystem/layouts/Heading'
import Paragraph from '@designSystem/layouts/Paragraph'
import { FC } from 'react'
import Section from '@designSystem/layouts/Section'

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