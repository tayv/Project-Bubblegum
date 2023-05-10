import LayoutContainerSide from "@designSystem/layouts/LayoutContainerSide"
import Breadcrumbs from "@designSystem/molecules/Breadcrumbs"
import Heading from "@designSystem/atoms/Heading"
import Paragraph from "@designSystem/atoms/Paragraph"
import { FC } from "react"
import SectionCard from "@designSystem/molecules/SectionCard"
import InputGroupLabel from "@designSystem/atoms/InputGroupLabel"
import Divider from "@designSystem/atoms/Divider"

// data for Breadcrumbs
const crumbs = [
  {
    text: "Home",
    path: "/",
  },
  {
    text: "Label",
    path: "/",
  },
]

const LabelArticle: FC = () => {
  return (
    <>
      <LayoutContainerSide>
        <Breadcrumbs crumbs={crumbs} />
        <Heading size="h1">Labels</Heading>
        <Paragraph>On this page you&apos;ll find label components</Paragraph>

        <SectionCard id="header" style="standard">
          <Heading size="h3">Input Label</Heading>
          <Paragraph>
            {`
The label component should be used with every input component (or input group). It's build using Radix UI's label primitive. The intent is to have each input component have the label component built in so you just need to pass a label prop.

The label component supports two styles: 'standard' and 'inline'. The inline style is used in the Checkbox component.
`}
          </Paragraph>
          <Divider padding="xl" />

          <Heading size="h4">Example: Standard Label</Heading>
          <InputGroupLabel
            type="standard"
            htmlFor=""
          >This is an example label</InputGroupLabel>
        </SectionCard>
      </LayoutContainerSide>
    </>
  )
}
export default LabelArticle
