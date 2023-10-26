import { PrismaClient } from "@prisma/client"
import { NextResponse, NextRequest } from "next/server"

// const prisma = new PrismaClient()
const prisma = new PrismaClient()

export async function DELETE(request: NextRequest) {
  // Extract query params so we can dynamically receive userId
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")
  const productId = searchParams.get("productId")
  const docId = searchParams.get("docId")

  // Validate the required params
  if (!userId) {
    return NextResponse.json({
      error: "UserId is missing from the request.",
      success: false,
    })
  }

  if (!productId) {
    return NextResponse.json({
      error: "productId is missing from the request.",
      success: false,
    })
  }

  if (!docId) {
    return NextResponse.json({
      error: "docId is missing from the request.",
      success: false,
    })
  }

  try {
    // Find and delete the specific docData entry for the provided userId and docId
    const deletedEntry = await prisma.userDocData.deleteMany({
      where: {
        userId: userId.toString(),
        docId: parseInt(docId, 10),
      },
    })

    // If no records were deleted, it means the entry was not found
    if (deletedEntry.count === 0) {
      return NextResponse.json({
        error:
          "No matching docData entry found for the provided userId and docId.",
        success: false,
      })
    }

    // Return a confirmation if the deletion was successful
    return NextResponse.json({
      message: "Successfully deleted the docData entry.",
      success: true,
    })
  } catch (error) {
    if (error instanceof Error) {
      console.error("[Error][DELETE User's docData]", {
        errorMessage: error.message,
        userId,
        docId,
      })
    } else {
      console.error(
        "Unknown error deleting user's docData. Please contact support.",
        error
      )
    }

    return NextResponse.json({
      error:
        "Error occurred while deleting the user's docData. Please try again or contact support.",
      success: false,
    })
  }
}
