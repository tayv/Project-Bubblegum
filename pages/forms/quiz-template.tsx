import LayoutContainerSide from '@components/layout/LayoutContainerSide'
import Breadcrumbs from '@components/layout/Breadcrumbs'
import Heading from '@components/layout/Heading'
import Paragraph from '@components/layout/Paragraph'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import WrapperInput from '@components/controlled-wrappers/WrapperInput'
import HelpMessage from '@components/helpers/HelpMessage'
import WrapperRadioGroup from '@components/controlled-wrappers/WrapperRadioGroup'
import Section from '@components/layout/Section'
import Checkbox from '@components/atoms/checkbox'
import WrapperCheckbox from '@components/controlled-wrappers/WrapperCheckbox'
import WrapperCheckboxGroup from '@components/controlled-wrappers/WrapperCheckboxGroup'

// data for Breadcrumbs
const crumbs = [
  {
    text: "Home", 
    path: "/",
    currentPg: false,
  }, {
    text: "Quiz Template", 
    path: "/",
    currentPg: true,
  }
]

const QuizTemplate: FC = () => {

  // React hook form
  const { handleSubmit, control, getValues, formState: { errors }} = useForm()

  // Sample onSubmit form handler
    // NOTES: Don't need to  e.preventDefault() since rhf's handleSubmit() automatically prevents page reloads 
    // and handles errors for you https://www.react-hook-form.com/api/useform/handlesubmit/
  const onSubmit = handleSubmit( async (data, event) => {
    console.log("Form submitted. data:", data, "Submit form - errors", Error)
    console.log("event:", event)
      const body = data
      try {
        const response = await fetch("/api/inquiry", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(body),
      })
      if (response.status !== 200){
        console.log("something went wrong oops")
        //set an error banner here
      } else {
       // resetForm();
        console.log("form submitted successfully !!!")
        //set a success banner here
      }
      //check response, if success is false, dont take them to success page
      } catch (error) {
        console.log("there was an error submitting", error)
      }
    
  })

  const messageSchema = {
    m1: {
      type: "warn",
      message: "This is the first message",
      regex: /(c)/g
    },
    m2: {
      type: "info",
      message: "This is the second message",
      regex: /(b)/g
    }
  }

  return (
  <>
    <LayoutContainerSide>
      <Breadcrumbs crumbs={crumbs} />
      <Heading text="Quiz Template" size="h1" type="primary"/>
      <Paragraph text="This is a template to test form layout and start building out state and database behavior." size="standard" type="primary" />
      <br />
      <hr />
      
      <form className="border border-gray-900" onSubmit={ onSubmit }>
        <Section id="intro" style="blank">
         <Heading text="Test Form 1" size="h2" type="primary"/>
          <Paragraph text="This form is used to show default styling for text, radio button, checkbox, and multi-line input components. Also used to test Controlled inputs" size="standard" type="primary" />
        </Section>
        <Section id="text-input" style="standard">
          <Heading text="Section Title: Single Line Input" size="h3" type="primary"/>
          <WrapperInput
            name="singleInput"
            label="This is a label"
            type="text"
            tipText="Tip: This is a single line input"
            exampleText="e.g. Example goes here."
            control={control}
            rules={{ required: "You must enter something" }}
            defaultValue=" " 
          >
            <HelpMessage 
              inputName="firstName" 
              messageType="warn" 
              control={control} 
              checkFor="a" 
              message="This is the help message" 
              customRegEx={null} 
            />
          </WrapperInput>
        </Section>
 
        <Section id="radio-input" style="standard">
          <Heading text="Section Title: Radio Groups" size="h3" type="primary"/>
          <WrapperRadioGroup
            name="standardRadio"
            groupLabel="This is a radio group label"
            tipText="Tip: These are standard radio buttons"
            control={control}
            style="standard"
            defaultValue="orange"
            options={ [
              {value: "orange", label: "Orange ice cream"}, 
              {value: "mint", label: "Mint ice cream"}, 
              {value: "chocolate", label: "Chocolate ice cream"}, 
              {value: "vanilla", label: "Vanilla ice cream"}] }
          />
          <br />
          <WrapperRadioGroup
            name="horizontalRadio"
            groupLabel="This is a radio group label"
            tipText="Tip: These radios are styled horizontally. Typically used for yes/no questions."
            control={control}
            style="horizontal"
            defaultValue="yes"
            options={ [
              {value: "yes", label: "Yes"}, 
              {value: "no", label: "No"}, 
              ] }
          />
          <br />
          <WrapperRadioGroup
            name="buttonRadio"
            groupLabel="This is a radio group label"
            tipText="Tip: These radios are styled as buttons"
            control={control}
            style="button"
            defaultValue="chocolate-button"
            options={ [
              {value: "orange-button", label: "Orange ice cream"}, 
              {value: "mint-button", label: "Mint ice cream"}, 
              {value: "chocolate-button", label: "Chocolate ice cream"}, 
              {value: "vanilla-button", label: "Vanilla ice cream"}] }
          />
        </Section>
        
        <Section id="checkbox-input" style="standard">
          <Heading text="Section Title: Checkboxes" size="h3" type="primary"/>
          <WrapperCheckbox 
            id="test-checkbox2" 
            style="single" 
            name="test-checkbox2" 
            defaultChecked={true}
            label="This is a label" 
            control={control}  />
          <WrapperCheckboxGroup 
            groupLabel="This is a checkbox group label"
            tipText="Tip: This is a group of checkboxes"
            id="test-checkboxgroup" 
            style="single" 
            name="test-checkboxgroup" 
            options={ [
              {id: "check1", label: "Orange ice cream", defaultChecked: true}, 
              {id: "check2", label: "Mint ice cream", defaultChecked: false}, 
              {id: "check3", label: "Chocolate ice cream", defaultChecked: false}, 
              ] }
            defaultChecked={true}
            label="This is a label" 
            control={control} 
          />
        </Section>
        
        <br />
        <button className="block border-gray-900 bg-gray-300 border px-2 py-1" type="button" onClick={ () => { 
            const testGetVal = getValues("check2") 
            console.log(testGetVal)
          } }>
          Get Input Value 
        </button>
        <button className="mt-4 block border-gray-900 bg-gray-300 border px-2 py-1" type="submit">Test Submit</button>

      </form>

    </LayoutContainerSide>

   
  </>
  )
}
export default QuizTemplate
