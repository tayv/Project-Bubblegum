import { authMiddleware } from "@clerk/nextjs"

// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring middleware
export default authMiddleware({
  // "/" will be accessible to all users
  publicRoutes: [
    "/",
    "/product2",
    "/signin",
    "/api/saveForm",
    "/api/getUserData",
  ],
})

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}
