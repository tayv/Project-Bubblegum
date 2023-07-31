import "./globals.css" // These styles apply to every route in the application
import { Metadata } from "next"
import SideNav from "./components/ui/SideNav"

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to Bubblegum",
}

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-neutral-100">
        {/* use lg:flex-row because want the nav to move to the side on laptops and above */}
        <div className="flex flex-col lg:flex-row h-screen">
          {/* <div className="flex flex-1 overflow-hidden"> */}
          <SideNav
            articleList={[
              { title: "Testing", groupTitle: true },
              { title: "Products", groupTitle: true },
              { title: "Product 1 (MDX)", path: "/product1" },
              { title: "Product 2 (PDF)", path: "/product2" },
              { title: "Placeholder", path: "/" },
              { title: "Placeholder", path: "/" },
              { title: "Placeholder", path: "/" },
              { title: "Placeholder", path: "/" },
            ]}
          />
          <main className="w-full overflow-y-scroll pt-1">
            {/* Placeholder for progress bar */}
            <div className="flex flex-row w-full bg-sky-300 h-2 shadow" />

            <div className="block px-6 py-3">{children}</div>
          </main>
          <div className="flex flex-col px-4 py-2 bg-white">
            <button className="max-w-xs bg-sky-500 rounded-xl sticky bottom-0 py-2 ">
              ↩️ Reset Form
            </button>
          </div>
        </div>
        {/* </div> */}
      </body>
    </html>
  )
}
