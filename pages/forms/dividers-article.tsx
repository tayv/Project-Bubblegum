import LayoutContainerSide from '@components/layout/LayoutContainerSide'
import Breadcrumbs from '@components/layout/Breadcrumbs'
import Heading from '@components/layout/Heading'
import Paragraph from '@components/layout/Paragraph'
import { FC } from 'react'
import Section from '@components/layout/Section'
import Divider from '@components/layout/Divider'
import BlankSpace from '@components/layout/BlankSpace'

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
      <Paragraph text="Visually separate content with divider and spacing components" size="standard" type="primary" />

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

          <BlankSpace />

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

          <BlankSpace ySize="medium"/>

          <Heading text="Size prop:" size="h3" type="secondary"/>
          <Heading text="Example: standard" size="h4" type="primary"/>
          <Divider size="standard" />
          <Heading text="Example: medium" size="h4" type="primary"/>
          <Divider size="medium" />
          <Heading text="Example: large" size="h4" type="primary"/>
          <Divider size="large" />
          <Heading text="Example: xlarge" size="h4" type="primary"/>
          <Divider size="xl" />
          
          <BlankSpace ySize="medium" />

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

          <BlankSpace ySize="medium" />

          <Heading text="className prop:" size="h3" type="secondary"/>
          <Heading text="Example: className (custom css)" size="h4" type="primary"/>
          <Divider className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

      </Section>

      <Section id="blank-space" style="standard">
        <Heading text="Blank Space Component" size="h3" type="primary"/>
          <Paragraph 
            text="
              The Blank Space component is used in place of a <br> tag. It's a blank div that can be used to add vertical and horizontal padding.
              The Blank Space component has several optional props for styling: ySize, xSize, and className.
              ySize and xSize are used to set the height and width of the blank space. The className prop allows flexiblity with custom css.
              className is intended only for fine tuning spacing, the example below only uses a background color to make it easier to view. 
              NOTE: You should set xSize and ySize to override when using the className prop to avoid unexpected results with conflicting css padding.
            " 
            size="standard" 
            type="primary" 
          />

          <BlankSpace />

          <Heading text="xSize ySize props:" size="h3" type="secondary"/>
          <Heading text="Example: xsmall" size="h4" type="primary"/>
          <BlankSpace ySize="xsmall" xSize="medium" className="bg-sky-100"/>
          <Heading text="Example: small" size="h4" type="primary"/>
          <BlankSpace ySize="small" xSize="medium" className="bg-sky-100"/>
          <Heading text="Example: standard" size="h4" type="primary"/>
          <BlankSpace ySize="standard" xSize="standard" className="bg-sky-100"/>
          <Heading text="Example: medium" size="h4" type="primary"/>
          <BlankSpace ySize="medium" xSize="medium" className="bg-sky-100"/>
          <Heading text="Example: large" size="h4" type="primary"/>
          <BlankSpace ySize="large" xSize="medium" className="bg-sky-100"/>
          <Heading text="Example: xlarge" size="h4" type="primary"/>
          <BlankSpace ySize="xlarge" xSize="medium" className="bg-sky-100"/>
          <Heading text="Example: xxlarge" size="h4" type="primary"/>
          <BlankSpace ySize="xxlarge" xSize="medium" className="bg-sky-100"/>
          <Heading text="Example: none" size="h4" type="primary"/>
          <BlankSpace ySize="none" xSize="medium" className="bg-sky-100"/>

          <BlankSpace />
          <Heading text="xSize/ySize override + className prop:" size="h3" type="secondary"/>
          <Heading text="Example: override (custom css)" size="h4" type="primary"/>
          <BlankSpace ySize="override" xSize="override" className="bg-sky-100 py-3"/>
      </Section>
    </LayoutContainerSide>

  </>
  )
}
export default DividersArticle
