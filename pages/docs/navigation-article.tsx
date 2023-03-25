import LayoutContainerSide from '@designSystem/layouts/LayoutContainerSide'
import Breadcrumbs from '@designSystem/layouts/Breadcrumbs'
import Heading from '@designSystem/atoms/Heading'
import Paragraph from '@designSystem/atoms/Paragraph'
import { FC } from 'react'
import SectionCard from '@designSystem/molecules/SectionCard'
import Divider from '@designSystem/atoms/Divider'


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

      <SectionCard id="breadcrumbs" style="standard">
        <Heading size="h2">Breadcrumbs</Heading>
        <Paragraph>
       {`Breadcrumbs are a navigational aid that shows the user their current location. It should be placed at the top of the page, above the title. It accepts a single 'crumbs prop, which is an array of objects.`}
        </Paragraph>
        <Divider padding="xl" />

        <Heading size="h4">Example:</Heading>
        <Breadcrumbs crumbs={crumbs} />
      </SectionCard>

      <SectionCard id="sidenav" style="standard">
        <Heading size="h2">Side Navigation</Heading>
        <Paragraph> 
          {`Look to the left side of the page to see the side navigation. It's a work in progress.`}
        </Paragraph>
      </SectionCard>

      <SectionCard id="header" style="standard">
        <Heading size="h3">Header</Heading>
          <Paragraph>
          {`🚧 Work in progress`}
          </Paragraph>
      </SectionCard>

    </LayoutContainerSide>

  </>
  )
}
export default BreadCrumbsArticle
