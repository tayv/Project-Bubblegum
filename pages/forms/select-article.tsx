import LayoutContainerSide from '@components/layout/LayoutContainerSide'
import Breadcrumbs from '@components/layout/Breadcrumbs'
import Heading from '@components/layout/Heading'
import Paragraph from '@components/layout/Paragraph'
import { FC } from 'react'
import Section from '@components/layout/Section'
import WrapperSelect from '@components/controlled-wrappers/WrapperSelect'
import Divider from '@components/layout/Divider'
import { useForm } from 'react-hook-form'


// data for Breadcrumbs
const crumbs = [
  {
    text: "Home", 
    path: "/",
    currentPg: false,
  }, {
    text: "Select", 
    path: "/",
    currentPg: true,
  }
]

const SelectArticle: FC = () => {
  
  const { control } = useForm()

  return (
  <>
    <LayoutContainerSide>
      <Breadcrumbs crumbs={crumbs} />
      <Heading text="Select" size="h1" type="primary"/>
      <Paragraph> {`On this page you'll find Select components." size="standard" type="primary`} </Paragraph>

      <Section id="header" style="standard">
        <Heading text="Select" size="h3" type="primary"/>
          <Paragraph>
{` Uses Radix's Select primitive and is controlled via react-hook-form. Have two variations: flat and grouped. The label and tip props are optional. Leave out or pass null to hide them.`}
          </Paragraph>
          
          <Divider padding="xl" />

          <Heading text="Example: No Label/Tip" size="h4" type="primary"/>
          <WrapperSelect 
              name="flatselect" 
              control={control} 
              label={null}
              tip={null}
              placeholder="Select an option"
              defaultValue="first"
              itemOptions={ [
                    {value:"first", labelText:"firstText", separator: false}, 
                    {value:"second", labelText:"secondText", separator: true},
                    {value:"third", labelText:"thirdText", separator: false}, 
                    {value:"fourth", labelText:"fourthText", separator: true},
              ] }
            />

          <br/>
          <br/>
          <Heading text="Example: Flat List Select" size="h4" type="primary"/>
          <WrapperSelect 
            name="flatselect" 
            control={control} 
            label="This is a label:"
            tip="Tip: This is a flat list Select"
            placeholder="Select an option"
            defaultValue="first"
            itemOptions={ [
                  {value:"first", labelText:"firstText", separator: false}, 
                  {value:"second", labelText:"secondText", separator: true},
                  {value:"third", labelText:"thirdText", separator: false}, 
                  {value:"fourth", labelText:"fourthText", separator: true},
            ] }
          />

          <br/>
          <br/>
          <Heading text="Example: Grouped List Select" size="h4" type="primary"/>
          <WrapperSelect 
            name="groupselect" 
            control={control} 
            label="This is a label:"
            tip="Tip: This is a grouped list Select"
            placeholder="Select an option"
            defaultValue="second"
            itemOptions={ [
                { groupLabel: "Group 1", 
                  items: [
                    {value:"first", labelText:"firstText", separator: false}, 
                    {value:"second", labelText:"secondText", separator: true}
                  ] 
                },
                { groupLabel: "Group 2", 
                  items: [
                    {value:"third", labelText:"thirdText", separator: false}, 
                    {value:"fourth", labelText:"fourthText", separator: true}
                  ] 
                }
              ] }
          />
      </Section>

    </LayoutContainerSide>

  </>
  )
}
export default SelectArticle
