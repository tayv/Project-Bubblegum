"use client"

import { FC } from "react"
import { usePathname } from "next/navigation"
import classNames from "classnames"
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs"
import Link from "next/link"
import NavHorizontal from "./NavHorizontal"
import { ArrowLeftCircle, Frame, LogIn } from "lucide-react"
import { Divider } from "@uiRepo/components"

// TYPES ---
type NavSideBarStyle = "selected" | "notSelected"
type ArticleList = { title: string; path?: string; groupTitle?: boolean }[] // This is the list of articles that will be displayed in the side nav
export type NavSideBarProps = { articleList: ArticleList }

// HELPERS ---
const isLargeScreen = typeof window !== "undefined" && window.innerWidth >= 1024 // Used by Clerk UserButton to only show name on large screens. 1024px is Tailwind's lg breakpoint

// MAIN FUNCTION ---
const NavSideBar: FC<NavSideBarProps> = ({ articleList, ...props }) => {
  const pathname = usePathname()

  // The styles for the side nav are set here
  const sideNavStyleMap: { [key in NavSideBarStyle]: string } = {
    notSelected: "text-base text-gray-900 hover:text-gray-600",
    selected:
      "cursor-default text-base text-pink-500 border-l-2 border-pink-500",
  }

  return (
    <>
      <nav
        id="appMainNav"
        className="
        fixed z-10 top-0 left-0 
        flex flex-row justify-between px-3 py-1 sm:px-8
        backdrop-blur-sm bg-white/60 w-screen drop-shadow
        lg:relative lg:z-auto lg:top-auto lg:left-auto lg:flex lg:flex-col lg:justify-start lg:w-52 lg:m-2 lg:px-4 lg:pt-3 lg:bg-transparent lg:drop-shadow-none
        "
        aria-label="Navigation"
      >
        <div className="flex flex-row justify-between w-full py-2 lg:flex-col lg:gap-3">
          {/* Give user a clearern way back on mobile. In future this will be dynamic as more pages added */}
          {pathname !== "/" ? (
            <Link href="/" className="flex flex-row gap-2 items-center ">
              <ArrowLeftCircle />
              <span className="lg:ml-0 text-xl whitespace-nowrap">Home</span>
            </Link>
          ) : (
            <Link href="/" className="flex flex-row gap-2 items-center ">
              <Frame />
              <span className="lg:ml-0 text-xl whitespace-nowrap">
                Brand Name
              </span>
            </Link>
          )}

          <div className="flex flex-row gap-2 items-center lg:items-start">
            {/* <LogIn className="hidden lg:block" />
            <span className="lg:ml-0 text-xl whitespace-nowrap">Sign In</span> */}

            <SignedIn>
              {/* Mount the UserButton component */}
              <span className="lg:ml-0 text-xl whitespace-nowrap">
                <UserButton
                  afterSignOutUrl="/"
                  userProfileMode="modal"
                  showName={isLargeScreen}
                  appearance={{
                    elements: {
                      userButtonBox: "lg:flex-row-reverse",
                      userButtonOuterIdentifier: "hidden md:block",
                    },
                  }}
                />
              </span>
            </SignedIn>
            <SignedOut>
              {/* Signed out users get sign in button */}
              <div className="flex flex-row gap-2 items-center text-xl whitespace-nowrap">
                <LogIn className="hidden lg:block" />
                <SignInButton
                  mode="modal"
                  redirectUrl={pathname ? pathname : undefined}
                />
              </div>
            </SignedOut>
          </div>

          {/* span needed here because custom classes get set to a child div in Divider so it remains in the DOM */}
          <span className="hidden lg:block">
            <Divider />
          </span>
        </div>

        {/* --------Laptop screen and above -------- */}
        <div
          aria-label="Sub Menu"
          className="hidden lg:flex lg:flex-row lg:flex-nowrap lg:overflow-x-scroll lg:px-1"
        >
          <ul className="grow space-y-1 ">
            {
              // The side nav is made up of these list items
              articleList.map((article) => {
                // Used by classnames to set the correct css style
                // let isSelected: SideNavStyle =
                // asPath === article.path ? "selected" : "notSelected"

                return (
                  <li key={article.title.toString()}>
                    {
                      !article.groupTitle ? (
                        <a
                          href={article.path}
                          className={classNames([
                            "cursor-pointer flex items-center p-1", // standard css styles go here
                            // sideNavStyleMap[isSelected],
                          ])}
                        >
                          <span className="flex-1 ml-1 text-normal ">
                            {article.title}
                          </span>
                        </a>
                      ) : (
                        <span className="flex-1 uppercase text-xs opacity-50 ">
                          {article.title}
                        </span>
                      ) // Group title styling
                    }
                  </li>
                )
              })
            }
          </ul>
        </div>
      </nav>

      {/* --------Mobile and tablet screens -------- */}
      {/* <NavHorizontal LinkList={articleList} /> */}
    </>
  )
}

export default NavSideBar
