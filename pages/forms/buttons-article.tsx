import LayoutContainerSide from '@components/layout/LayoutContainerSide'
import Breadcrumbs from '@components/layout/Breadcrumbs'
import Heading from '@components/layout/Heading'
import Paragraph from '@components/layout/Paragraph'
import { FC } from 'react'
import Section from '@components/layout/Section'


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
