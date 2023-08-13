"use client"

import { FC } from "react"
import classNames from "classnames"
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs"
import { LogIn } from "lucide-react"
import Link from "next/link"
import NavHorizontal from "./NavHorizontal"

type NavSideBarStyle = "selected" | "notSelected"
type ArticleList = { title: string; path?: string; groupTitle?: boolean }[] // This is the list of articles that will be displayed in the side nav
export type NavSideBarProps = { articleList: ArticleList }

const NavSideBar: FC<NavSideBarProps> = ({ articleList, ...props }) => {
  // const { asPath } = useRouter() // This hook returns the current url path

  // The styles for the side nav are set here
  const sideNavStyleMap: { [key in NavSideBarStyle]: string } = {
    notSelected: "text-base text-gray-900 hover:text-gray-600",
    selected:
      "cursor-default text-base text-pink-500 border-l-2 border-pink-500",
  }

  return (
    <>
      <nav
        className="
        sticky z-10 top-0 flex flex-row justify-between px-2 py-1 
        backdrop-blur-sm 
        lg:flex-col lg:justify-start lg:w-52 lg:m-4 lg:px-4 lg:pt-3 
        "
        aria-label="Navigation"
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
                          <span className="flex-1 ml-2">{article.title}</span>
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
