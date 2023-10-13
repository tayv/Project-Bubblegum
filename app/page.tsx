import Heading from "@ui/Heading"
import Paragraph from "@ui/Paragraph"
import Card from "@components/ui/Card"
import ButtonCTA from "@components/form/ButtonCTA"
import LayoutContainer from "@components/ui/LayoutContainer"
import { Armchair, TrafficCone, PocketKnife } from "lucide-react"
import Accordion from "@ui/Accordion"
import Space from "@components/ui/Space"

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
          padding="xStandard"
          margin="none"
          className=""
        >
          <Heading size="h1" weight="bold" padding="standard">
            Welcome to [Name] 👋
          </Heading>
          <Paragraph
            weight="medium"
            color="secondary"
            size="large"
            className="pl-1"
          >
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
            role="featuredProductCard"
          >
            <LayoutContainer
              variant="flex"
              direction="col"
              padding="none"
              margin="none"
              gap="medium"
              className="group/featuredProductCard"
            >
              <div className="group/featuredProductCard flex flex-col items-center py-2">
                <Paragraph weight="medium" size="large">
                  Featured Product Name
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
                  className="mt-4 group-hover/featuredProductCard:bg-cta-900"
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
              className="group"
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
                className=" group-hover:text-cta-900"
              />
            </Card>
            <Card
              id="secondaryProductB"
              linkPath="/product2"
              color="standard"
              width="standard"
              className="group"
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
                className="group-hover:text-cta-900"
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
          padding="xStandard"
          margin="none"
        >
          <Heading size="h2" padding="standard">
            How it works
          </Heading>
          <Paragraph>
            Some info about the company and how it works. Here’s some more
            information about how to create a document or use a product.
          </Paragraph>

          {/* STEPS */}
          <Card id="howStep1" color="none" width="standard" margin="standard">
            <LayoutContainer
              direction="row"
              variant="flex"
              padding="none"
              margin="none"
              gap="standard"
            >
              <div className="flex shrink-0 items-center justify-start w-12 border-r-2 border-cta-500 text-4xl font-bold">
                1
              </div>
              <Paragraph color="secondary">
                <span className="text-slate-900">A short summary.</span>{" "}
                Followed by a brief description of the step here.
              </Paragraph>
            </LayoutContainer>
          </Card>

          <Card id="howStep2" color="none" width="standard" margin="standard">
            <LayoutContainer
              direction="row"
              variant="flex"
              padding="none"
              margin="none"
              gap="standard"
            >
              <div className="flex shrink-0 items-center justify-start w-12 border-r-2 border-cta-500 text-4xl font-bold">
                2
              </div>
              <Paragraph color="secondary">
                <span className="text-slate-900">A short summary.</span>{" "}
                Followed by a brief description of the step here. Followed by a
                brief description of the step here. Followed by a brief
                description of the step here. Followed by a brief description of
                the step here. Followed by a brief description of the step here.
              </Paragraph>
            </LayoutContainer>
          </Card>

          <Card id="howStep3" color="none" width="standard" margin="standard">
            <LayoutContainer
              direction="row"
              variant="flex"
              padding="none"
              margin="none"
              gap="standard"
            >
              <div className="flex shrink-0 items-center justify-start w-12 border-r-2 border-cta-500 text-4xl font-bold">
                3
              </div>
              <Paragraph color="secondary">
                <span className="text-slate-900">A short summary.</span>{" "}
                Followed by a brief description of the step here.
              </Paragraph>
            </LayoutContainer>
          </Card>
        </LayoutContainer>

        {/* FAQs */}
        <LayoutContainer
          tag="section"
          direction="col"
          variant="flex"
          // gap="medium"
          padding="xStandard"
          margin="none"
        >
          <Heading size="h2" padding="standard">
            Got questions?
          </Heading>
          <Paragraph>
            This section is TBD. Will add accordions highlighting common
            questions.
          </Paragraph>

          {/* <Accordion
          type="single"
          items={[
            {
              value: "accordionSingleExample",
              headerText: "This is a single Accordion",
              contentText: "Write your details here.",
            },
          ]}
        /> */}
        </LayoutContainer>

        <Space ySize="xxlarge" />
      </LayoutContainer>
    </>
  )
}
