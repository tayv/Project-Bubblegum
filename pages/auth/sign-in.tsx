import { SignIn } from "@clerk/nextjs"
import LayoutContainerSide from '@components/layout/LayoutContainerSide'
import Breadcrumbs from '@components/layout/Breadcrumbs'
import Heading from '@components/layout/Heading'
import Paragraph from '@components/layout/Paragraph'

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

      <SignIn path="/auth/sign-in" routing="path" />

    </LayoutContainerSide>

  </>
  
  )

export default SignInPage;