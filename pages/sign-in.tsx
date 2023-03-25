import LayoutContainerSide from 'designSystem/layout/LayoutContainerSide'
import Breadcrumbs from 'designSystem/layout/Breadcrumbs'
import Heading from 'designSystem/layout/Heading'
import Paragraph from 'designSystem/layout/Paragraph'
import Section from "designSystem/layout/Section"
import { SignIn } from '@clerk/nextjs'

// data for Breadcrumbs
const crumbs = [
  {
    text: "Home", 
    path: "/",
    currentPg: false,
  }, {
    text: "Test Document Builder", 
    path: "/",
    currentPg: true,
  }
]

const SignInPage = () => (
  <>
    <LayoutContainerSide>
      <Breadcrumbs crumbs={crumbs} />
      <Heading size="h1">Sign In Page</Heading>
      <Paragraph>You need to sign in before viewing this page.</Paragraph>
      <Section id="sign-in" style="standard">
        <SignIn />
      </Section>
    </LayoutContainerSide>

  </>
  
  )

export default SignInPage

// Set up redirects for Clerk Auth (https://dashboard.clerk.com/) on the dashboard in Develoers > Paths > Sign-In