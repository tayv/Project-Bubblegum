"use client"
import { UserDocData } from "@prisma/client"
import React, { createContext, useState, ReactNode, FC } from "react"

export type AppContextProps = {
  userDocData: UserDocData | null // TODO: Add types for docData shape as it should be standardized
  setUserDocData: React.Dispatch<
    React.SetStateAction<AppContextProps["userDocData"]>
  >
  selectedDoc: { productId: string; docId: string } | null
  setSelectedDoc: React.Dispatch<
    React.SetStateAction<AppContextProps["selectedDoc"]>
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
  const [selectedDoc, setSelectedDoc] =
    useState<AppContextProps["selectedDoc"]>(null)

  // 2. Pass state values and methods to the context provider
  return (
    <AppContext.Provider
      value={{ userDocData, setUserDocData, selectedDoc, setSelectedDoc }}
    >
      {children}
    </AppContext.Provider>
  )
}
