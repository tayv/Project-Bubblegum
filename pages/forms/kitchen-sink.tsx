import Breadcrumbs from '@components/layout/Breadcrumbs'
import Heading from '@components/layout/Heading'
import LayoutContainerSide from '@components/layout/LayoutContainerSide'
import Paragraph from '@components/layout/Paragraph'
import Link from 'next/link'
import { Input } from '@components/atoms/input'

export default function KitchenSink() {
  // data for Breadcrumbs
  const crumbs = [
    {
      text: "Home", 
      path: "/",
      currentPg: false,
    }, {
      text: "Kitchen Sink", 
      path: "/",
      currentPg: true,
    }
  ]

  return (
    <> 
      <LayoutContainerSide>
      <Breadcrumbs crumbs={crumbs} />  


      <Heading text="Kitchen Sink Examples" size="h1" type="primary" />
      <Paragraph text="An opinionated form reset designed to make form elements easy to style with utility classes." size="standard" type="primary" />
      <div className="mt-2 mb-8 flex space-x-4">
        <a className="text-lg underline" href="https://github.com/tailwindlabs/tailwindcss-forms"
          >Documentation</a
        >
        <a className="text-lg underline" href="/kitchen-sink.html">Kitchen Sink</a>
      </div>
      
      <hr />

      <Heading text="Bubblegum Components" size="h2" type="primary" />
      <Paragraph text="List of all created form components." size="standard" type="primary" />

      <div className="border border-gray-900 py-4 px-4 mb-6">
        <Heading text="Finished Components" size="h3" type="secondary" />
        <Input name="uncontrolledInput1" type="text" label="Standard text input:" tipText="Optional tip text" exampleText="Optional example" />
        <Input name="uncontrolledInput2" type="text" label="Large text input:" size="large" tipText="Optional tip text" exampleText="Optional example" />
        <Input name="uncontrolledInput3" type="email" label="Email input" size="standard" tipText="Optional tip text" exampleText="Optional example" />
        <Input name="uncontrolledInput4" type="tel" label="Telephone input" size="standard" tipText="Optional tip text" exampleText="Optional example" />
        <Input name="uncontrolledInput5" type="number" label="Number input" size="standard" tipText="Optional tip text" exampleText="Optional example" />
      </div>

      <div className="border border-gray-900 py-4 px-4 mb-6">
        <Heading text="Unfinished Components" size="h3" type="secondary" />
        <br />
       
      </div>

      <hr />
      <div className="max-w-xl mx-auto py-3 md:max-w-4xl">
        <Heading text="Reset Styles" size="h2" type="primary" />
        <Paragraph text="Default Tailwind plugin styles." size="standard" type="primary" />
       
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div className="grid grid-cols-1 gap-6">
            <label className="block">
              <span className="text-gray-700">Input (text)</span>
              <input
                type="text"
                className="form-input mt-1 block w-full"
                placeholder="john@example.com"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Input (email)</span>
              <input
                type="email"
                className="form-input mt-1 block w-full"
                placeholder="john@example.com"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Input (email, multiple)</span>
              <input
                type="email"
                multiple
                className="form-input mt-1 block w-full"
                placeholder="john@example.com"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Input (password)</span>
              <input
                type="password"
                className="form-input mt-1 block w-full"
                placeholder="john@example.com"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Input (date)</span>
              <input type="date" className="form-input mt-1 block w-full" />
            </label>
            <label className="block">
              <span className="text-gray-700">Input (datetime-local)</span>
              <input type="datetime-local" className="form-input mt-1 block w-full" />
            </label>
            <label className="block">
              <span className="text-gray-700">Input (month)</span>
              <input type="month" className="form-input mt-1 block w-full" />
            </label>
            <label className="block">
              <span className="text-gray-700">Input (number)</span>
              <input type="number" className="form-input mt-1 block w-full" />
            </label>
            <label className="block">
              <span className="text-gray-700">Input (search)</span>
              <input type="search" className="form-input mt-1 block w-full" />
            </label>
            <label className="block">
              <span className="text-gray-700">Input (time)</span>
              <input type="time" className="form-input mt-1 block w-full" />
            </label>
            <label className="block">
              <span className="text-gray-700">Input (week)</span>
              <input type="week" className="form-input mt-1 block w-full" />
            </label>
          </div>
          <div className="grid grid-cols-1 gap-6">
            <label className="block">
              <span className="text-gray-700">Input (tel)</span>
              <input
                type="tel"
                multiple
                className="form-input mt-1 block w-full"
                placeholder="john@example.com"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Input (url)</span>
              <input
                type="url"
                multiple
                className="form-input mt-1 block w-full"
                placeholder="john@example.com"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Select</span>
              <select className="form-select block w-full mt-1">
                <option>Option 1</option>
                <option>Option 2</option>
              </select>
            </label>
            <label className="block">
              <span className="text-gray-700">Select (multiple)</span>
              <select className="form-multiselect block w-full mt-1" multiple>
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
                <option>Option 4</option>
                <option>Option 5</option>
              </select>
            </label>
            <label className="block">
              <span className="text-gray-700">Textarea</span>
              <textarea
                className="form-textarea mt-1 block w-full h-24"
                rows={2}
                placeholder="Enter some long form content."
              ></textarea>
            </label>
            <fieldset className="block">
              <legend className="text-gray-700">Checkboxes</legend>
              <div className="mt-2">
                <div>
                  <label className="inline-flex items-center">
                    <input className="form-checkbox" type="checkbox" checked />
                    <span className="ml-2">Option 1</span>
                  </label>
                </div>
                <div>
                  <label className="inline-flex items-center">
                    <input className="form-checkbox" type="checkbox" />
                    <span className="ml-2">Option 2</span>
                  </label>
                </div>
                <div>
                  <label className="inline-flex items-center">
                    <input className="form-checkbox" type="checkbox" />
                    <span className="ml-2">Option 3</span>
                  </label>
                </div>
              </div>
            </fieldset>
            <fieldset className="block">
              <legend className="text-gray-700">Radio Buttons</legend>
              <div className="mt-2">
                <div>
                  <label className="inline-flex items-center">
                    <input className="form-radio" type="radio" checked name="radio-direct" value="1" />
                    <span className="ml-2">Option 1</span>
                  </label>
                </div>
                <div>
                  <label className="inline-flex items-center">
                    <input className="form-radio" type="radio" name="radio-direct" value="2" />
                    <span className="ml-2">Option 2</span>
                  </label>
                </div>
                <div>
                  <label className="inline-flex items-center">
                    <input className="form-radio" type="radio" name="radio-direct" value="3" />
                    <span className="ml-2">Option 3</span>
                  </label>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-3">
        <hr />
        <Heading text="Untouched" size="h2" type="primary" />
        <Paragraph text="These are form elements we don't handle (yet?), but we use this to make sure we haven't accidentally styled them by mistake." size="standard" type="primary" />
        <div className="mt-8 grid grid-cols-2 gap-6 items-start">
          <div className="grid grid-cols-1 gap-6">
            <label className="block">
              <span className="text-gray-700">Input (range)</span>
              <input type="range" className="mt-1 block w-full" />
            </label>
            <label className="block">
              <span className="text-gray-700">Input (color)</span>
              <input type="color" className="mt-1 block w-full" />
            </label>
            <label className="block">
              <span className="text-gray-700">Input (file)</span>
              <input type="file" className="mt-1 block w-full" />
            </label>
            <label className="block">
              <span className="text-gray-700">Input (file, multiple)</span>
              <input type="file" multiple className="mt-1 block w-full" />
            </label>
          </div>
        </div>
      </div>
      
      </LayoutContainerSide>
    </>
  )
}