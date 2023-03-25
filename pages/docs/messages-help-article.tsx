import LayoutContainerSide from '@designSystem/layouts/LayoutContainerSide'
import Breadcrumbs from '@designSystem/layouts/Breadcrumbs'
import Heading from '@designSystem/layouts/Heading'
import Paragraph from '@designSystem/layouts/Paragraph'
import { FC } from 'react'
import Section from '@designSystem/layouts/Section'
import Input from 'designSystem/atoms/Input'
import Divider from '@designSystem/layouts/Divider'
import Accordion from 'designSystem/atoms/Accordion'
import BlankSpace from '@designSystem/layouts/BlankSpace'

// data for Breadcrumbs
const crumbs = [
  {
    text: "Home", 
    path: "/",
    currentPg: false,
  }, {
    text: "Messages (Help)", 
    path: "/",
    currentPg: true,
  }
]

const MessagesHelpArticle: FC = () => {

  return (
  <>
    <LayoutContainerSide>
      <Breadcrumbs crumbs={crumbs} />
      <Heading size="h1">Messages</Heading>
      <Paragraph>On this page you'll find help message components</Paragraph>

      <Section id="tipMessage" style="standard">
        <Heading size="h3">Tip Messages</Heading>
          <Paragraph> 
            There are two prop variations of the Tip component: tip and example. 
            The tip prop is for proactive help and context for a specific field. It should appear below the input's label.
            The example prop is for providing context for a specific field. It should appear below the field.
          </Paragraph>
          <Divider padding="xl" />

          <Heading size="h4">Example: Tip Message</Heading>
          <Input name="tipMessage" label="This is a label:" tipText="This is a tip messsage." />
          
          <Divider padding="xl" />
          
          <Heading size="h4">Example: Example Message</Heading>
          <Input name="exampleMessage" label="This is a label:" exampleText="This is an example messsage." />

      </Section>

      <Section id="accordionMessage" style="standard">
        <Heading size="h3">Accordion Messages</Heading>
        <Paragraph>
          Typically used for longer messages. Gives a way to present information without overwhelming the user. 
          It's built using <a href="https://www.radix-ui.com/docs/primitives/components/accordion" target="blank">Radix UI's Accordion</a> primitive for accessibility.
        </Paragraph>
        <BlankSpace />
        <Paragraph>
          The Accordion component has 2 required props: type and items.
          It also has 4 optional props: defaultValue, collapsible, rootStyle, and accordionStyle.
        </Paragraph>
        
        <Divider padding="xl" />
        <Heading size="h4">Type Prop (Required)</Heading>
        <Heading size="h5" type="secondary">type="single"</Heading>
        <Paragraph>Only one item can open at a time.</Paragraph>
        <Accordion 
          type="multiple" 
          items={[{ 
                value: "item-1", 
                headerText: "Item 1", 
                contentText: "This is some content."
              }, 
              { value: "item-2", 
                headerText: "Item 2", 
                contentText: "This is some more content."
              }]} />
        <BlankSpace />
        <Heading size="h5" type="secondary">type="multiple"</Heading>
        <Paragraph>Multiple items can be open at the same time.</Paragraph>
        <Accordion 
          type="multiple" 
          items={[{ 
                value: "item-1", 
                headerText: "Item 1", 
                contentText: "This is some content."
              }, 
              { value: "item-2", 
                headerText: "Item 2", 
                contentText: "This is some more content."
              }]} 
        />

      <Divider padding="xl" />
      <Heading size="h4">Item Prop (Required)</Heading>
      <Heading size="h5" type="secondary">item=[&#123;"value: string, headerText: string, contentText: string"&#125;]</Heading>
      <Paragraph>An array of objects. Each object creates an Accordion.</Paragraph>
      <Accordion 
        type="single" 
        items={[{ 
              value: "item-1", 
              headerText: "Item 1", 
              contentText: "This is some content."
            }]} />
      <BlankSpace />

      <Divider padding="xl" />
      <Heading size="h4">DefaultValue Prop (Optional)</Heading>
      <Heading size="h5" type="secondary">defaultValue="itemValue"</Heading>
      <Paragraph>
          Opens an Accordion by default. Use the value from the items object. Can only have one defaultValue per Accordion group. 
      </Paragraph>
      <Accordion 
        type="single" 
        defaultValue={"item-1"}
        items={[{ 
          value: "item-1", 
          headerText: "Item 1", 
          contentText: "This is some content."
        }, 
        { value: "item-2", 
          headerText: "Item 2", 
          contentText: "This is some more content."
        }]} 
      />
      <BlankSpace />

      <Divider padding="xl" />
      <Heading size="h4">Collapsible Prop (Optional)</Heading>
      <Heading size="h5" type="secondary">collapsible="true"</Heading>
      <Paragraph>
        Accordion will collapse when clicking the open Accordion's header. 
        Note that this behavior requires the type prop to be set to "single".
      </Paragraph>
      <Accordion 
        type="single" 
        collapsible={true}
        items={[{ 
          value: "item-1", 
          headerText: "Item 1", 
          contentText: "This is some content."
        }, 
        { value: "item-2", 
          headerText: "Item 2", 
          contentText: "This is some more content."
        }]} 
      />
      <BlankSpace />
      <Heading size="h5" type="secondary">collapsible="false"</Heading>
      <Paragraph>
        Accordion won't collapse when clicking the open Accordion's header. 
      </Paragraph>
      <Accordion 
        type="single" 
        collapsible={false}
        items={[{ 
          value: "item-1", 
          headerText: "Item 1", 
          contentText: "This is some content."
        }, 
        { value: "item-2", 
          headerText: "Item 2", 
          contentText: "This is some more content."
        }]} 
      />

      <Divider padding="xl" />
      <Heading size="h4">RootStyle Prop (Optional)</Heading>
      <Heading size="h5" type="secondary">rootStyle="standard"</Heading>
      <Paragraph> Accordion doesn't change size.</Paragraph>
      <Accordion 
        type="single" 
        rootStyle="standard"
        items={[{ 
          value: "item-1", 
          headerText: "Item 1", 
          contentText: "This is some content."
        }]} 
      />
      <BlankSpace />
      <Heading size="h5" type="secondary">rootStyle="shrink"</Heading>
      <Paragraph> Accordion will shrink/expand.</Paragraph>
      <Accordion 
        type="single" 
        rootStyle="shrink"
        items={[{ 
          value: "item-1", 
          headerText: "Item 1", 
          contentText: "This is some content."
        }]} 
      />
      <BlankSpace />

      <Divider padding="xl" />
      <Heading size="h4">AccordionStyle Prop (Optional)</Heading>
      <Heading size="h5" type="secondary">accordionStyle="standard"</Heading>
      <Paragraph>Standard styling. Used for anything that isn't a special situation.</Paragraph>
      <Accordion 
        type="single" 
        accordionStyle="standard"
        items={[{ 
          value: "item-1", 
          headerText: "This is a standard Accordion", 
          contentText: "This is some content."
        }]} 
      />
      <BlankSpace />
      <Heading size="h5" type="secondary">accordionStyle="warning"</Heading>
      <Paragraph>Used for warning the user. Try to reserve for urgent information.</Paragraph>
      <Accordion 
        type="single" 
        accordionStyle="warning"
        items={[{ 
          value: "item-1", 
          headerText: "This is a warning Accordion", 
          contentText: "This is some content."
        }]} 
      />
      <BlankSpace />
      <Heading size="h5" type="secondary">accordionStyle="tip"</Heading>
      <Paragraph>Used to provide useful tips that the user should be aware of. Try to reserve for urgent information.</Paragraph>
      <Accordion 
        type="single" 
        accordionStyle="tip"
        items={[{ 
          value: "item-1", 
          headerText: "This is a tip Accordion", 
          contentText: "This is some content."
        }]} 
      />
      <BlankSpace />

      </Section>

    </LayoutContainerSide>

  </>
  )
}
export default MessagesHelpArticle
