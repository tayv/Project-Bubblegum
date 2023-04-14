import LayoutContainerSide from "@designSystem/layouts/LayoutContainerSide"
import Breadcrumbs from "@designSystem/molecules/Breadcrumbs"
import Heading from "@designSystem/atoms/Heading"
import Paragraph from "@designSystem/atoms/Paragraph"
import SectionCard from "@designSystem/molecules/SectionCard"

// data for Breadcrumbs
const crumbs = [
  {
    text: "Home",
    path: "/",
    currentPg: false,
  },
  {
    text: "Test Document Builder",
    path: "/",
    currentPg: true,
  },
]

const DocumentBuilder = () => (
  <>
    <LayoutContainerSide>
      <Breadcrumbs crumbs={crumbs} />
      <Heading size="h1">Test Document Builder</Heading>
      <Paragraph>
        This page will show an MDX document builder using saved answers from the
        test form.
      </Paragraph>
      <SectionCard id="test-doc-builder" style="standard">
        <Paragraph>🚧 Under Construction</Paragraph>
      </SectionCard>
    </LayoutContainerSide>
  </>
)

export default DocumentBuilder
