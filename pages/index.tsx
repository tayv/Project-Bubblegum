import LayoutContainerSide from '@components/layout/LayoutContainerSide'
import Breadcrumbs from '@components/layout/Breadcrumbs'
import Heading from '@components/layout/Heading'
import Paragraph from '@components/layout/Paragraph'

export default function Home() {
  return (
    <>
      <LayoutContainerSide>
        <br />
        <Heading text="🏠 Home" size="h1" type="primary"/>
        <Paragraph text="Project Bubblegum is a work in progress. The documentation is mostly incomplete." size="standard" type="primary" />
        <br />
        <hr />
        <br />
        <Paragraph text="The side navigation to the left shows a list of reusable react components. Most of the components are form inputs but there's also some to help with UI layout. " size="standard" type="primary" />
        <br />
        <Paragraph text="Form components consist of a stateless atomic component (e.g. 'Input.tsx') with a wrapper component that handles state (e.g. 'WrapperInput.tsx). Project Bubblegum uses react-hook-form to handle form state, Radix UI Primitives for accessible atomic components (not all components have been swapped yet), and tailwind css utility classes." size="standard" type="primary" />
      </LayoutContainerSide>
    </>
  )
}
