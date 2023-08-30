// import "./globals.css" // These styles apply to every route in the application
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Document Builder Demo",
  description: "Welcome to the demo app. It's built with Next.js App Router.",
}

export default function RootLayout({
  // Layouts must accept a children prop which will be populated with nested layouts or page content
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="w-max-screen-lg">{children}</div>
}
