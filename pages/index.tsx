import LayoutContainerSide from '@components/layout/LayoutContainerSide'
import Breadcrumbs from '@components/layout/Breadcrumbs'
import Heading from '@components/layout/Heading'
import Paragraph from '@components/layout/Paragraph'
import Section from '@components/layout/Section'
import BlankSpace from '@components/layout/BlankSpace'

export default function Home() {
  return (
    <>
      <LayoutContainerSide>
        <BlankSpace />
        <Heading text="🏠 Project Bubblegum" size="h1" type="primary"/>
        <Paragraph>Bite-size react form components</Paragraph>
        <BlankSpace />
        <Section id="intro" style="standard">
          <Heading text="Technologies" size="h3" type="primary"/>
            <Paragraph>Built using Next.js, React, TypeScript, Tailwind CSS, Radix UI Primitives, and react-hook-form.</Paragraph>
        </Section>

        <Section id="Navigate" style="standard">
          <Heading text="How to view" size="h3" type="primary"/>
          <Paragraph>The side navigation to the left shows a list of reusable react components. Most of the components are form inputs but there's also some to help with UI layout.</Paragraph>
          
        </Section>
        <Section id="techstack" style="standard">
          <Heading text="How components are built" size="h3" type="primary"/>
          <Paragraph>
{` Form components consist of a stateless atomic component (e.g. 'Input.tsx') with a wrapper component that handles state (e.g. 'WrapperInput.tsx). 

Project Bubblegum uses react-hook-form to handle form state, Radix UI Primitives for accessible atomic components (not all components have been swapped yet), and tailwind css utility classes.
`}
            </Paragraph>
        </Section>
       
      </LayoutContainerSide>
    </>
  )
}
