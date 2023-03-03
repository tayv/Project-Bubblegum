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
    text: "Navigation", 
    path: "/",
    currentPg: true,
  }
]

const BreadCrumbsArticle: FC = () => {

  return (
  <>
    <LayoutContainerSide>
      <Breadcrumbs crumbs={crumbs} />
      <Heading size="h1">Navigation</Heading>
      <Paragraph>{`On this page you'll find navigation components`}</Paragraph>

      <Section id="breadcrumbs" style="standard">
        <Heading size="h2">Breadcrumbs</Heading>
        <Paragraph>
       {`Breadcrumbs are a navigational aid that shows the user their current location. It should be placed at the top of the page, above the title. It accepts a single 'crumbs prop, which is an array of objects.`}
        </Paragraph>
        <Divider padding="xl" />

        <Heading size="h4">Example:</Heading>
        <Breadcrumbs crumbs={crumbs} />
      </Section>

      <Section id="sidenav" style="standard">
        <Heading size="h2">Side Navigation</Heading>
        <Paragraph> 
          {`Look to the left side of the page to see the side navigation. It's a work in progress.`}
        </Paragraph>
      </Section>

      <Section id="header" style="standard">
        <Heading size="h3">Header</Heading>
          <Paragraph>
          {`🚧 Work in progress`}
          </Paragraph>
      </Section>

    </LayoutContainerSide>

  </>
  )
}
export default BreadCrumbsArticle
