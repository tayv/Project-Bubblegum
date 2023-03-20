import { SignIn } from "@clerk/nextjs"
import LayoutContainerSide from '@components/layout/LayoutContainerSide'
import Breadcrumbs from '@components/layout/Breadcrumbs'
import Heading from '@components/layout/Heading'
import Paragraph from '@components/layout/Paragraph'
import Section from "@components/layout/Section"

// data for Breadcrumbs
const crumbs = [
  {
    text: "Home", 
    path: "/",
    currentPg: false,
  }, {
    text: "Sign In", 
    path: "/",
    currentPg: true,
  }
]

const SignInPage = () => (
  <>
    <LayoutContainerSide>
      <Breadcrumbs crumbs={crumbs} />
      <Heading size="h1">Authentication</Heading>
      <Paragraph>On this page you'll find Clerk's Sign In components.</Paragraph>
      <Section id="sign-in-test" style="blank">
        <SignIn />
      </Section>
    </LayoutContainerSide>

  </>
  
  )

export default SignInPage;