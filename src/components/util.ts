export async function fetchRandomQuiz() {
  try {
    const response = await fetch("/api/third-party") // Calls our API route
    if (!response.ok) throw new Error("Failed to fetch random quiz")

    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function fetchQuizWithParams(
  category: string | null,
  difficulty: string | null,
  limit: number
) {
  const params = new URLSearchParams()
  if (category) params.append("category", category)
  if (difficulty) params.append("difficulty", difficulty)
  if (limit) params.append("limit", limit.toString())

  try {
    const response = await fetch(`/api/third-party?${params.toString()}`) // Calls our API route
    if (!response.ok) throw new Error("Failed to fetch quiz with parameters")

    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
    return null
  }
}
