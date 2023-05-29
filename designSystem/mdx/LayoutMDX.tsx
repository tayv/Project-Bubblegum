import { MDXProvider } from '@mdx-js/react'
import HeadingMDX from '@designSystem/mdx/HeadingMDX'
import ParaMDX from '@designSystem/mdx/ParaMDX'
import Head from "next/head"
import LayoutContainerSide from "@designSystem/layouts/LayoutContainerSide"
import Breadcrumbs from "@molecules/Breadcrumbs"

interface LayoutProps {
  children: React.ReactNode;
  meta: {title: string}
  crumbs: []
}

const components = {
  h1: HeadingMDX.H1,
  h2: HeadingMDX.H2,
  p: ParaMDX,
}

function LayoutMDX ({children, ...props}: LayoutProps) {
  return (
    <MDXProvider components={components}>
      <Head>
        <title>{props.meta.title}</title>
        <meta name="description" content={props.meta.title} />
      </Head>
     
     <LayoutContainerSide>
      <Breadcrumbs crumbs={props.crumbs} />
      {children}
     </LayoutContainerSide>
 
    
    </MDXProvider>
  )
}

export default LayoutMDX