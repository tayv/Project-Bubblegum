import Heading from "@ui/Heading"
import Paragraph from "@ui/Paragraph"
import HelloWorld from "./hello.mdx"
import CardSection from "@components/ui/Card"
import ButtonCTA from "@components/form/ButtonCTA"
import LayoutContainer from "@components/ui/LayoutContainer"
import { Armchair } from "lucide-react"

export default function Home() {
  return (
    <>
      <Heading size="h1" weight="bold" padding="standard">
        Welcome to [Name] 👋
      </Heading>
      <Paragraph>
        Pick a product to get started for free.
        <em> No credit card required.</em>
      </Paragraph>

      <CardSection
        id="featuredProduct"
        color="gradient3"
        width="standard"
        className="mb-0 lg:mb-2"
        // corners="none"
      >
        <LayoutContainer
          variant="flex"
          direction="col"
          padding="none"
          margin="none"
        >
          <div className="flex flex-col items-center py-2">
            <Paragraph weight="medium" size="large">
              Featured Product
            </Paragraph>
            <Heading color="standard" size="h2" textAlign="center">
              Catchy product phrase goes here
            </Heading>
            <Paragraph weight="light" size="large" color="secondary">
              Helpful context
            </Paragraph>
            <ButtonCTA
              size="standardButton"
              type="button"
              buttonText="Create Product"
              icon="none"
              className="mt-4"
            />
          </div>
          <div className="flex grow items-center">
            <Armchair className="max-h-56 w-full h-full " />
          </div>
        </LayoutContainer>
      </CardSection>

      <LayoutContainer
        variant="flex"
        direction="row"
        gap="standard"
        padding="none"
        margin="none"
        className="lg:gap-6"
      >
        <CardSection
          id="secondaryProductA"
          color="white"
          width="standard"
          className="mb-8"
          //  corners="none"
        >
          <Heading size="h3">Secondary Product A</Heading>
          <Paragraph>A short description of the product goes here.</Paragraph>
          <ButtonCTA
            variant="text"
            size="standardText"
            type="button"
            buttonText="Create Product"
            icon="arrowRight"
            className=""
          />
        </CardSection>
        <CardSection
          id="secondaryProductB"
          color="white"
          width="standard"
          className="mb-8"
          // corners="none"
        >
          <Heading size="h3">Secondary Product B</Heading>
          <Paragraph>A short description of the product goes here.</Paragraph>
          <ButtonCTA
            variant="text"
            size="standardText"
            type="button"
            buttonText="Create Product"
            icon="arrowRight"
            className=""
          />
        </CardSection>
      </LayoutContainer>

      <Heading size="h2" padding="standard">
        How it works
      </Heading>
      <Paragraph>
        Some info about the company and how it works. Here’s some more
        information about how to create a document or use a product.
      </Paragraph>
    </>
  )
}
