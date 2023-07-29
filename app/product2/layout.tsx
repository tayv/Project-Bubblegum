// import "./globals.css" // These styles apply to every route in the application
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Product PDF Builder Demo",
  description: "Welcome to Bubblegum",
}

export default function RootLayout({
  // Layouts must accept a children prop which will be populated with nested layouts or page content
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
