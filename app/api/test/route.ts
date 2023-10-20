// File path: /app/api/test.ts
import { NextResponse, NextRequest } from "next/server"

export function GET(_: NextRequest) {
  return NextResponse.json({ message: "Test successful" })
}
