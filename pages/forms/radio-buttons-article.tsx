import LayoutContainerSide from '@components/layout/LayoutContainerSide'
import Breadcrumbs from '@components/layout/Breadcrumbs'
import Heading from '@components/layout/Heading'
import Paragraph from '@components/layout/Paragraph'
import { FC } from 'react'
import Section from '@components/layout/Section'
import WrapperRadioGroup from '@components/controlled-wrappers/WrapperRadioGroup'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import Divider from '@components/layout/Divider'

// data for Breadcrumbs
const crumbs = [
  {
    text: "Home", 
    path: "/",
    currentPg: false,
  }, {
    text: "Radion Buttons", 
    path: "/",
    currentPg: true,
  }
]

const RadioButtonsArticle: FC = () => {

  const { control, reset } = useForm() // needed to remove the RHF prop type error

  // set up form default values
  const defaultValues = {
    // Radio Input Section
    standardRadioGroup: "mint",
    horizontalRadioGroup: "no",
    buttonRadioGroup: "orange-button",
  }

  useEffect(() => {
    reset({ ...defaultValues }) 
  }, [])

  return (
  <>
    <LayoutContainerSide>
      <Breadcrumbs crumbs={crumbs} />
      <Heading size="h1">Radio Buttons</Heading>
      <Paragraph>
        {`On this page you'll find radio button components`}
      </Paragraph>

      <Section id="header" style="standard">
        <Heading size="h3">Radio Button Group</Heading>
          <Paragraph>
{`The Radio Button Group component is a wrapper for the atomic RadioButton component. It's build using Radix UI's Radio Group primitive and there are three styles to choose from: Standard, Horizontal, and Button style.

You can set the default value for the radios by saving the values to a variable then passing it to react hook form's reset() inside a useEffect hook.
`}
          </Paragraph>
          
          <Divider padding="xl" />

          <WrapperRadioGroup
            name="standardRadioGroup"
            groupLabel="Example: Standard Radio Group"
            tipText="Tip: These are standard radio buttons"
            control={control}
            style="standard"
            options={ [
              {value: "orange", label: "Orange ice cream"}, 
              {value: "mint", label: "Mint ice cream"}, 
              {value: "chocolate", label: "Chocolate ice cream"}, 
              {value: "vanilla", label: "Vanilla ice cream"}] }
          />
          
          <Divider padding="xl" />

          <WrapperRadioGroup
            name="horizontalRadioGroup"
            groupLabel="Example: Horizontal Radio Group"
            tipText="Tip: These radios are styled horizontally. Typically used for yes/no questions."
            control={control}
            style="horizontal"
            options={ [
                {value: "yes", label: "Yes"}, 
                {value: "no", label: "No"}, 
              ] }
          />
          
          <Divider padding="xl" />
          
          <WrapperRadioGroup
            name="buttonRadioGroup"
            groupLabel="Example: Button Radio Group"
            tipText="Tip: These radios are styled as buttons"
            control={control}
            style="button"
            options={ [
              {value: "orange-button", label: "Orange ice cream"}, 
              {value: "mint-button", label: "Mint ice cream"}, 
              {value: "chocolate-button", label: "Chocolate ice cream"}, 
              {value: "vanilla-button", label: "Vanilla ice cream"}] }
          />
      </Section>

    </LayoutContainerSide>

  </>
  )
}
export default RadioButtonsArticle
