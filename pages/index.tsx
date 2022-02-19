import Head from 'next/head'
import Link from 'next/link'


export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">Welcome 👋</h1>

        <p className="mt-3 text-2xl">This is a test project</p>

        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          
          <Link href="/quiz1/pg1">
            <a className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600">
              <h3 className="text-2xl font-bold">Quiz Template #1&rarr;</h3>
              <p className="mt-4 text-xl">Try the first quiz!</p>
            </a>
          </Link>
            
          <Link href="/quiz1/pg2">
            <a className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600">
              <h3 className="text-2xl font-bold">Quiz Template #2&rarr;</h3>
              <p className="mt-4 text-xl">Try the second quiz!</p>
            </a>
          </Link>

          <Link href="/quiz1/pg3">
            <a className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600">
              <h3 className="text-2xl font-bold">Quiz Template #3&rarr;</h3>
              <p className="mt-4 text-xl">Try the third quiz!</p>
            </a>
          </Link>  

          <Link href="/quiz1/pg4">
            <a className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600">
              <h3 className="text-2xl font-bold">Quiz Template #4&rarr;</h3>
              <p className="mt-4 text-xl">Try the fourth quiz!</p>
            </a>
          </Link>  

        </div>
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
          Powered by ❤️
      </footer>
    </div>
  )
}
