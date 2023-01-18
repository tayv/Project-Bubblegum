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
    text: "Dividers", 
    path: "/",
    currentPg: true,
  }
]

const DividersArticle: FC = () => {

  return (
  <>
    <LayoutContainerSide>
      <Breadcrumbs crumbs={crumbs} />
      <Heading text="Dividers" size="h1" type="primary"/>
      <Paragraph text="Visually separate content with the Divider component" size="standard" type="primary" />

      <Section id="dividers" style="standard">
        <Heading text="Divider Component" size="h3" type="primary"/>
          <Paragraph 
            text="
              The Divider component is a horizontal line that can be used to separate content. It replaces the <hr> tag
              and is typically used to split related content. For example, within a section or a group of fields.
              The Divider component has several optional props for styling:
            " 
            size="standard" 
            type="primary" 
          />
          <br/>
          <Heading text="Color prop:" size="h3" type="secondary"/>
          <Heading text="Example: standard" size="h4" type="primary"/>
          <Divider color="standard" />
          <Heading text="Example: darkmode" size="h4" type="primary"/>
          <Divider color="darkmode" />
          <Heading text="Example: white" size="h4" type="primary"/>
          <Divider color="white" />
          <Heading text="Example: black" size="h4" type="primary"/>
          <Divider color="black" />
          <Heading text="Example: highlight" size="h4" type="primary"/>
          <Divider color="highlight" />

          <br/>

          <Heading text="Size prop:" size="h3" type="secondary"/>
          <Heading text="Example: standard" size="h4" type="primary"/>
          <Divider size="standard" />
          <Heading text="Example: medium" size="h4" type="primary"/>
          <Divider size="medium" />
          <Heading text="Example: large" size="h4" type="primary"/>
          <Divider size="large" />
          <Heading text="Example: xlarge" size="h4" type="primary"/>
          <Divider size="xl" />
          
          <br/>

          <Heading text="Padding prop:" size="h3" type="secondary"/>
          <Heading text="Example: standard" size="h4" type="primary"/>
          <Divider padding="standard" />
          <Heading text="Example: medium" size="h4" type="primary"/>
          <Divider padding="medium" />
          <Heading text="Example: large" size="h4" type="primary"/>
          <Divider padding="large" />
          <Heading text="Example: xl" size="h4" type="primary"/>
          <Divider padding="xl" />
          <Heading text="Example: xxl" size="h4" type="primary"/>
          <Divider padding="xxl" />
          <Heading text="Example: none" size="h4" type="primary"/>
          <Divider padding="none" />

          <br/>

          <Heading text="className prop:" size="h3" type="secondary"/>
          <Heading text="Example: className (custom css)" size="h4" type="primary"/>
          <Divider className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

      </Section>

    </LayoutContainerSide>

  </>
  )
}
export default DividersArticle
