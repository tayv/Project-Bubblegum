import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const newEntry = await prisma.inquiry.create({
      data: {
        name: "This is a hardcoded test string. Need to update schema to capture form input data",
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

// Page router API endpoint:
// export default async function handler(req: any, res: any) {
//   if (req.method === "POST") {
//     return await createInquiry(req, res)
//   } else {
//     return res
//       .status(405)
//       .json({ message: "Method not allowed", success: false })
//   }
// }

// async function createInquiry(req: any, res: any) {
//   const body = req.body
//   try {
//     const newEntry = await prisma.inquiry.create({
//       data: {
//         name: "This is a hardcoded test string. Need to update schema to capture form input data",
//         formData: body,
//       },
//     })
//     return res.status(200).json(newEntry, { success: true })
//   } catch (error) {
//     console.error("Request error", error)
//     res
//       .status(500)
//       .json({ error: "AAAHHHHHH...error creating question", success: false })
//   }
// }
