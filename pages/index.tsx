import Head from 'next/head'
import Link from 'next/link'


export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-fuchsia-400">
      <Head>
        <title>Bubblegum - reusable React form components to chew on</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center bg-gradient-to-r from-pink-300 via-pink-200 to-purple-200">
        <h1 className="text-6xl font-bold">Bubblegum</h1>

        <p className="mt-3 text-2xl">Reusable react form components (wip 🏗️)</p>

        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          
          <Link href="/quiz1/pg1">
            <a className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600">
              <h3 className="text-2xl font-bold">Multiple choice &rarr;</h3>
              <p className="mt-4 text-xl">Radios and checkboxes live here.</p>
            </a>
          </Link>
            
          <Link href="/quiz1/pg2">
            <a className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600">
              <h3 className="text-2xl font-bold">Lists &rarr;</h3>
              <p className="mt-4 text-xl">You'll find dropdowns and comboboxes here.</p>
            </a>
          </Link>

          <Link href="/quiz1/pg3">
            <a className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600">
              <h3 className="text-2xl font-bold">Buttons &rarr;</h3>
              <p className="mt-4 text-xl">Things you press go here.</p>
            </a>
          </Link>  

          <Link href="/quiz1/pg4">
            <a className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600">
              <h3 className="text-2xl font-bold">Text Input &rarr;</h3>
              <p className="mt-4 text-xl">Single and multi-line text inputs</p>
            </a>
          </Link>  

        </div>
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t bg-fuchsia-300">
          Powered by 🍬
      </footer>
    </div>
  )
}
