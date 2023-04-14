import LayoutContainerSide from "@designSystem/layouts/LayoutContainerSide"
import Breadcrumbs from "@designSystem/molecules/Breadcrumbs"
import Heading from "@designSystem/atoms/Heading"
import Paragraph from "@designSystem/atoms/Paragraph"
import { FC } from "react"
import SectionCard from "@designSystem/molecules/SectionCard"
import Divider from "@designSystem/atoms/Divider"

// data for Breadcrumbs
const crumbs = [
  {
    text: "Home",
    path: "/",
    currentPg: false,
  },
  {
    text: "UI Cards",
    path: "/",
    currentPg: true,
  },
]

const UIContainersArticle: FC = () => {
  return (
    <>
      <LayoutContainerSide>
        <Breadcrumbs crumbs={crumbs} />
        <Heading size="h1">UI Cards</Heading>
        <Paragraph>On this page you'll find UI container components</Paragraph>

        <SectionCard id="intro" style="standard">
          <Heading size="h3">SectionCard Container</Heading>
          <Paragraph>
            {`Each section should be in its own UI container. Containers are used to group related content like input fields.

There's four props available: Standard, Blank, and Color. Standard is the default style. Blank has a transparent background. Color has a background color.
`}
          </Paragraph>
        </SectionCard>

        <Divider padding="large" />

        <SectionCard id="example-standard" style="standard">
          <Heading size="h3">Example: Standard SectionCard Container"</Heading>
          <Paragraph>
            This is an example of a standard section container. It has a white
            background.
          </Paragraph>
        </SectionCard>

        <SectionCard id="example-blank" style="blank">
          <Heading size="h3">Example: Blank SectionCard Container</Heading>
          <Paragraph>
            This is an example of a blank section container. It has a no
            background.
          </Paragraph>
        </SectionCard>

        <SectionCard id="example-color" style="colorRed">
          <Heading size="h3">Example: Color SectionCard Container</Heading>
          <Paragraph>
            This is an example of a styled section container. It has a colored
            background.
          </Paragraph>
        </SectionCard>

        <SectionCard id="example-color" style="colorBlue">
          <Heading size="h3">Example: Color SectionCard Container</Heading>
          <Paragraph>
            This is an example of a styled section container. It has a colored
            background.
          </Paragraph>
        </SectionCard>

        <SectionCard id="example-color" style="colorGreen">
          <Heading size="h3">Example: Color SectionCard Container</Heading>
          <Paragraph>
            This is an example of a styled section container. It has a colored
            background.
          </Paragraph>
        </SectionCard>

        <SectionCard id="example-color" style="colorYellow">
          <Heading size="h3">Example: Color SectionCard Container</Heading>
          <Paragraph>
            This is an example of a styled section container. It has a colored
            background.
          </Paragraph>
        </SectionCard>

        <SectionCard id="example-color" style="colorPink">
          <Heading size="h3">Example: Color SectionCard Container</Heading>
          <Paragraph>
            This is an example of a styled section container. It has a colored
            background.
          </Paragraph>
        </SectionCard>

        <SectionCard id="example-color" style="colorPurple">
          <Heading size="h3">Example: Color SectionCard Container</Heading>
          <Paragraph>
            This is an example of a styled section container. It has a colored
            background.
          </Paragraph>
        </SectionCard>

        <SectionCard id="example-color" style="colorBlack">
          <Heading size="h3">Example: Color SectionCard Container</Heading>
          <Paragraph>
            This is an example of a styled section container. It has a colored
            background.
          </Paragraph>
        </SectionCard>
      </LayoutContainerSide>
    </>
  )
}
export default UIContainersArticle
