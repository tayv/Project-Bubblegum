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
import Tip from '@components/helpers/Tip'
import Label from '@components/atoms/InputLabelRadix'
import TemplateGeneric from '@components/products/producta/TemplateGeneric'
import UpdateDocState from '@components/UpdateDocState'
import WrapperTextArea from '@components/controlled-wrappers/WrapperTextArea'
import WrapperSelect from '@components/controlled-wrappers/WrapperSelect'
import DatePick from '@atoms/DatePick'
import Divider from '@components/layout/Divider'

// data for Breadcrumbs
const crumbs = [
  {
    text: "Home", 
    path: "/",
    currentPg: false,
  }, {
    text: "Test Form", 
    path: "/",
    currentPg: true,
  }
]

const TestForm: FC = () => {

  // Setup initial state
  const [docValue, setDocValue] = useState({docID: 1, formData: {}})

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

  // VISIBILITY TESTING START ------------------------------------------------------------------------------------

  const [sectionVis, setSectionVis] = useState(
    {
      // Format { sectionID: showSectionBoolean }
      textInput: true,
      radioInput: false,
      checkboxInput: true,
      rhfradios: true,
      moto: true,
    }
  )

    // set up form default values
    const defaultValues = {
      // Text Input Section
      singleInput: "",
      // Text Area Section
      standardTextArea: "",
      largeTextArea: "",
      // Radio Input Section
      standardRadio: "mint",
      horizontalRadio: "no",
      buttonRadio: "orange-button",
      bikeBrandRadio: "suzuki",
      motoTeamRadio: "honda",
      registerradio: "supercross", // works
      // Checkbox Input Section
      checkboxInput: true,
      // Select Input Section
      flatSelect: "third",
      groupSelect: "third",

    }

    useEffect(() => {
      reset({ ...defaultValues }) 
    }, [])

    const fieldValues = {
      // Text Input Section
      singleInput: getValues("singleInput"),
      // Radio Input Section
      standardRadio: getValues("standardRadio"),
      horizontalRadio: getValues("horizontalRadio"),
      buttonRadio: getValues("buttonRadio"),
      registerradio: watch("registerradio"),
      bikeBrandRadio: watch("bikeBrandRadio"),
      motoTeamRadio: watch("motoTeamRadio"),
      // Checkbox Input Section
      checkboxInput: watch("checkboxInput"), 
      // Select Input Section
      flatSelect: getValues("flatSelect"),
      groupSelect: getValues("groupSelect")
    }


  return (
  <>
    <LayoutContainerSide>
      <Breadcrumbs crumbs={crumbs} />
      <Heading text="Test Form" size="h1" type="primary"/>
      <Paragraph text="This is a template to test form layout and start building out state and database behavior." size="standard" type="primary" />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full xl:max-w-1400">
        <form className="col-span-2 py-3 px-8 my-8 rounded-3xl bg-slate-400/10 drop-shadow-md " onSubmit={ onSubmit }>
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
              defaultValue="" 
              control={control}
              rules={{ required: "You must enter something" }}
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
              options={ [
                {value: "orange-button", label: "Orange ice cream"}, 
                {value: "mint-button", label: "Mint ice cream"}, 
                {value: "chocolate-button", label: "Chocolate ice cream"}, 
                {value: "vanilla-button", label: "Vanilla ice cream"}] }
            />
          </Section>
          
          <Section id="checkboxInput" style="standard">
            <Heading text="Section Title: Checkboxes" size="h3" type="primary"/>
            <Label type="standard" htmlFor="checkboxInput" label="This is a checkbox label" />
            <Tip text="Tip: These are standard checkboxes" type="standard" />
            <WrapperCheckbox 
              id="checkboxInput" 
              style="standard" 
              label="This is a checkbox label" 
              control={control} 
            />
          </Section>

          <Section id="textArea" style="standard">
            <Heading text="Section Title: Text Areas" size="h3" type="primary"/>
            <WrapperTextArea 
              name="standardTextArea"
              label="This is a standard wrapper text area"
              tipText="Tip: This is a standard text area"
              exampleText="e.g. Example goes here."
              control={control}
            />
            <br />
            <WrapperTextArea 
              name="largeTextArea"
              label="This is a large wrapper text area"
              tipText="Tip: This is a large text area"
              size="large"
              exampleText="e.g. Example goes here."
              control={control}
            />
          </Section>

          <Section id="radixWrapperSelect" style="standard">
            <Heading text="Section Title: Wrapper Radix Select" size="h3" type="primary"/>
            <WrapperSelect 
              name="flatselect" 
              control={control} 
              placeholder="Select an option"
              defaultValue=""
              itemOptions={ [
                    {value:"first", labelText:"firstText", separator: false}, 
                    {value:"second", labelText:"secondText", separator: true},
                    {value:"third", labelText:"thirdText", separator: false}, 
                    {value:"fourth", labelText:"fourthText", separator: true},
              ] }
            />
            <br />
            <br />
            <WrapperSelect 
              name="groupselect" 
              control={control} 
              label="This is a grouped list Radix Select"
              tip="Tip: This is a grouped list Radix Select"
              placeholder="Select an option"
              defaultValue={defaultValues.groupSelect}
              
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

          <Section id="datepick" style="standard">
            <Heading text="Section Title: Date Picker" size="h3" type="primary"/>
            <DatePick name="datepicktest" label="This is a date picker (currently uncontrolled)" startYearRange={1990} endYearRange={2030} />
          </Section>

              
        {/* VISIBILITY CONDITION TEST SECTION --------------------------------------------- */}

            { 
              sectionVis.rhfradios && <Section id="rhf-radios" style="standard">
                <Heading text="Section Title: RHF register radios" size="h3" type="primary"/>
                <Label type="standard" htmlFor="registerradio" label="These use rhf's register" />
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

            { (fieldValues.registerradio === "supercross") && <Section id="moto" style="standard">
              <Heading text={(fieldValues.registerradio === "motogp") ? "Who's your favorite team?" : "What's your favorite bike brand?"} size="h3" type="primary"/>
              {
                (getValues("checkboxInput") ) ?
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
                      {value: "kawasaki", label: "Kawasaki"}
                    ] }
                  /> :
                    <WrapperRadioGroup
                      name="motoTeamRadio"
                      groupLabel="Pick your favorite racing team"
                      tipText="Tip: These are standard radio buttons"
                      control={control}
                      style="standard"
                      options={ [
                        {value: "yamaha", label: "Monster Energy Yamaha"}, 
                        {value: "honda", label: "Repsol Honda"}, 
                        {value: "ducati", label: "Factory Ducati"}, 
                        {value: "vr46", label: "VR 46 Ducati"}
                      ] }
                    /> 
              }
            </Section>
          }

            <button 
              type="button" 
              className="mt-4 block border-gray-900 bg-blue-300 border px-2 py-1" 
              onClick={ () => {
                setSectionVis({ ...sectionVis, rhfradios: !sectionVis.rhfradios })
              }} 
              >Toggle Visiblity
            </button>

            {/* VISIBILITY TEST SECTION END --------------------------------------------- */}

          <br />
          <button 
            type="button" 
            className="block border-gray-900 bg-gray-300 border px-2 py-1" 
            onClick={ () => { 

              UpdateDocState(getValues, setDocValue, docValue)
            
            // const testGetVal = getValues("regcheck") 
            // console.log(testGetVal)
            } }>
            Update Form State
          </button>
          
          <br />
          <button 
            type="button" 
            className="block border-gray-900 bg-pink-300 border px-2 py-1" 
            onClick={ () => { 
              const testGetVal = getValues("wrapperselect") 
              console.log(testGetVal)
            } }>
            Print Input Value
          </button>

          <button 
            type="submit"
            className="mt-4 block border-gray-900 bg-gray-300 border px-2 py-1"
            >Test Submit
          </button>
          <br/>
        </form>
    

      { /*TEMPLATE SECTION START --------------------------------------------- */}
      <div className="overflow-visible my-4"> {/* div needed for sticky to work. Cannot use overflow: scroll/hidden/auto with sticky https://www.digitalocean.com/community/tutorials/css-position-sticky */}
        <div className="sticky top-0 overflow-y-auto">
          <Section id="templateTest" style="blank">
            <Heading text="Template Test: Form Values" size="h3" type="primary"/>
            <TemplateGeneric location="c" docID={2} formData={ { input1: "some data", input2: "this is the dynamic data", input3: 100 } } />
          </Section>
        </div>
      </div>
     </div>
      { /*TEMPLATE TEST SECTION END --------------------------------------------- */}


    </LayoutContainerSide>

  </>
  )
}
export default TestForm
