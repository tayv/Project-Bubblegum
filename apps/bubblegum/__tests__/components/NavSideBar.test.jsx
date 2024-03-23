import React from "react"
import { render, RenderResult } from "@testing-library/react"
import NavSideBar from "../../app/components/templates/NavSideBar"

describe("NavSideBar component", () => {
  const sampleArticleList = [
    { title: "Article 1", path: "/article-1" },
    { title: "Article 2", path: "/article-2" },
  ]

  const renderComponent = (props) => {
    const defaultProps = {
      articleList: sampleArticleList,
      ...props,
    }

    return render(<NavSideBar {...defaultProps} />)
  }

  it("renders without errors", () => {
    renderComponent()
  })
})
