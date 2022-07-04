import Breadcrumbs from '@components/layout/Breadcrumbs'
import HeadingArticle from '@components/layout/HeadingArticle'
import DoDont from '@components/layout/DoDont'
import LayoutContainerSide from '@components/layout/LayoutContainerSide'
import Link from 'next/link'

export default function KitchenSink() {
  // data for Breadcrumbs
  const crumbs = [
    {
      text: "Home", 
      path: "/",
      active: false,
    }, {
      text: "Kitchen Sink", 
      path: "/",
      active: true,
    }
  ]

  return (
    <> 
      <LayoutContainerSide>
      <Breadcrumbs crumbs={crumbs} />  

      <div className="antialiased text-gray-900 px-6">
      <div className="max-w-xl mx-auto py-12 divide-y md:max-w-4xl">
        <div className="py-8">
          <h1 className="text-4xl font-bold">@tailwindcss/forms examples</h1>
          <p className="mt-2 text-lg text-gray-600">
            An opinionated form reset designed to make form elements easy to style with utility
            classes.
          </p>
          <div className="mt-4 flex space-x-4">
            <a className="text-lg underline" href="https://github.com/tailwindlabs/tailwindcss-forms"
              >Documentation</a
            >
            <a className="text-lg underline" href="/kitchen-sink.html">Kitchen Sink</a>
          </div>
        </div>
        <div className="py-12">
          <h2 className="text-2xl font-bold">Unstyled</h2>
          <p className="mt-2 text-lg text-gray-600">This is how form elements look out of the box.</p>
          <div className="mt-8 max-w-md">
            <div className="grid grid-cols-1 gap-6">
              <label className="block">
                <span className="text-gray-700">Full name</span>
                <input type="text" className="mt-1 block w-full" placeholder="" />
              </label>
              <label className="block">
                <span className="text-gray-700">Email address</span>
                <input type="email" className="mt-1 block w-full" placeholder="john@example.com" />
              </label>
              <label className="block">
                <span className="text-gray-700">When is your event?</span>
                <input type="date" className="mt-1 block w-full" />
              </label>
              <label className="block">
                <span className="text-gray-700">What type of event is it?</span>
                <select className="block w-full mt-1">
                  <option>Corporate event</option>
                  <option>Wedding</option>
                  <option>Birthday</option>
                  <option>Other</option>
                </select>
              </label>
              <label className="block">
                <span className="text-gray-700">Additional details</span>
                <textarea className="mt-1 block w-full" rows="3"></textarea>
              </label>
              <div className="block">
                <div className="mt-2">
                  <div>
                    <label className="inline-flex items-center">
                      <input type="checkbox" />
                      <span className="ml-2">Email me news and special offers</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="py-12">
          <h2 className="text-2xl font-bold">Simple</h2>
          <div className="mt-8 max-w-md">
            <div className="grid grid-cols-1 gap-6">
              <label className="block">
                <span className="text-gray-700">Full name</span>
                <input
                  type="text"
                  className="
                    mt-1
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  "
                  placeholder=""
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Email address</span>
                <input
                  type="email"
                  className="
                    mt-1
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  "
                  placeholder="john@example.com"
                />
              </label>
              <label className="block">
                <span className="text-gray-700">When is your event?</span>
                <input
                  type="date"
                  className="
                    mt-1
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  "
                />
              </label>
              <label className="block">
                <span className="text-gray-700">What type of event is it?</span>
                <select
                  className="
                    block
                    w-full
                    mt-1
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  "
                >
                  <option>Corporate event</option>
                  <option>Wedding</option>
                  <option>Birthday</option>
                  <option>Other</option>
                </select>
              </label>
              <label className="block">
                <span className="text-gray-700">Additional details</span>
                <textarea
                  className="
                    mt-1
                    block
                    w-full
                    rounded-md
                    border-gray-300
                    shadow-sm
                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                  "
                  rows="3"
                ></textarea>
              </label>
              <div className="block">
                <div className="mt-2">
                  <div>
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        className="
                          rounded
                          border-gray-300
                          text-indigo-600
                          shadow-sm
                          focus:border-indigo-300
                          focus:ring
                          focus:ring-offset-0
                          focus:ring-indigo-200
                          focus:ring-opacity-50
                        "
                      />
                      <span className="ml-2">Email me news and special offers</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
      
      </LayoutContainerSide>
    </>
  )
}