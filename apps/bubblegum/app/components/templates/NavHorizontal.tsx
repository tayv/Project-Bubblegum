"use client"

import { FC } from "react"
import classNames from "classnames"
import Link from "next/link"

type LinkListType = { title: string; path?: string; groupTitle?: boolean }[] // This is the list of articles that will be displayed in the side nav
type NavHorizontalProps = { LinkList: LinkListType }

const NavHorizontal: FC<NavHorizontalProps> = ({ LinkList, ...props }) => {
  // const { asPath } = useRouter() // This hook returns the current url path

  return (
    <>
      {/* --------Mobile and tablet screens -------- */}
      <nav
        aria-label="Sub Menu"
        className="lg:hidden flex flex-row flex-nowrap pt-1 pb-2 px-2 overflow-x-scroll text-sm bg-neutral-100"
      >
        <ul className="grow space-y-1 flex flex-row place-items-center ">
          {
            // The side nav is made up of these list items
            LinkList.map((item) => {
              // Used by classnames to set the correct css style
              // let isSelected: SideNavStyle =
              // asPath === article.path ? "selected" : "notSelected"

              return (
                <li key={item.title.toString()}>
                  {
                    !item.groupTitle ? (
                      <a
                        href={item.path}
                        className={classNames([
                          "cursor-pointer flex items-center p-1", // standard css styles go here
                          // sideNavStyleMap[isSelected],
                        ])}
                      >
                        <span className="flex-1 ml-2 whitespace-nowrap">
                          {item.title}
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

export default NavHorizontal
