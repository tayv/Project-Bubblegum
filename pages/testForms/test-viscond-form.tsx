import LayoutContainerSide from "@designSystem/layouts/LayoutContainerSide"
import Breadcrumbs from "@designSystem/molecules/Breadcrumbs"
import Heading from "@designSystem/atoms/Heading"
import Paragraph from "@designSystem/atoms/Paragraph"
import { FC, useEffect, useState, useMemo } from "react"
import { FormProvider, useForm } from "react-hook-form"
import WrapperInput from "@forms/WrapperInput"
import HelpMessage from "@molecules/HelpMessage"
import WrapperRadioGroup from "@forms/WrapperRadioGroup"
import SectionCard from "@designSystem/molecules/SectionCard"
import WrapperCheckbox from "@forms/WrapperCheckbox"
import Tip from "@molecules/Tip"
import Label from "designSystem/atoms/InputLabelRadix"
import TemplateGeneric from "@templates/TemplateGeneric"
import UpdateDocState from "utils/UpdateDocState"
import WrapperTextArea from "@forms/WrapperTextArea"
import WrapperSelect from "@forms/WrapperSelect"
import DatePick from "@designSystem/molecules/DatePick"
import Divider from "@designSystem/atoms/Divider"
import BlankSpace from "@designSystem/atoms/BlankSpace"
import Accordion from "designSystem/atoms/Accordion"
import Field from "@designSystem/forms/FieldTest"
import Checkbox from "@designSystem/atoms/Checkbox"
import Input from "@designSystem/atoms/Input"
import WatchField from "@designSystem/forms/FieldTestConditional"

// data for Breadcrumbs
const crumbs = [
  {
    text: "Home",
    path: "/",
  },
  {
    text: "Test Visibility Conditions Form",
    path: "/",
  },
]

const TestVisForm: FC = () => {
  // Setup initial state
  const [docValue, setDocValue] = useState({ docID: 1, formData: {} })

  // Prepare RHF methods
  const {
    register,
    getFieldState,
    reset,
    handleSubmit,
    control,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm()

  const methods = useForm()

  // Sample onSubmit form handler
  // NOTES: Don't need to  e.preventDefault() since rhf's handleSubmit() automatically prevents page reloads
  // and handles errors for you https://www.react-hook-form.com/api/useform/handlesubmit/
  const onSubmit = handleSubmit(async (data, event) => {
    setDocValue({ docID: 1, formData: data }) // Save form values to state so the test template table can show the values
    console.log("Form submitted. data:", data, "Submit form - errors", Error)
    console.log("event:", event)
    const body = data
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      if (response.status !== 200) {
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
  let PrintInputValueButton = (inputID: string) => {
    const [rhfGetVal, setRHFGetVal] = useState("")

    const handlePrintValue = () => {
      const inputValue = getValues(inputID)
      setRHFGetVal(inputValue)
      console.log("input's value:", inputValue)
    }

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
    )
  }

  // Set up form sections to show/hide
  // These are used to provide a single source of truth for the form sections.
  // Could be used by form inputs as well as page navigation
  const [sectionVis, setSectionCardVis] = useState({
    // Format { sectionID: showSectionCardBoolean }
    textInput: true,
    radioInput: false,
    checkboxInput: true,
    moto: true,
    visCondition1: true,
    visCondition2: true,
  })

  // set up form's default values (required by rhf)
  // useMemo needed to prevent infinite loop due to reset() being a useEffect depenedency in reset()
  const defaultValues = useMemo(
    () => ({
      visOptionAB: "option1a",
      visCheckbox: false, // must be opposite the jsx test condition to work on first click/render
      bikeBrandRadio: "suzuki",
      motoTeamRadio: "honda",
    }),
    []
  )

  // Set up form default values with rhf
  useEffect(() => {
    reset({ ...defaultValues })
  }, [defaultValues, reset])

  // To provide a quick summmary of all form inputs with visibility conditions and their current values
  const fieldValues = {
    bikeBrandRadio: watch("bikeBrandRadio"),
    motoTeamRadio: watch("motoTeamRadio"),
    visOptionAB: watch("visOptionAB"),
    visCheckbox: watch("visCheckbox"),
  }

  return (
    <FormProvider {...methods}>
      <LayoutContainerSide>
        <Breadcrumbs crumbs={crumbs} />
        <Heading size="h1">Test Visibility Conditions Form</Heading>
        <Paragraph>This is a template to test visibility conditions.</Paragraph>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full xl:max-w-1400">
          <form
            id="test-form"
            className="col-span-2 py-3 px-8 my-8 rounded-3xl bg-zinc-200/10 border"
            onSubmit={onSubmit}
          >
            {/* TEXT FIELD SECTION --------------------------------------------- */}
            <SectionCard id="test-field" style="standard">
              <Heading size="h2" type="primary">
                Field Components
              </Heading>
              <Paragraph>
                These atomic components are rendered as children using the Field
                component
              </Paragraph>
              <BlankSpace xSize="small" />
              <Field
                name="field-test-checkbox"
                defaultValue={false}
                control={control}
              >
                <Checkbox id="field-test-checkbox" name="field-test-checkbox" label="This is being watched and toggles the next section" />
              </Field>
              <BlankSpace xSize="small" />
              <Field
                name="field-test-input"
                defaultValue="Text Input"
                control={control}
              >
                <Input label="This uses the Field component" />
              </Field>
            </SectionCard>

            <WatchField
              name="watchfield-test-checkbox"
              defaultValue={true}
              control={control}
              watch={watch}
              conditional={{ name: "field-test-checkbox", value: false }}
            >
              <SectionCard id="text-conditional-field" style="standard">
                <Heading size="h2" type="primary">
                  WatchField Components
                </Heading>
                <Checkbox id="watchfield-test-checkbox" name="watchfield-test-checkbox" label="This watches the previous section" />
              </SectionCard>
            </WatchField>

            {/* VISIBILITY CONDITION TEST SECTION --------------------------------------------- */}
            <Heading size="h2" type="primary">
              Visibility Condition Test Section Card
            </Heading>
            <div className="flex flex-col items-end">
              <button
                type="button"
                className="mt-4 block border-slate-500 bg-slate-200 hover:bg-slate-300 border rounded-md px-2 py-1 align-right w-max"
                onClick={() => {
                  setSectionCardVis({
                    ...sectionVis,
                    visCondition1: !sectionVis.visCondition1,
                  })
                }}
              >
                🪄 Toggle SectionCard Visiblity
              </button>
            </div>

            {sectionVis.visCondition1 && (
              <SectionCard id="testvis-radios" style="standard">
                <WrapperRadioGroup
                  name="visOptionAB"
                  groupLabel="Choose which label to show in the next section"
                  tipText="Tip: N/A"
                  control={control}
                  style="button"
                  options={[
                    { value: "option1a", label: "Checkbox label A" },
                    { value: "option2a", label: "Checkbox label A" },
                    { value: "option3a", label: "Checkbox label A" },
                    { value: "optionb", label: "Checkbox label B" },
                  ]}
                />
              </SectionCard>
            )}

            {PrintInputValueButton("visOptionAB")}
            <Divider padding="large" />

            {
              // Conditionally toggle visibility of section based on prev radio group answer
              sectionVis.visCondition1 &&
                (fieldValues.visOptionAB === "option1a" ||
                  "option2a || option3a") && (
                  <SectionCard id="moto" style="standard">
                    {/* Heading text changes based on answer to previous radio group */}
                    <Heading size="h3">Toggle Words + Questions</Heading>
                    {/* Checkbox conditionally toggles wording and radio options */}
                    <Label
                      type="standard"
                      htmlFor="visCheckbox"
                      label={
                        fieldValues.visOptionAB === "optionb"
                          ? "You chose B"
                          : "You chose A"
                      }
                    />
                    <WrapperCheckbox
                      id="visCheckbox"
                      type="standard"
                      label="Toggle next question"
                      control={control}
                    />
                    <Divider padding="large" />
                    {
                      // Set visibility of radio group based on prev checkbox answer
                      !fieldValues.visCheckbox ? (
                        <WrapperRadioGroup
                          name="bikeBrandRadio"
                          groupLabel="Pick your favorite brand"
                          tipText="You should only see this if checkbox is selected"
                          control={control}
                          style="standard"
                          defaultValue="yamaha"
                          options={[
                            { value: "honda", label: "Honda" },
                            { value: "yamaha", label: "Yamaha" },
                            { value: "suzuki", label: "Suzuki" },
                            { value: "kawasaki", label: "Kawasaki" },
                          ]}
                        />
                      ) : (
                        <WrapperRadioGroup
                          name="motoTeamRadio"
                          groupLabel="Pick your favorite racing team"
                          tipText="You should only see this if the checkbox is NOT selected"
                          control={control}
                          style="standard"
                          options={[
                            { value: "yamaha", label: "Monster Energy Yamaha" },
                            { value: "honda", label: "Repsol Honda" },
                            { value: "ducati", label: "Factory Ducati" },
                            { value: "ferrari", label: "Ferrari" },
                          ]}
                        />
                      )
                    }
                  </SectionCard>
                )
            }

            {PrintInputValueButton("visCheckbox")}
            {PrintInputValueButton("bikeBrandRadio")}
            {PrintInputValueButton("motoTeamRadio")}
            <Divider padding="large" />
            {/* VISIBILITY TEST SECTION END --------------------------------------------- */}
          </form>

          {/*TEMPLATE SECTION START --------------------------------------------- */}
          <div className="overflow-visible my-4">
            {" "}
            {/* div needed for sticky to work. Cannot use overflow: scroll/hidden/auto with sticky https://www.digitalocean.com/community/tutorials/css-position-sticky */}
            <div className="sticky top-0 overflow-y-auto">
              <SectionCard id="templateTest" style="blank">
                <Heading size="h3">Form Submission Test</Heading>
                <TemplateGeneric location="c" docData={docValue} />
              </SectionCard>
            </div>
          </div>
        </div>
        {/*TEMPLATE TEST SECTION END --------------------------------------------- */}
      </LayoutContainerSide>
    </FormProvider>
  )
}
export default TestVisForm
