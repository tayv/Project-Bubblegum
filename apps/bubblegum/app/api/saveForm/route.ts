import { PrismaClient, Prisma } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function POST(request: Request) {
  // For testing. Replace with webhook that fetches userId from Clerk
  // const testUserId = "user_" + Math.floor(Math.random() * 1000000)

  // Get the form data
  let body: { userId: string | undefined; [key: string]: any } = {
    userId: undefined,
  }
  // const testUserId = body.userId
  try {
    body = await request.json()
  } catch (err) {
    console.error("Error fetching or parsing request body", err)
    return NextResponse.json({
      error: "Error fetching or parsing request body",
      success: false,
    })
  }

  // Prisma's upsert handles logic for both creation and update of records based on unique identifier. Don't need if/else.
  try {
    const userEntry = await prisma.user.upsert({
      where: { userId: body.userId },
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
        userId: body.userId,
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
      console.error(
        "[Error][POST User and/or Document Creation]",
        {
          errorMessage: error.message,
          requestBody: body,
          // generatedUserId: testUserId,
        },
        { status: 400 }
      )
    } // Generic catch for any PrismaClientKnownRequestError
    else if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        {
          error: `A database error occurred: ${error.message}`,
          success: false,
        },
        { status: 400 }
      )
    } else {
      console.error("Unknown error. Please contact support.", error)
      return NextResponse.json(
        {
          error:
            "Unknown error while creating a user. Please try again or contact support.",
          success: false,
        },
        { status: 400 }
      )
    }
  }
}
