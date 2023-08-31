import Heading from "@ui/Heading"
import Paragraph from "@ui/Paragraph"
import HelloWorld from "./hello.mdx"
import Card from "@components/ui/Card"
import ButtonCTA from "@components/form/ButtonCTA"
import LayoutContainer from "@components/ui/LayoutContainer"
import { Armchair, TrafficCone, PocketKnife } from "lucide-react"

export default function Home() {
  return (
    <>
      {/* PAGE CONTENT (use gap to distribute sections evenly) */}
      <LayoutContainer
        tag="div"
        direction="col"
        variant="flex"
        gap="large"
        padding="none"
        margin="none"
      >
        {/* HEADING */}
        <LayoutContainer
          variant="flex"
          direction="col"
          padding="none"
          margin="none"
          className=""
        >
          <Heading size="h1" weight="bold" padding="standard">
            Welcome to [Name] 👋
          </Heading>
          <Paragraph weight="medium" color="secondary" size="large">
            Pick a product to get started for free.
            <em> No credit card required.</em>
          </Paragraph>
        </LayoutContainer>

        {/* FEATURED PRODUCT */}
        <LayoutContainer
          tag="section"
          direction="col"
          variant="flex"
          gap="medium"
          padding="none"
          margin="none"
        >
          <Card
            id="featuredProduct"
            color="gradient3"
            width="standard"
            linkPath="/product2"
          >
            <LayoutContainer
              variant="flex"
              direction="col"
              padding="none"
              margin="none"
              gap="medium"
            >
              <div className="flex flex-col items-center py-2">
                <Paragraph weight="medium" size="large">
                  Featured Product
                </Paragraph>
                <Heading color="standard" size="h2" textAlign="center">
                  Catchy product phrase goes here
                </Heading>
                <Paragraph
                  weight="light"
                  size="large"
                  color="secondary"
                  padding="standard"
                >
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
              <div className="flex items-center">
                <Armchair className="w-full max-h-40 h-full" />
              </div>
            </LayoutContainer>
          </Card>

          {/* SECONDARY PRODUCTS */}
          <LayoutContainer
            variant="flex"
            direction="col"
            gap="medium"
            padding="none"
            margin="none"
            className="lg:gap-6 lg:flex-row"
          >
            <Card
              id="secondaryProductA"
              linkPath="/product2"
              color="standard"
              width="standard"
              className=""
            >
              <div className="flex flex-row justify-start w-9 h-9 lg:w-12 lg:h-12 mb-2">
                <TrafficCone className="max-h-40 h-full w-full" />
              </div>
              <Heading size="h3">Secondary Product A</Heading>
              <Paragraph color="secondary">
                A short description of the product goes here.
              </Paragraph>
              <ButtonCTA
                variant="text"
                size="standardText"
                type="button"
                buttonText="Create Product"
                icon="arrowRight"
                className=""
              />
            </Card>
            <Card
              id="secondaryProductB"
              linkPath="/product2"
              color="standard"
              width="standard"
              className=""
            >
              <div className="flex flex-row justify-start w-9 h-9 lg:w-12 lg:h-12 mb-2">
                <PocketKnife className="max-h-40 h-full w-full" />
              </div>
              <Heading size="h3">Secondary Product B</Heading>
              <Paragraph color="secondary">
                A short description of the product goes here.
              </Paragraph>
              <ButtonCTA
                variant="text"
                size="standardText"
                type="button"
                buttonText="Create Product"
                icon="arrowRight"
                className=""
              />
            </Card>
          </LayoutContainer>
        </LayoutContainer>

        {/* HOW IT WORKS */}
        <LayoutContainer
          tag="section"
          direction="col"
          variant="flex"
          // gap="medium"
          padding="none"
          margin="none"
        >
          <Heading size="h2" padding="standard">
            How it works
          </Heading>
          <Paragraph>
            Some info about the company and how it works. Here’s some more
            information about how to create a document or use a product.
          </Paragraph>
        </LayoutContainer>
      </LayoutContainer>
    </>
  )
}
