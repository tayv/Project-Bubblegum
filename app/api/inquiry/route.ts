import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const newEntry = await prisma.docData.create({
      data: {
        status: "DRAFT",
        product: {
          connect: {
            id: 1,
          },
        },
        user: {
          connect: {
            userId: 1,
          },
        },
        docName: body.textExample,
        formData: body,
      },
    })

    return NextResponse.json(newEntry)
  } catch (error) {
    console.error("Request error", error)
    return NextResponse.json({
      error: "AAAHHHHHH...error creating question",
      success: false,
    })
  }
}
