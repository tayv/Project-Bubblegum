import "@styles/globals.css" // These styles apply to every route in the application
import { Metadata } from "next"
import NavSideBar from "./components/ui/NavSideBar"

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
      <body className="bg-neutral-100 overscroll-none max-w-screen">
        {/* Need separate div so don't conflict with child flex items */}
        <div className="flex justify-center items-center h-screen">
          {/* use lg:flex-row because want the nav to move to the side on laptops and above */}
          <div className="flex flex-col lg:flex-row h-screen">
            {/* <div className="flex flex-1 overflow-hidden"> */}
            <NavSideBar
              // NOTE: These titles must be unique to avoid react list key error
              articleList={[
                { title: "Products", groupTitle: true },
                { title: "Product Demo (PDF Builder)", path: "/product2" },
                { title: "Placeholder A", path: "/" },
                { title: "Placeholder B", path: "/" },
                { title: "Placeholder C", path: "/" },
                { title: "Placeholder D", path: "/" },
              ]}
            />
            {/* Only mobile styles need more top padding to offset fixed header */}
            <main className="w-full max-w-screen pt-16 pb-32 lg:px-6 lg:py-3 lg:pt-2">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}
