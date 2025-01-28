import { NextResponse } from "next/server"

const API_KEY = process.env.QUIZ_API_KEY
const API_URL = "https://quizapi.io/api/v1/questions"

export async function GET(req: Request) {
  if (!API_KEY) {
    return NextResponse.json({ error: "API Key is not defined" }, { status: 500 })
  }

  // Extract query parameters from the request URL
  const { searchParams } = new URL(req.url)
  const category = searchParams.get("category")
  const difficulty = searchParams.get("difficulty")
  const limit = searchParams.get("limit")

  // Build query string for the external API
  const params = new URLSearchParams()
  if (category) params.append("category", category)
  if (difficulty) params.append("difficulty", difficulty)
  if (limit) params.append("limit", limit)

  try {
    const response = await fetch(`${API_URL}?${params.toString()}`, {
      headers: { "X-Api-Key": API_KEY },
    })

    if (!response.ok) throw new Error("Failed to fetch quiz data")

    const data = await response.json()
    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to fetch quiz data" }, { status: 500 })
  }
}
