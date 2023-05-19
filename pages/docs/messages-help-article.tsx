import LayoutContainerSide from "@designSystem/layouts/LayoutContainerSide"
import Breadcrumbs from "@designSystem/molecules/Breadcrumbs"
import Heading from "@designSystem/atoms/Heading"
import Paragraph from "@designSystem/atoms/Paragraph"
import { FC } from "react"
import SectionCard from "@designSystem/molecules/SectionCard"
import Input from "designSystem/atoms/Input"
import Divider from "@designSystem/atoms/Divider"
import Accordion from "designSystem/atoms/Accordion"
import BlankSpace from "@designSystem/atoms/BlankSpace"

// data for Breadcrumbs
const crumbs = [
  {
    text: "Home",
    path: "/",
  },
  {
    text: "Messages (Help)",
    path: "/",
  },
]

const MessagesHelpArticle: FC = () => {
  return (
    <>
      <LayoutContainerSide>
        <Breadcrumbs crumbs={crumbs} />
        <Heading size="h1">Messages</Heading>
        <Paragraph>
          On this page you&apos;ll find help message components
        </Paragraph>

        <SectionCard id="tipMessage" style="standard">
          <Heading size="h3">Tip Messages</Heading>
          <Paragraph>
            There are two prop variations of the Tip component: tip and example.
            The tip prop is for proactive help and context for a specific field.
            It should appear below the input&apos;s label. The example prop is
            for providing context for a specific field. It should appear below
            the field.
          </Paragraph>
          <Divider padding="xl" />

          <Heading size="h4">Example: Tip Message</Heading>

          <Divider padding="xl" />

          <Heading size="h4">Example: Example Message</Heading>
        </SectionCard>

        <SectionCard id="accordionMessage" style="standard">
          <Heading size="h3">Accordion Messages</Heading>
          <Paragraph>
            Typically used for longer messages. Gives a way to present
            information without overwhelming the user. It&apos;s built using{" "}
            <a
              href="https://www.radix-ui.com/docs/primitives/components/accordion"
              target="blank"
            >
              Radix UI&apos;s Accordion
            </a>{" "}
            primitive for accessibility.
          </Paragraph>
          <BlankSpace />
          <Paragraph>
            The Accordion component has 2 required props: type and items. It
            also has 4 optional props: defaultValue, collapsible, rootStyle, and
            accordionStyle.
          </Paragraph>

          <Divider padding="xl" />
          <Heading size="h4">Type Prop (Required)</Heading>
          <Heading size="h5" type="secondary">
            type=&quot;single&quot;
          </Heading>
          <Paragraph>Only one item can open at a time.</Paragraph>
          <Accordion
            type="multiple"
            items={[
              {
                value: "item-1",
                headerText: "Item 1",
                contentText: "This is some content.",
              },
              {
                value: "item-2",
                headerText: "Item 2",
                contentText: "This is some more content.",
              },
            ]}
          />
          <BlankSpace />
          <Heading size="h5" type="secondary">
            type=&quot;multiple&quot;
          </Heading>
          <Paragraph>Multiple items can be open at the same time.</Paragraph>
          <Accordion
            type="multiple"
            items={[
              {
                value: "item-1",
                headerText: "Item 1",
                contentText: "This is some content.",
              },
              {
                value: "item-2",
                headerText: "Item 2",
                contentText: "This is some more content.",
              },
            ]}
          />

          <Divider padding="xl" />
          <Heading size="h4">Item Prop (Required)</Heading>
          <Heading size="h5" type="secondary">
            item=[&#123;&quot;value: string, headerText: string, contentText:
            string&quot;&#125;]
          </Heading>
          <Paragraph>
            An array of objects. Each object creates an Accordion.
          </Paragraph>
          <Accordion
            type="single"
            items={[
              {
                value: "item-1",
                headerText: "Item 1",
                contentText: "This is some content.",
              },
            ]}
          />
          <BlankSpace />

          <Divider padding="xl" />
          <Heading size="h4">DefaultValue Prop (Optional)</Heading>
          <Heading size="h5" type="secondary">
            defaultValue&quot;itemValue&quot;
          </Heading>
          <Paragraph>
            Opens an Accordion by default. Use the value from the items object.
            Can only have one defaultValue per Accordion group.
          </Paragraph>
          <Accordion
            type="single"
            defaultValue={"item-1"}
            items={[
              {
                value: "item-1",
                headerText: "Item 1",
                contentText: "This is some content.",
              },
              {
                value: "item-2",
                headerText: "Item 2",
                contentText: "This is some more content.",
              },
            ]}
          />
          <BlankSpace />

          <Divider padding="xl" />
          <Heading size="h4">Collapsible Prop (Optional)</Heading>
          <Heading size="h5" type="secondary">
            collapsible=&quot;true&quot;
          </Heading>
          <Paragraph>
            Accordion will collapse when clicking the open Accordion&apos;s
            header. Note that this behavior requires the type prop to be set to
            &quot;single&quot;.
          </Paragraph>
          <Accordion
            type="single"
            collapsible={true}
            items={[
              {
                value: "item-1",
                headerText: "Item 1",
                contentText: "This is some content.",
              },
              {
                value: "item-2",
                headerText: "Item 2",
                contentText: "This is some more content.",
              },
            ]}
          />
          <BlankSpace />
          <Heading size="h5" type="secondary">
            collapsible=&quot;false&quot;
          </Heading>
          <Paragraph>
            Accordion won&apos;t collapse when clicking the open
            Accordion&apos;s header.
          </Paragraph>
          <Accordion
            type="single"
            collapsible={false}
            items={[
              {
                value: "item-1",
                headerText: "Item 1",
                contentText: "This is some content.",
              },
              {
                value: "item-2",
                headerText: "Item 2",
                contentText: "This is some more content.",
              },
            ]}
          />

          <Divider padding="xl" />
          <Heading size="h4">RootStyle Prop (Optional)</Heading>
          <Heading size="h5" type="secondary">
            rootStyle=&quot;standard&quot;
          </Heading>
          <Paragraph> Accordion doesn&apos;t change size.</Paragraph>
          <Accordion
            type="single"
            rootStyle="standard"
            items={[
              {
                value: "item-1",
                headerText: "Item 1",
                contentText: "This is some content.",
              },
            ]}
          />
          <BlankSpace />
          <Heading size="h5" type="secondary">
            rootStyle=&quot;shrink&quot;
          </Heading>
          <Paragraph> Accordion will shrink/expand.</Paragraph>
          <Accordion
            type="single"
            rootStyle="shrink"
            items={[
              {
                value: "item-1",
                headerText: "Item 1",
                contentText: "This is some content.",
              },
            ]}
          />
          <BlankSpace />

          <Divider padding="xl" />
          <Heading size="h4">AccordionStyle Prop (Optional)</Heading>
          <Heading size="h5" type="secondary">
            accordionStyle=&quot;standard&quot;
          </Heading>
          <Paragraph>
            Standard styling. Used for anything that isn&apos;t a special
            situation.
          </Paragraph>
          <Accordion
            type="single"
            accordionStyle="standard"
            items={[
              {
                value: "item-1",
                headerText: "This is a standard Accordion",
                contentText: "This is some content.",
              },
            ]}
          />
          <BlankSpace />
          <Heading size="h5" type="secondary">
            accordionStyle=&quot;warning&quot;
          </Heading>
          <Paragraph>
            Used for warning the user. Try to reserve for urgent information.
          </Paragraph>
          <Accordion
            type="single"
            accordionStyle="warning"
            items={[
              {
                value: "item-1",
                headerText: "This is a warning Accordion",
                contentText: "This is some content.",
              },
            ]}
          />
          <BlankSpace />
          <Heading size="h5" type="secondary">
            accordionStyle=&quot;tip&quot;
          </Heading>
          <Paragraph>
            Used to provide useful tips that the user should be aware of. Try to
            reserve for urgent information.
          </Paragraph>
          <Accordion
            type="single"
            accordionStyle="tip"
            items={[
              {
                value: "item-1",
                headerText: "This is a tip Accordion",
                contentText: "This is some content.",
              },
            ]}
          />
          <BlankSpace />
        </SectionCard>
      </LayoutContainerSide>
    </>
  )
}
export default MessagesHelpArticle
