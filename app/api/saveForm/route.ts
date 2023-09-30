import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function POST(request: Request) {
  // For testing. Replace with webhook that fetches userId from Clerk
  const testUserId = "user_" + Math.floor(Math.random() * 1000000)

  // Get the data
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

  // Create new User entry in database
  // TODO Check if user already exists
  try {
    const newUserEntry = await prisma.user.create({
      data: {
        userId: testUserId,
        license: {
          create: {
            licenseType: "FREE",
            licenseDuration: "ONE_YEAR",
            licenseStart: new Date(),
            licenseExpire: new Date("3000-01-01T00:00:00Z"),
          },
        },

        // Create the UserDocData entry for this User
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

    // const newEntry = await prisma.userDocData.create({
    //   data: {
    //     status: "DRAFT",
    //     product: {
    //       connect: {
    //         productId: "PRODUCT1",
    //       },
    //     },
    //     user: {
    //       connect: {
    //         userId: "user_123",
    //       },
    //     },
    //     docName: body.textExample,
    //     formData: body,
    //   },
    // })

    return NextResponse.json(newUserEntry)
  } catch (error) {
    if (error instanceof Error) {
      console.error("[Error][POST User Creation]", {
        errorMessage: error.message,
        requestBody: body,
        generatedUserId: testUserId,
      })
    } else {
      console.error("Unknown error:", error)
    }

    return NextResponse.json({
      error: "Error occurred while creating a user.",
      success: false,
    })
  }
}
