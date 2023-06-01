import LayoutContainerSide from "@designSystem/layouts/LayoutContainerSide"
import Breadcrumbs from "@designSystem/molecules/Breadcrumbs"
import Heading from "@designSystem/atoms/Heading"
import Paragraph from "@designSystem/atoms/Paragraph"
import { FC } from "react"
import CardSection from "@designSystem/molecules/CardSection"
import Divider from "@designSystem/atoms/Divider"
import Space from "@designSystem/atoms/Space"

// data for Breadcrumbs
const crumbs = [
  {
    text: "Home",
    path: "/",
  },
  {
    text: "Dividers",
    path: "/",
  },
]

const DividersArticle: FC = () => {
  return (
    <>
      <LayoutContainerSide>
        <Breadcrumbs crumbs={crumbs} />
        <Heading size="h1">Dividing Content</Heading>
        <Paragraph>
          Visually separate content with divider and spacing components
        </Paragraph>

        <CardSection id="dividers" style="standard">
          <Heading size="h3">Divider Component</Heading>
          <Paragraph>
            {`
The Divider component is a horizontal line that can be used to separate content. It replaces the <hr> tag and is typically used to split related content. For example, within a section or a group of fields.

The Divider component has several optional props for styling:
`}
          </Paragraph>

          <Space />

          <Heading size="h3" type="secondary">
            color prop:
          </Heading>
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

          <Space ySize="medium" />

          <Heading size="h3" type="secondary">
            Size prop:
          </Heading>
          <Heading size="h4">Example: standard</Heading>
          <Divider size="standard" />
          <Heading size="h4">Example: medium</Heading>
          <Divider size="medium" />
          <Heading size="h4">Example: large</Heading>
          <Divider size="large" />
          <Heading size="h4">Example: xlarge</Heading>
          <Divider size="xl" />

          <Space ySize="medium" />

          <Heading size="h3" type="secondary">
            Padding Prop:
          </Heading>
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

          <Space ySize="medium" />

          <Heading size="h3" type="secondary">
            className: Prop:
          </Heading>
          <Heading size="h4">Example: className (custom css)</Heading>
          <Divider className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
        </CardSection>

        <CardSection id="blank-space" style="standard">
          <Heading size="h3">Blank Space Component</Heading>
          <Paragraph>
            {`
The Blank Space component is used in place of a <br> tag. It's a blank div that can be used to add vertical and horizontal padding. The Blank Space component has several optional props for styling: ySize, xSize, and className.

ySize and xSize are used to set the height and width of the blank space. The className prop allows flexiblity with custom css. className is intended only for fine tuning spacing, the example below only uses a background color to make it easier to view. 

NOTE: You should set xSize and ySize to override when using the className prop to avoid unexpected results with conflicting css padding.
`}
          </Paragraph>

          <Space />

          <Heading size="h3" type="secondary">
            xSize ySize Props:
          </Heading>
          <Heading size="h4">Example: xsmall</Heading>
          <Space ySize="xsmall" xSize="medium" className="bg-sky-100" />
          <Heading size="h4">Example: small</Heading>
          <Space ySize="small" xSize="medium" className="bg-sky-100" />
          <Heading size="h4">Example: standard</Heading>
          <Space ySize="standard" xSize="standard" className="bg-sky-100" />
          <Heading size="h4">Example: medium</Heading>
          <Space ySize="medium" xSize="medium" className="bg-sky-100" />
          <Heading size="h4">Example: large</Heading>
          <Space ySize="large" xSize="medium" className="bg-sky-100" />
          <Heading size="h4">Example: xlarge</Heading>
          <Space ySize="xlarge" xSize="medium" className="bg-sky-100" />
          <Heading size="h4">Example: xxlarge</Heading>
          <Space ySize="xxlarge" xSize="medium" className="bg-sky-100" />
          <Heading size="h4">Example: none</Heading>
          <Space ySize="none" xSize="medium" className="bg-sky-100" />

          <Space />
          <Heading size="h3" type="secondary">
            xSize/ySize override + className prop:
          </Heading>
          <Heading size="h4">Example: override (custom css)</Heading>
          <Space
            ySize="override"
            xSize="override"
            className="bg-sky-100 py-3"
          />
        </CardSection>
      </LayoutContainerSide>
    </>
  )
}
export default DividersArticle
