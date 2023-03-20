import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn, SignIn } from '@clerk/nextjs'
import { useRouter } from 'next/router'

//  For Clerk Auth: List pages you want to be publicly accessible, or leave empty if every page requires authentication. Use this naming strategy:
  //   "/"              for pages/index.js
  //   "/foo"           for pages/foo/index.js
  //   "/foo/bar"       for pages/foo/bar.js
  //   "/foo/[...bar]"  for pages/foo/[...bar].js
const publicPages = ["/", "/sign-up/[[...index]]"]

function MyApp({ Component, pageProps }: AppProps) {

    // Get the pathname for Auth
    const { pathname } = useRouter()

     // Check if the current route matches a public page or if it starts with the restricted folder
     const isPublicPage = publicPages.includes(pathname) || pathname.startsWith("/restricted")
  
    // If the current route is listed as public, render it directly. Otherwise, use Clerk to require authentication

  return (
    <ClerkProvider {...pageProps}>
      { isPublicPage ? (
        <Component {...pageProps} />
      ) : ( 
        <>
          <SignedIn>
            <Component {...pageProps} />
          </SignedIn>
          <SignedOut>
            <SignIn />
          </SignedOut>
        </>
      ) }
    </ClerkProvider>
  )
}

export default MyApp
