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
      <Paragraph text="On this page you'll find checkbox components." size="standard" type="primary" />

      <br />
      <hr />

      <Section id="header" style="standard">
        <Heading text="Checkbox" size="h3" type="primary"/>
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
export default CheckboxArticle
