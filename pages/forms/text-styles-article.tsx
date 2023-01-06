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
    text: "Text Styles", 
    path: "/",
    currentPg: true,
  }
]

const TextStylesArticle: FC = () => {

  return (
  <>
    <LayoutContainerSide>
      <Breadcrumbs crumbs={crumbs} />
      <Heading text="Text Styles" size="h1" type="primary"/>
      <Paragraph text="On this page you'll find text components." size="standard" type="primary" />

      <br />
      <hr />

      <Section id="header" style="standard">
        <Heading text="Paragraph Component" size="h3" type="primary"/>
          <Paragraph 
            text="The Paragraph component is used to standardize body text in the app. Currently it has two props: size and type. 
                  The size prop has three variations: &quot;small&quot;, &quot;standard&quot;, and &quot;large&quot; as well as two type props: &quot;primary&quot; and &quot;secondary&quot;.
                  It currently requires special characters to be escaped and cannot be passed links." 
            size="standard" 
            type="primary" 
          />

          <br/>
          <Heading text="Example: Size Prop Variations" size="h4" type="primary"/>
          <Paragraph 
            text="This is a small size paragraph."
            size="small" 
            type="primary" 
          />
          <Paragraph 
            text="This is a standard size paragraph."
            size="standard" 
            type="primary" 
          />
          <Paragraph 
            text="This is a large size paragraph."
            size="large" 
            type="primary" 
          />

          <br/>
          <Heading text="Example: Style Prop Variations" size="h4" type="primary"/>
          <Paragraph 
            text="This paragraph uses the primary style."
            size="standard" 
            type="primary" 
          />
          <Paragraph 
            text="This paragraph uses the secondary style."
            size="standard" 
            type="secondary" 
          />
      </Section>

    </LayoutContainerSide>

  </>
  )
}
export default TextStylesArticle
