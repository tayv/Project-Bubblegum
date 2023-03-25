import LayoutContainerSide from 'designSystem/layout/LayoutContainerSide'
import Breadcrumbs from 'designSystem/layout/Breadcrumbs'
import Heading from 'designSystem/layout/Heading'
import Paragraph from 'designSystem/layout/Paragraph'
import Section from "designSystem/layout/Section"

// data for Breadcrumbs
const crumbs = [
  {
    text: "Home", 
    path: "/",
    currentPg: false,
  }, {
    text: "Test Document Builder", 
    path: "/",
    currentPg: true,
  }
]

const DocumentBuilder = () => (
  <>
    <LayoutContainerSide>
      <Breadcrumbs crumbs={crumbs} />
      <Heading size="h1">Test Document Builder</Heading>
      <Paragraph>This page will show an MDX document builder using saved answers from the test form.</Paragraph>
      <Section id="test-doc-builder" style="standard">
        <Paragraph>🚧 Under Construction</Paragraph>
      </Section>
    </LayoutContainerSide>

  </>
  
  )

export default DocumentBuilder