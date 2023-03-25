import LayoutContainerSide from '@designSystem/layouts/LayoutContainerSide'
import Breadcrumbs from '@designSystem/layouts/Breadcrumbs'
import Heading from '@designSystem/layouts/Heading'
import Paragraph from '@designSystem/layouts/Paragraph'
import { FC } from 'react'
import Section from '@designSystem/layouts/Section'
import WrapperSelect from '@forms/WrapperSelect'
import Divider from '@designSystem/layouts/Divider'
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
      <Heading size="h1">Select from a list</Heading>
      <Paragraph> {`On this page you'll find Select components." size="standard" type="primary`} </Paragraph>

      <Section id="header" style="standard">
        <Heading size="h3">Select</Heading>
          <Paragraph>
{` Uses Radix's Select primitive and is controlled via react-hook-form. Have two variations: flat and grouped. The label and tip props are optional. Leave out or pass null to hide them.`}
          </Paragraph>
          
          <Divider padding="xl" />

          <Heading size="h4">Example: No Label/Tip</Heading>
          <WrapperSelect 
              name="nolabelselect" 
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
          <Heading size="h4">Example: Flat List Select</Heading>
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
          <Heading size="h4">Exmaple: Grouped List Select</Heading>
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
