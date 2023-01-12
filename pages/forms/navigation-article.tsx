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
      <Heading text="Navigation" size="h1" type="primary"/>
      <Paragraph text="On this page you'll find navigation components." size="standard" type="primary" />
      <br />
      <hr />

      <Section id="breadcrumbs" style="standard">
        <Heading text="Breadcrumbs" size="h2" type="primary"/>
        <Paragraph 
          text="Breadcrumbs are a navigational aid that shows the user their current location. It should be placed at the top of the page, above the title. It accepts a single 'crumbs prop, which is an array of objects." 
          size="standard" 
          type="primary" 
        />
        <br />
        <hr/>
        <br/>
        <Heading text="Example:" size="h4" type="primary"/>
        <Breadcrumbs crumbs={crumbs} />
      </Section>

      <Section id="sidenav" style="standard">
        <Heading text="Side Navigation" size="h2" type="primary"/>
        <Paragraph 
          text="Look to the left side of the page to see the side navigation. It's a work in progress." 
          size="standard" 
          type="primary" 
        />
      </Section>

      <Section id="header" style="standard">
        <Heading text="Header" size="h3" type="primary"/>
          <Paragraph 
            text="🚧 Work in progress" 
            size="standard" 
            type="primary" 
          />
      </Section>

    </LayoutContainerSide>

  </>
  )
}
export default BreadCrumbsArticle
