import LayoutContainerSide from '@components/layout/LayoutContainerSide'
import Breadcrumbs from '@components/layout/Breadcrumbs'
import Heading from '@components/layout/Heading'
import Paragraph from '@components/layout/Paragraph'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import WrapperInput from '@components/controlled-wrappers/WrapperInput'
import HelpMessage from '@components/helpers/HelpMessage'
import { RadioButton } from '@components/atoms/radiobutton'

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
      
      <form className="border border-gray-900 py-2 px-4" onSubmit={ onSubmit }>
        <Heading text="Test Form 1" size="h2" type="primary"/>
        <Paragraph text="This section is used to test the text input component." size="standard" type="primary" />
        <Heading text="Controlled Wrapper Input" size="h3" type="primary"/>
        <WrapperInput
          name="firstName"
          label="This is a label"
          type="text"
          tipText="This is a tip"
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

        <RadioButton 
          name="firstName"
          label="This is a label"
          style="standard"
          tipText="This is a tip"
          exampleText="e.g. Example goes here."
          control={control}
          //checked={checked}
        />

        <br />
        <br />
        <button className="block border-gray-900 bg-gray-300 border px-2 py-1" type="button" onClick={ () => { 
            const testGetVal = getValues("firstName") 
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
