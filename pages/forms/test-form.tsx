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
import BlankSpace from '@components/layout/BlankSpace'
import Accordion from '@components/atoms/Accordion'

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

  // Prepare RHF methods
  const { register, getFieldState, reset, handleSubmit, control, getValues, setValue, watch, formState: { errors }} = useForm()

  // Sample onSubmit form handler
    // NOTES: Don't need to  e.preventDefault() since rhf's handleSubmit() automatically prevents page reloads 
    // and handles errors for you https://www.react-hook-form.com/api/useform/handlesubmit/
  const onSubmit = handleSubmit( async (data, event) => {
    setDocValue({docID: 1, formData: data}) // Save form values to state so the test template table can show the values
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

  // Printing an input's value used for debugging
  let renderPrintValueButton = (inputID: string) => { 
    const [rhfGetVal, setRHFGetVal] = useState("");
    
    const handlePrintValue = () => {
      const inputValue = getValues(inputID);
      setRHFGetVal(inputValue);
      console.log("input's value:", inputValue);
    };
  
    return (
      <div className="flex flex-row items-center gap-3">
        <button 
          type="button" 
          className="block border-slate-900 bg-slate-100 hover:bg-slate-200 border rounded-md my-1 px-2 py-1 text-xs font-medium" 
          onClick={handlePrintValue}
        >
          🖨️ Print {inputID} Value
        </button>
        {rhfGetVal === undefined ? (
        <Paragraph size="small"> Value is undefined </Paragraph>
      ) : (
        <Paragraph size="small">{`Value: ${rhfGetVal}`}</Paragraph>
      )}
      </div>
    );
  }

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


  // Set up form sections to show/hide
  const [sectionVis, setSectionVis] = useState(
    {
      // Format { sectionID: showSectionBoolean }
      textInput: true,
      radioInput: false,
      checkboxInput: true,
      moto: true,
      visCondition1: true,
      visCondition2: true,
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
      // Checkbox Input Section
      checkboxInput: true,
      // Select Input Section
      flatSelect: "third",
      groupSelect: "third",
      // Have visibility conditions
      visRacingRadio: "moto-gp",
      visCheckbox: true,
      bikeBrandRadio: "suzuki",
      motoTeamRadio: "honda",
    }

    // Set up form default values with rhf 
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
      groupSelect: getValues("groupSelect"),
      // Visibliity Conditions
      visRacingRadio: watch("visRacingRadio"),
      visCheckbox: watch("visCheckbox")
    }


  return (
  <>
    <LayoutContainerSide>
      <Breadcrumbs crumbs={crumbs} />
      <Heading size="h1">Test Form</Heading>
      <Paragraph>This is a template to test form layout and start building out state and database behavior.</Paragraph>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full xl:max-w-1400">
        <form id="test-form" className="col-span-2 py-3 px-8 my-8 rounded-3xl bg-zinc-200/10 border" onSubmit={ onSubmit }>
          <Section id="intro" style="blank">
            <Heading size="h2">Test Form 1</Heading>
            <Paragraph>This form is used to show default styling for text, radio button, checkbox, and multi-line input components. Also used to test Controlled inputs. </Paragraph>
          </Section>
          <Section id="accordion-test" style="standard">
            <Accordion 
              type="single" 
              accordionStyle="standard"
              items={[
              { 
                value: "item-1", 
                headerText: "Is it accessible lol?", 
                contentText: "Yes. It adheres to the WAI-ARIA design pattern."
              }, 
              { value: "item-2", 
                headerText: "Is it pretty lol?", 
                contentText: "Not yet"
              }
            ]}/>
          </Section>
          <Section id="textInput" style="standard">
            <Heading size="h3">Single Line Input</Heading>
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

            <Divider padding="large" />
            {renderPrintValueButton("singleInput")}
            
          </Section>
  
          <Section id="radioInput" style="standard">
            <Heading size="h3" type="primary">Radio Groups</Heading>
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
            <BlankSpace />
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
            <BlankSpace />
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

            <Divider padding="large" />
            {renderPrintValueButton("standardRadio")}
            {renderPrintValueButton("horizontalRadio")}
            {renderPrintValueButton("buttonRadio")}

          </Section>
          
          <Section id="checkboxInput" style="standard">
            <Heading size="h3" type="primary">Checkboxes</Heading>
            <Label type="standard" htmlFor="checkboxInput" label="This is a checkbox label" />
            <Tip text="Tip: These are standard checkboxes" type="standard" />
            <WrapperCheckbox 
              id="checkboxInput" 
              style="standard" 
              label="This is a checkbox label" 
              control={control} 
            />

            <Divider padding="large" />
            {renderPrintValueButton("checkboxInput")}

          </Section>

          <Section id="textArea" style="standard">
            <Heading size="h3" type="primary">Text Areas</Heading>
            <WrapperTextArea 
              name="standardTextArea"
              label="This is a standard wrapper text area"
              tipText="Tip: This is a standard text area"
              exampleText="e.g. Example goes here."
              control={control}
            />
            <BlankSpace />
            <WrapperTextArea 
              name="largeTextArea"
              label="This is a large wrapper text area"
              tipText="Tip: This is a large text area"
              size="large"
              exampleText="e.g. Example goes here."
              control={control}
            />

            <Divider padding="large" />
            {renderPrintValueButton("standardTextArea")}
            {renderPrintValueButton("largeTextArea")}

          </Section>

          <Section id="radixWrapperSelect" style="standard">
            <Heading size="h3" type="primary">Wrapper Select (Radix)</Heading>
            <WrapperSelect 
              name="flatselect" 
              control={control} 
              placeholder="Select an option"
              defaultValue={defaultValues.flatSelect}
              itemOptions={ [
                {value:"first", labelText:"firstText", separator: false}, 
                {value:"second", labelText:"secondText", separator: true},
                {value:"third", labelText:"thirdText", separator: false}, 
                {value:"fourth", labelText:"fourthText", separator: true},
              ] }
            />
            <BlankSpace />
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

            <Divider padding="large" />
            {renderPrintValueButton("flatselect")}
            {renderPrintValueButton("groupselect")}

          </Section>

          <Section id="datepick" style="standard">
            <Heading size="h3" type="primary">Date Picker</Heading>
            <DatePick name="datepicktest" label="This is a date picker (currently uncontrolled)" startYearRange={1990} endYearRange={2030} />
         
            <Divider padding="large" />
            {renderPrintValueButton("datepicktest")}
          </Section>

              
        {/* VISIBILITY CONDITION TEST SECTION --------------------------------------------- */}
          <Divider padding="large" />      
          <Heading size="h2" type="primary">Visibility Condition Test Section</Heading>
          <div className="flex flex-col items-end">
            <button 
              type="button" 
              className="mt-4 block border-slate-500 bg-slate-200 hover:bg-slate-300 border rounded-md px-2 py-1 align-right w-max" 
              onClick={ () => {
                setSectionVis({ ...sectionVis, visCondition1: !sectionVis.visCondition1 })
              }} 
              >🪄 Toggle Section Visiblity
            </button>
          </div>

            {
              sectionVis.visCondition1 && <Section id="testvis-radios" style="standard">
                <WrapperRadioGroup
                  name="visRacingRadio"
                  groupLabel="This is a radio group label"
                  tipText="Tip: These radios are styled as buttons"
                  control={control}
                  style="button"
                  options={ [
                    {value: "moto-gp", label: "Moto GP"}, 
                    {value: "work-superbike", label: "World Superbike"}, 
                    {value: "supercross", label: "Supercross"}, 
                    {value: "f1", label: "F1"}] }
                />
              </Section>            
            }
           
            { renderPrintValueButton("visRacingRadio") }
            <Divider padding="large" />

            { 
              // Conditionally toggle visibility of section based on prev radio group answer 
              sectionVis.visCondition1 && (fieldValues.visRacingRadio === "supercross" || "moto-gp") && <Section id="moto" style="standard">
              {/* Heading text changes based on answer to previous radio group */}
              <Heading size="h3">Toggle Words + Questions</Heading>
              {/* Checkbox conditionally toggles wording and radio options */}
              <Label type="standard" htmlFor="visCheckbox" label={(fieldValues.visRacingRadio === "f1") ? "You chose F1" : "You didn't choose F1"} />
              <WrapperCheckbox 
                id="visCheckbox" 
                style="standard" 
                label="Toggle next question" 
                control={control} 
              />
              <Divider padding="large" />
              { 
                // Set visibility of radio group based on prev checkbox answer
                ( fieldValues.visCheckbox ) ?
                  <WrapperRadioGroup
                    name="bikeBrandRadio"
                    groupLabel="Pick your favorite brand"
                    tipText="You should only see this if checkbox is selected"
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
                      tipText="You should only see this if the checkbox is NOT selected"
                      control={control}
                      style="standard"
                      options={ [
                        {value: "yamaha", label: "Monster Energy Yamaha"}, 
                        {value: "honda", label: "Repsol Honda"}, 
                        {value: "ducati", label: "Factory Ducati"}, 
                        {value: "ferrari", label: "Ferrari"}
                      ] }
                    /> 
              }
            </Section>
          }
          
          {renderPrintValueButton("visCheckbox")}
          {renderPrintValueButton("bikeBrandRadio")}
          {renderPrintValueButton("motoTeamRadio")} 
          <Divider padding="large" />
        {/* VISIBILITY TEST SECTION END --------------------------------------------- */}
          
        </form>
    
      { /*TEMPLATE SECTION START --------------------------------------------- */}
      <div className="overflow-visible my-4"> {/* div needed for sticky to work. Cannot use overflow: scroll/hidden/auto with sticky https://www.digitalocean.com/community/tutorials/css-position-sticky */}
        <div className="sticky top-0 overflow-y-auto">
          <Section id="templateTest" style="blank">
            <Heading size="h3">Template Test: Form Values</Heading>
            <TemplateGeneric location="c" docData={ docValue } />
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
