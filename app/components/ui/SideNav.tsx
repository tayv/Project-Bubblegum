"use client"

import { FC } from "react"
import classNames from "classnames"
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs"
import { LogIn } from "lucide-react"
import Link from "next/link"

type SideNavStyle = "selected" | "notSelected"
type ArticleList = { title: string; path?: string; groupTitle?: boolean }[] // This is the list of articles that will be displayed in the side nav
export type SideNavProps = { articleList: ArticleList }

const SideNav: FC<SideNavProps> = ({ articleList, ...props }) => {
  // const { asPath } = useRouter() // This hook returns the current url path

  // The styles for the side nav are set here
  const sideNavStyleMap: { [key in SideNavStyle]: string } = {
    notSelected: "text-base text-gray-900 hover:text-gray-600",
    selected:
      "cursor-default text-base text-pink-500 border-l-2 border-pink-500",
  }

  return (
    <>
      <nav
        className="
        flex flex-row justify-between px-2 py-1 
        lg:flex-col lg:justify-start lg:w-64 lg:m-4 lg:px-4 lg:pt-3 lg:rounded-3xl lg:bg-sky-200 lg:drop-shadow-sm lg:border lg:border-white/60"
        aria-label="Home and Account"
      >
        <div>
          <Link
            href="/"
            className={classNames(
              "flex items-center p-1 text-base font-semibold text-gray-900 hover:text-gray-600 "
            )}
          >
            <span className="flex-1 ml-3 text-xl whitespace-nowrap">
              🏠 Home
            </span>
          </Link>
        </div>
        <div>
          <Link
            href="/"
            className={classNames(
              "flex items-center p-1 text-base font-semibold text-gray-900 hover:text-gray-600 "
            )}
          >
            <span className="flex-1 ml-3 text-xl whitespace-nowrap">
              👤 Account
            </span>
          </Link>
        </div>

        {/* --------Laptop screen and above -------- */}
        <div
          aria-label="Sub Menu"
          className="hidden lg:flex lg:flex-row lg:flex-nowrap lg:overflow-x-scroll lg:py-2 lg:px-1"
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
                          <span className="flex-1 ml-2 whitespace-nowrap">
                            {article.title}
                          </span>
                        </a>
                      ) : (
                        <span className="flex-1 whitespace-nowrap uppercase text-xs opacity-50 ">
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
      <nav
        aria-label="Sub Menu"
        className="lg:hidden flex flex-row flex-nowrap pt-1 pb-2 px-2 overflow-x-scroll text-sm bg-neutral-100"
      >
        <ul className="grow space-y-1 flex flex-row place-items-center ">
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
                        <span className="flex-1 ml-2 whitespace-nowrap">
                          {article.title}
                        </span>
                      </a>
                    ) : null // Group title styling
                  }
                </li>
              )
            })
          }
        </ul>
      </nav>
    </>
  )
}

export default SideNav
