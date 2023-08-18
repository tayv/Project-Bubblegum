import "./globals.css" // These styles apply to every route in the application
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
      <body className="bg-neutral-100 overscroll-none">
        {/* Need separate div so don't conflict with child flex items */}
        <div className="flex justify-center items-center h-screen">
          {/* use lg:flex-row because want the nav to move to the side on laptops and above */}
          <div className="flex flex-col lg:flex-row h-screen">
            {/* <div className="flex flex-1 overflow-hidden"> */}
            <NavSideBar
              articleList={[
                { title: "Products", groupTitle: true },
                { title: "Product 1 (MDX)", path: "/product1" },
                { title: "Product 2 (PDF)", path: "/product2" },
                { title: "Placeholder", path: "/" },
                { title: "Placeholder", path: "/" },
                { title: "Placeholder", path: "/" },
                { title: "Placeholder", path: "/" },
              ]}
            />
            <main className="w-full lg:max-w-full overflow-y-scroll pt-1">
              <div className="block px-6 py-3">{children}</div>
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}
