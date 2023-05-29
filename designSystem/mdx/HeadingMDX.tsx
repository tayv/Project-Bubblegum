import Heading from "@designSystem/atoms/Heading"
import React from "react"

const HeadingMDX = {
 // H1: ({ children }) => <h1 className="text-2xl font-bold">{children}</h1>,
 // H2: ({ children }) => <h2 className="text-xl font-bold">{children}</h2>,
 H1: ({ children }: { children?: React.ReactNode }) => <Heading size="h1">{children}</Heading>,
 H2: ({ children }: { children?: React.ReactNode }) => <Heading size="h2">{children}</Heading>,
}

export default HeadingMDX