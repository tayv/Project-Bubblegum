import { PrismaClient } from "@prisma/client"
import { NextResponse, NextRequest } from "next/server"

// const prisma = new PrismaClient()
const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  console.log("[GET User's docData] Start")
  // Extract query params so we can dynamically receive userId
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")

  // Validate the userId
  if (!userId) {
    return NextResponse.json({
      error: "UserId is missing from the request.",
      success: false,
    })
  }

  try {
    // Fetch docData for the given userId
    const userEntry = await prisma.user.findUnique({
      where: { userId: userId.toString() },
      select: {
        docData: true,
      },
    })

    // Check if userEntry exists and has docData
    if (!userEntry || !userEntry.docData) {
      return NextResponse.json({
        error: "No docData found for the provided userId.",
        success: false,
      })
    }
    // Return the data if everything worked
    return NextResponse.json(userEntry.docData)
  } catch (error) {
    if (error instanceof Error) {
      console.error("[Error][GET User's docData]", {
        errorMessage: error.message,
        userId,
      })
    } else {
      console.error(
        "Unknown error fetching user's docData. Please contact support.",
        error
      )
    }

    return NextResponse.json({
      error:
        "Error occurred while fetching the user's docData. Please try again or contact support.",
      success: false,
    })
  }
}
