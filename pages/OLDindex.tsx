import LayoutContainerSide from "@designSystem/layouts/LayoutContainerSide"
import Breadcrumbs from "@designSystem/molecules/Breadcrumbs"
import Heading from "@designSystem/atoms/Heading"
import Paragraph from "@designSystem/atoms/Paragraph"
import CardSection from "@designSystem/molecules/CardSection"
import Space from "@designSystem/atoms/Space"

export default function Home() {
  return (
    <>
      <LayoutContainerSide>
        <Space />
        <Heading size="h1">🏠 Project Bubblegum</Heading>
        <Paragraph>Bite-size react form components</Paragraph>
        <Space />
        <CardSection id="intro" style="standard">
          <Heading size="h3">Technologies</Heading>
          <Paragraph>
            Built using Next.js, React, TypeScript, Tailwind CSS, Radix UI
            Primitives, and react-hook-form.
          </Paragraph>
        </CardSection>

        <CardSection id="Navigate" style="standard">
          <Heading size="h3">How to view</Heading>
          <Paragraph>
            The side navigation to the left shows a list of reusable react
            components. Most of the components are form inputs but there&apos;s
            also some to help with UI layout.
          </Paragraph>
        </CardSection>
        <CardSection id="techstack" style="standard">
          <Heading size="h3">How components are built</Heading>
          <Paragraph>
            {` Form components consist of a stateless atomic component (e.g. 'Input.tsx') with a wrapper component that handles state (e.g. 'WrapperInput.tsx). 

Project Bubblegum uses react-hook-form to handle form state, Radix UI Primitives for accessible atomic components (not all components have been swapped yet), and tailwind css utility classes.
`}
          </Paragraph>
        </CardSection>
      </LayoutContainerSide>
    </>
  )
}