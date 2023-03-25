import LayoutContainerSide from 'designSystem/layout/LayoutContainerSide'
import Breadcrumbs from 'designSystem/layout/Breadcrumbs'
import Heading from 'designSystem/layout/Heading'
import Paragraph from 'designSystem/layout/Paragraph'
import { FC } from 'react'
import Section from 'designSystem/layout/Section'
import Divider from 'designSystem/layout/Divider'
import BlankSpace from 'designSystem/layout/BlankSpace'

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
      <Heading size="h1">Dividing Content</Heading>
      <Paragraph>Visually separate content with divider and spacing components</Paragraph>

      <Section id="dividers" style="standard">
        <Heading size="h3">Divider Component</Heading>
          <Paragraph>
{`
The Divider component is a horizontal line that can be used to separate content. It replaces the <hr> tag and is typically used to split related content. For example, within a section or a group of fields.

The Divider component has several optional props for styling:
`}
          </Paragraph>

          <BlankSpace />

          <Heading size="h3" type="secondary">color prop:</Heading>
          <Heading size="h4">Example: standard</Heading>
          <Divider color="standard" />
          <Heading size="h4">Example: darkmode</Heading>
          <Divider color="darkmode" />
          <Heading size="h4">Example: white</Heading>
          <Divider color="white" />
          <Heading size="h4">Example: black</Heading>
          <Divider color="black" />
          <Heading size="h4">Example: highlight</Heading>
          <Divider color="highlight" />

          <BlankSpace ySize="medium"/>

          <Heading size="h3" type="secondary">Size prop:</Heading>
          <Heading size="h4">Example: standard</Heading>
          <Divider size="standard" />
          <Heading size="h4">Example: medium</Heading>
          <Divider size="medium" />
          <Heading size="h4">Example: large</Heading>
          <Divider size="large" />
          <Heading size="h4">Example: xlarge</Heading>
          <Divider size="xl" />
          
          <BlankSpace ySize="medium" />

          <Heading size="h3" type="secondary">Padding Prop:</Heading>
          <Heading size="h4">Example: standard</Heading>
          <Divider padding="standard" />
          <Heading size="h4">Example: medium</Heading>
          <Divider padding="medium" />
          <Heading size="h4">Example: large</Heading>
          <Divider padding="large" />
          <Heading size="h4">Example: xl</Heading>
          <Divider padding="xl" />
          <Heading size="h4">Example: xxl</Heading>
          <Divider padding="xxl" />
          <Heading size="h4">Example: none</Heading>
          <Divider padding="none" />

          <BlankSpace ySize="medium" />

          <Heading size="h3" type="secondary">className: Prop:</Heading>
          <Heading size="h4">Example: className (custom css)</Heading>
          <Divider className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

      </Section>

      <Section id="blank-space" style="standard">
        <Heading size="h3">Blank Space Component</Heading>
          <Paragraph>
{`
The Blank Space component is used in place of a <br> tag. It's a blank div that can be used to add vertical and horizontal padding. The Blank Space component has several optional props for styling: ySize, xSize, and className.

ySize and xSize are used to set the height and width of the blank space. The className prop allows flexiblity with custom css. className is intended only for fine tuning spacing, the example below only uses a background color to make it easier to view. 

NOTE: You should set xSize and ySize to override when using the className prop to avoid unexpected results with conflicting css padding.
`}
          </Paragraph>

          <BlankSpace />

          <Heading size="h3" type="secondary">xSize ySize Props:</Heading>
          <Heading size="h4">Example: xsmall</Heading>
          <BlankSpace ySize="xsmall" xSize="medium" className="bg-sky-100"/>
          <Heading size="h4">Example: small</Heading>
          <BlankSpace ySize="small" xSize="medium" className="bg-sky-100"/>
          <Heading size="h4">Example: standard</Heading>
          <BlankSpace ySize="standard" xSize="standard" className="bg-sky-100"/>
          <Heading size="h4">Example: medium</Heading>
          <BlankSpace ySize="medium" xSize="medium" className="bg-sky-100"/>
          <Heading size="h4">Example: large</Heading>
          <BlankSpace ySize="large" xSize="medium" className="bg-sky-100"/>
          <Heading size="h4">Example: xlarge</Heading>
          <BlankSpace ySize="xlarge" xSize="medium" className="bg-sky-100"/>
          <Heading size="h4">Example: xxlarge</Heading>
          <BlankSpace ySize="xxlarge" xSize="medium" className="bg-sky-100"/>
          <Heading size="h4">Example: none</Heading>
          <BlankSpace ySize="none" xSize="medium" className="bg-sky-100"/>

          <BlankSpace />
          <Heading size="h3" type="secondary">xSize/ySize override + className prop:</Heading>
          <Heading size="h4">Example: override (custom css)</Heading>
          <BlankSpace ySize="override" xSize="override" className="bg-sky-100 py-3"/>
      </Section>
    </LayoutContainerSide>

  </>
  )
}
export default DividersArticle
