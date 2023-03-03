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
      <Heading text="Buttons" size="h1" type="primary"/>
      <Paragraph>On this page you'll find button components.</Paragraph>

      <Section id="header" style="standard">
        <Heading text="Primary Button" size="h3" type="primary"/>
          <Paragraph>🚧 Work in progress</Paragraph>
      </Section>

      <Section id="header" style="standard">
        <Heading text="Secondary Button" size="h3" type="primary"/>
          <Paragraph>🚧 Work in progress</Paragraph>
      </Section>

      <Section id="header" style="standard">
        <Heading text="Submit Button" size="h3" type="primary"/>
          <Paragraph>🚧 Work in progress</Paragraph>
      </Section>

    </LayoutContainerSide>

  </>
  )
}
export default ButtonsArticle
