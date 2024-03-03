import { render, screen, fireEvent } from "@testing-library/react"
import Breadcrumbs from "@molecules/Breadcrumbs"
import Link from "next/link"
import { RouterContext } from "next/dist/shared/lib/router-context"
import "@testing-library/jest-dom"

jest.mock("next/link", () => {
  const MockLink = ({ children, href }) => {
    return <a href={href}>{children}</a>
  }
  MockLink.displayName = "Link"
  return MockLink
})

const mockRouterPush = jest.fn()

const crumbs = [
  {
    text: "Home",
    path: "/",
  },
  {
    text: "Parent",
    path: "/parent",
  },
  {
    text: "Current",
    path: "/current",
  },
]

describe("Breadcrumbs", () => {
  beforeEach(() => {
    render(
      <RouterContext.Provider
        value={{
          push: mockRouterPush,
          pathname: "/",
          replace: jest.fn(),
          prefetch: jest.fn(),
        }}
      >
        <Breadcrumbs crumbs={crumbs} />
      </RouterContext.Provider>
    )
  })

  it("renders correctly with provided crumbs", () => {
    expect(screen.getByText("Home")).toBeInTheDocument()
    expect(screen.getByText("Parent")).toBeInTheDocument()
    expect(screen.getByText("Current")).toBeInTheDocument()
  })

  it("Home is a link and clicking on it works", () => {
    const homeElement = screen.getByText("Home")
    fireEvent.click(homeElement)
    expect(homeElement.tagName.toLowerCase()).toBe("a")
  })

  it("Current text is not a link", () => {
    const currentElement = screen.getByText("Current")
    expect(currentElement.tagName.toLowerCase()).not.toBe("a") // check that it's not a <a> tag
  })
})
