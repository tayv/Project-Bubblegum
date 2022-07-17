import LayoutContainerSide from '@components/layout/LayoutContainerSide'
import Breadcrumbs from '@components/layout/Breadcrumbs'
import Heading from '@components/layout/Heading'
import Paragraph from '@components/layout/Paragraph'
import {FC} from 'react'
import { useForm } from 'react-hook-form'
import WrapperInput from '@components/controlled-wrappers/WrapperInput'
import WarningMessage from '@components/utils/WarningMessage'

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

// Sample warning message object
const messageWarn = {
  message: "This is a warning message",
  include: true,
  valid: true,
  setWarningBoolean: false,
  }

const QuizTemplate: FC = () => {

  // React hook form
  const { handleSubmit, control, getValues, formState: { errors }} = useForm()

  // Sample onSubmit form handler
  const onSubmit = handleSubmit((data) => {
    console.log("Form submitted. Data:", data, "Submit form - errors", Error)

  })

  // const regEx = /(a)/g // check if contains "a"


  return (
  <>
    <LayoutContainerSide>
      <Breadcrumbs crumbs={crumbs} />
      <Heading text="Quiz Template" size="h1" type="primary"/>
      <Paragraph text="This is a template to test form layout and start building out state and database behavior." size="standard" type="primary" />
      <br />
      <hr />
      
      <form className="border border-gray-900 py-2 px-4" onSubmit={onSubmit}>
        <Heading text="Test Form 1" size="h2" type="primary"/>
        <Paragraph text="This section is used to test the text input component." size="standard" type="primary" />
        <Heading text="Controlled Wrapper Input" size="h3" type="primary"/>
        <WrapperInput
          name="controlledInput"
          label="This is a label"
          type="text"
          tipText="This is a tip"
          // messageType="warn"
          // testFor="a"
         // regEx={regEx}
          exampleText="e.g. Example goes here."
          control={control}
          rules={{ required: "You must enter something" }}
          defaultValue=""
        >
          <WarningMessage messageType="warn" control={control} testFor="a"/>
        </WrapperInput>
        <br />
        <br />
        <button className="block border-gray-900 bg-gray-300 border px-2 py-1" type="button" onClick={ () => { 
            const testGetVal = getValues("controlledInput") 
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
