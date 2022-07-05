import Head from 'next/head'
import Link from 'next/link'


export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-10 bg-fuchsia-300">
      <Head>
        <title>Bubblegum - reusable React form components to chew on</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center bg-fuchsia-300">
        <h1 className="text-6xl font-bold">Bubblegum</h1>

        <p className="mt-3 text-2xl">Reusable react form components (wip 🏗️)</p>

        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          <Link href="/forms/kitchen-sink">
            <a className="p-6 mt-6 text-left border w-96 rounded-xl border-black hover:text-blue-600 focus:text-blue-600">
              <h3 className="text-2xl font-bold">Form Kitchen Sink &rarr;</h3>
              <p className="mt-4 text-xl">Overview of all form inputs</p>
            </a>
          </Link>

          <Link href="/forms/quiz-template">
            <a className="p-6 mt-6 text-left border w-96 rounded-xl border-black hover:text-blue-600 focus:text-blue-600">
              <h3 className="text-2xl font-bold">Quiz Template &rarr;</h3>
              <p className="mt-4 text-xl">For testing layout and form functionality.</p>
            </a>
          </Link>

          <Link href="/forms/radios">
            <a className="p-6 mt-6 text-left border w-96 rounded-xl border-black hover:text-blue-600 focus:text-blue-600">
              <h3 className="text-2xl font-bold">Radio buttons &rarr;</h3>
              <p className="mt-4 text-xl">Used for 2 or more options</p>
            </a>
          </Link>
            
          <Link href="/forms/select">
            <a className="p-6 mt-6 text-left border w-96 rounded-xl border-black hover:text-blue-600 focus:text-blue-600">
              <h3 className="text-2xl font-bold">Select from a list &rarr;</h3>
              <p className="mt-4 text-xl">You'll find dropdowns and comboboxes here</p>
            </a>
          
          </Link>

          <Link href="/forms/buttons">
            <a className="p-6 mt-6 text-left border w-96 rounded-xl border-black hover:text-blue-600 focus:text-blue-600">
              <h3 className="text-2xl font-bold">Buttons &rarr;</h3>
              <p className="mt-4 text-xl">Things you press go here</p>
            </a>
          </Link>  

          <Link href="/forms/text-inputs">
            <a className="p-6 mt-6 text-left border w-96 rounded-xl border-black hover:text-blue-600 focus:text-blue-600">
              <h3 className="text-2xl font-bold">Text Input &rarr;</h3>
              <p className="mt-4 text-xl">Single and multi-line text inputs</p>
            </a>
          </Link>  

          <Link href="/layout/containers">
            <a className="p-6 mt-6 text-left border w-96 rounded-xl border-black hover:text-blue-600 focus:text-blue-600">
              <h3 className="text-2xl font-bold">Containers &rarr;</h3>
              <p className="mt-4 text-xl">Structuring page content</p>
            </a>
          </Link>  

        </div>
      </main>

      <footer className="flex items-center justify-center w-full h-24 mt-12 border-t border-fuchsia-500 bg-fuchsia-400">
          Powered by 🍬
      </footer>
    </div>
  )
}
