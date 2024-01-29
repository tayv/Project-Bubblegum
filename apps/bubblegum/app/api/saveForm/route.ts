import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function POST(request: Request) {
  // For testing. Replace with webhook that fetches userId from Clerk
  const testUserId = "user_" + Math.floor(Math.random() * 1000000)
  // const testUserId = "user_360376"

  // Get the form data
  let body
  try {
    body = await request.json()
  } catch (err) {
    console.error("Error fetching or parsing request body", err)
    return NextResponse.json({
      error: "Error fetching or parsing request body",
      success: false,
    })
  }

  // Use prisma's upsert to check if user exists and update their entry to add new document
  try {
    const userEntry = await prisma.user.upsert({
      where: { userId: testUserId },
      // If user exists add the new document data
      update: {
        docData: {
          create: {
            status: "DRAFT",
            product: {
              connect: {
                productId: "PRODUCT1",
              },
            },
            docName: body.textExample,
            formData: body,
          },
        },
      },

      // If user doesn't exist, create new user + add their license and document info
      // In future consider moving license creation into separate endpoint
      create: {
        userId: testUserId,
        license: {
          create: {
            licenseType: "FREE",
            licenseDuration: "ONE_YEAR",
            licenseStart: new Date(),
            licenseExpire: new Date("3000-01-01T00:00:00Z"),
          },
        },

        // Create the user's docData entry
        docData: {
          create: {
            status: "DRAFT",
            product: {
              connect: {
                productId: "PRODUCT1",
              },
            },
            docName: body.textExample,
            formData: body,
          },
        },
      },
    })

    return NextResponse.json(userEntry)
  } catch (error) {
    if (error instanceof Error) {
      console.error("[Error][POST User and/or Document Creation]", {
        errorMessage: error.message,
        // requestBody: body,
        generatedUserId: testUserId,
      })
    } else {
      console.error("Unknown error. Please contact support.", error)
    }

    return NextResponse.json({
      error:
        "Error occurred while creating a user. Please try again or contact support.",
      success: false,
    })
  }
}
