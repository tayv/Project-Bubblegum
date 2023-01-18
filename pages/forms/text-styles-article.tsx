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

      <Section id="header" style="standard">
        <Heading text="Heading Component" size="h3" type="primary"/>
          <Paragraph 
            text="The Heading component is used to standardize header text in the app. It has two props: size and type. 
                  The size prop has four variations: &quot;h1&quot;, &quot;h2&quot;, &quot;h3&quot;, and &quot;h4&quot; as well as two type props: &quot;primary&quot; and &quot;secondary&quot;.
                  It currently requires special characters to be escaped and cannot be passed links." 
            size="standard" 
            type="primary" 
          />

          <Divider padding="xl" />

          <Heading text="Example: Size Prop Variations" size="h4" type="primary"/>
          <Heading text="This is an h1 heading" size="h1" type="primary"/>
          <Heading text="This is an h2 heading" size="h2" type="primary"/>
          <Heading text="This is an h3 heading" size="h3" type="primary"/>
          <Heading text="This is an h4 heading" size="h4" type="primary"/>

          <br/>
          <Heading text="Example: Style Prop Variations" size="h4" type="primary"/>
          <Heading text="This is a primary style heading" size="h4" type="primary"/>
          <Heading text="This is a secondary style heading" size="h4" type="secondary"/>

      </Section>

      <Section id="header" style="standard">
        <Heading text="Paragraph Component" size="h3" type="primary"/>
          <Paragraph 
            text="The Paragraph component is used to standardize body text in the app. Currently it has two props: size and type. 
                  The size prop has three variations: &quot;small&quot;, &quot;standard&quot;, and &quot;large&quot; as well as two type props: &quot;primary&quot; and &quot;secondary&quot;.
                  It currently requires special characters to be escaped and cannot be passed links." 
            size="standard" 
            type="primary" 
          />

        
          <Divider padding="xl" />
          
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
