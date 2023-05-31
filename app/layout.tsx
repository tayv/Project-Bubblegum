import "./globals.css" // These styles apply to every route in the application
import { Metadata } from 'next'
import SideNav from "./components/ui/SideNav"
 
export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Bubblegum',
}

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
       <div className="flex flex-col h-screen bg-zinc-100">
       <div className="flex flex-1 overflow-hidden">
       <SideNav
          articleList={[
            { title: "Testing", groupTitle: true },
            { title: "Test Form", path: "/testForms/test-form" },
            { title: "Test Markdown", path: "/mdx/test-markdown" },
            {
              title: "🧰 Test Document Builder",
              path: "/restricted/test-document-builder",
            },
            { title: "Products", groupTitle: true },
            { title: "Product 1", path: "/product1" },
          ]}
        />
        <main className="w-full overflow-y-scroll pt-1">
          <div className="block px-6 py-3">{children}</div>
        </main>
       </div>
       </div>
      </body>
    </html>

  )
}

