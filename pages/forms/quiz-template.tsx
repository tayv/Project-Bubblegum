import LayoutContainerSide from '@components/layout/LayoutContainerSide'
import Breadcrumbs from '@components/layout/Breadcrumbs'
import Heading from '@components/layout/Heading'
import Paragraph from '@components/layout/Paragraph'
import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import WrapperInput from '@components/controlled-wrappers/WrapperInput'
import HelpMessage from '@components/helpers/HelpMessage'
import WrapperRadioGroup from '@components/controlled-wrappers/WrapperRadioGroup'
import Section from '@components/layout/Section'
import WrapperCheckbox from '@components/controlled-wrappers/WrapperCheckbox'
import Tip from '@components/layout/Tip'
import Label from '@components/layout/Label'
import Checkbox from '@components/atoms/checkbox'

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
  const { register, getFieldState, reset, handleSubmit, control, getValues, setValue, watch, formState: { errors }} = useForm()

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

  // TESTING START ------------------------------------------------------------------------------------

  const [sectionVis, setSectionVis] = useState(
    {
      // Format { sectionID: showSectionBoolean }
      textInput: true,
      radioInput: false,
      checkboxInput: true
    }
  )


  const testcheckbox = watch("registercheckbox")
  const renderTest = () => {
   console.log("registercheckbox test:", testcheckbox)
   !!testcheckbox && console.log("testcheckbox: ", testcheckbox)
  } 
  
  // set up form default values
  useEffect(() => {
    let defaultValues = {
      registercheckbox: true,
      registerradio: "supercross", // works
     // buttonRadio: 
    }
    reset({ ...defaultValues }) 
  }, [])

  const fieldValue = {
    registercheckbox: getValues("registercheckbox") ,
    buttonRadio: watch("buttonRadio", "chocolate-radio"),
    registerradio: watch("registerradio"),
  }
  console.log("values: ", fieldValue)

  // END OF TEST CODE ------------------------------------------------------------------------------------

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
        <Section id="textInput" style="standard">
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
 
        <Section id="radioInput" style="standard">
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
        
        <Section id="checkboxInput" style="standard">
          <Heading text="Section Title: Checkboxes" size="h3" type="primary"/>
          <Label type="standard" label="This is a checkbox label" />
          <Tip text="Tip: These are standard checkboxes" type="standard" />
          <WrapperCheckbox 
            id="test-checkbox" 
            style="standard" 
            name="test-checkbox" 
            defaultChecked={true}
            label="This is a checkbox label" 
            control={control} 
          />
        </Section>

             
       {/* VISIBILITY CONDITION TEST SECTION --------------------------------------------- */}

        {
          useEffect(() => { renderTest() }, [testcheckbox])
          // !!testcheckbox && <Section id="test" style="standard"> 
          // </Section>
        }
      
      
          <div>
            <input {...register("registercheckbox")} id="registercheckbox" type="checkbox" value="A" />
            {!!sectionVis.radioInput && <label htmlFor="registercheckbox"> I have a bike </label> }
            </div>

          { 
            !!fieldValue.registercheckbox && <Section id="rhf-radios" style="standard">
              <Heading text="Section Title: RHF register radios" size="h3" type="primary"/>
              <Label type="standard" label="These use rhf's register" />
              <Tip text="Tip: pick your favorite type of racing" type="standard" />
              <input {...register("registerradio")} id="registerradio1" type="radio" value="motogp" />
              <label htmlFor="registerradio1">Moto GP</label> 
              <input {...register("registerradio")} id="registerradio2" type="radio" value="worldsbk" />
              <label htmlFor="registerradio2">World Superbike</label>
              <input {...register("registerradio")} id="registerradio3" type="radio" value="supercross" />
              <label htmlFor="registerradio3">Supercross</label> 
              <input {...register("registerradio")} id="registerradio4" type="radio" value="islemantt" />
              <label htmlFor="registerradio4">Isle of Man TT</label> 
            </Section>
          }

          <Section id="moto" style="standard">
            <Heading text={(fieldValue.registerradio === "motogp") ? "Who's your favorite team?" : "What's your favorite bike brand?"} size="h3" type="primary"/>
            <Label type="standard" label="Choose from the list" />
            <Tip text={(fieldValue.registerradio === "motogp") ? "Choose a bike brand" : "Choose a motorcycle"} type="standard" />
            { 
              (fieldValue.registerradio === "motogp") ?
                <WrapperRadioGroup
                  name="bikeBrandRadio"
                  groupLabel="Pick your favorite bike brand"
                  tipText="Tip: These are standard radio buttons"
                  control={control}
                  style="standard"
                  defaultValue="yamaha"
                  options={ [
                    {value: "honda", label: "Honda"}, 
                    {value: "yamaha", label: "Yamaha"}, 
                    {value: "suzuki", label: "Suzuki"}, 
                    {value: "kawasaki", label: "Kawasaki"}] }
                /> :
                  <WrapperRadioGroup
                    name="motoTeamRadio"
                    groupLabel="Pick your favorite racing team"
                    tipText="Tip: These are standard radio buttons"
                    control={control}
                    style="standard"
                    defaultValue="honda"
                    options={ [
                      {value: "yamaha", label: "Monster Energy Yamaha"}, 
                      {value: "honda", label: "Repsol Honda"}, 
                      {value: "ducati", label: "Factory Ducati"}, 
                      {value: "vr46", label: "VR 46 Ducati"}] }
                  /> 
            }
          </Section>

          <button 
            type="button" 
            className="mt-4 block border-gray-900 bg-blue-300 border px-2 py-1" 
            onClick={ () => {
              setSectionVis({ ...sectionVis, radioInput: !sectionVis.radioInput })
              console.log("sectionVis updated: ", sectionVis)
            }} 
            >Toggle Visiblity
          </button>

          {/* VISIBILITY TEST SECTION END --------------------------------------------- */}

        <br />
        <button 
          type="button" 
          className="block border-gray-900 bg-gray-300 border px-2 py-1" 
          onClick={ () => { 
            const testGetVal = getValues("test-checkbox") 
            console.log(testGetVal)
          } }>
          Get Input Value 
        </button>
        <button 
          type="submit"
          className="mt-4 block border-gray-900 bg-gray-300 border px-2 py-1"
          >Test Submit
        </button>

      </form>

    </LayoutContainerSide>

   
  </>
  )
}
export default QuizTemplate
