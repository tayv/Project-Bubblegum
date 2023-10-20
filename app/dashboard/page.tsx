"use client"
import { useEffect, useState } from "react"
import LayoutContainer from "@ui/LayoutContainer"
import Heading from "@ui/Heading"
import Paragraph from "@ui/Paragraph"
import { Wand } from "lucide-react"
import ButtonCTA from "@components/form/ButtonCTA"

// FETCH USERS DOCUMENT DATA
const userId = "user_22665"
async function getUserData() {
  const res = await fetch(
    `http://localhost:3000/api/getUserData?userId=${userId}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  )

  if (!res.ok) {
    throw new Error("Failed to fetch user data on the Dashboard")
  }

  const data = await res.json()
  console.log("GET REQUEST WORKED:", data)
  return data
}

export default function Dashboard() {
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    // Fetch user data when component mounts
    async function fetchData() {
      try {
        const data = await getUserData()
        setUserData(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])
  return (
    <>
      <Heading
        size="h1"
        weight="bold"
        padding="standard"
        className="text-center"
      >
        Hello 👋
      </Heading>
      <Paragraph
        size="xxxlarge"
        textAlign="center"
        padding="large"
        space="snug"
      >
        Pick a product below and get started for free. No credit card required!
      </Paragraph>
      <LayoutContainer
        variant="flex"
        direction="col"
        alignY="center"
        alignX="center"
      >
        <ButtonCTA
          variant="secondary"
          type="button"
          onClick={getUserData}
          buttonText="Fetch User Data"
        />
        {/* <button type="button" onClick={getUserData}>
          Fetch User Data
        </button> */}
      </LayoutContainer>
    </>
  )
}
