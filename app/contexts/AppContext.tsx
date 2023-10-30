"use client"
import { UserDocData } from "@prisma/client"
import React, { createContext, useState, ReactNode, FC } from "react"

export type UserDataTypes = {
  document: UserDocData
  userDocData: UserDocData[]
  currentDoc: UserDataTypes["document"]
}

export type AppContextProps = {
  userDocData: UserDataTypes["userDocData"] | null
  setUserDocData: React.Dispatch<
    React.SetStateAction<AppContextProps["userDocData"]>
  >
  currentDoc: UserDataTypes["currentDoc"] | null
  setCurrentDoc: React.Dispatch<
    React.SetStateAction<AppContextProps["currentDoc"]>
  >
}

type AppProviderProps = {
  children: ReactNode
}

// 1. Create context for global values needed across pages
export const AppContext = createContext<AppContextProps | undefined>(undefined)

// Use the Provider in product pages
export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  // 1. Setup universal state

  const [userDocData, setUserDocData] =
    useState<AppContextProps["userDocData"]>(null)
  const [currentDoc, setCurrentDoc] =
    useState<AppContextProps["currentDoc"]>(null)

  // 2. Pass state values and methods to the context provider
  return (
    <AppContext.Provider
      value={{ userDocData, setUserDocData, currentDoc, setCurrentDoc }}
    >
      {children}
    </AppContext.Provider>
  )
}
