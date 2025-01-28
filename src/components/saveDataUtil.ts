import fs from "fs"
import path from "path"
import { QuestionAPI, Category, Tag } from "../app/quiz/types"

function saveDataToFile(data, filename: string) {
  const filePath = path.join(process.cwd(), "data", `${filename}.json`)
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8")
    console.log(`Data saved to ${filePath}`)
  } catch (error) {
    console.error("Error saving data to file:", error)
  }
}

export function saveRandomQuiz(data: QuestionAPI): void {
  saveDataToFile(data, "randomQuiz")
}

export function saveCategories(data: Category[]): void {
  saveDataToFile(data, "categories")
}

export function saveTags(data: Tag[]): void {
  saveDataToFile(data, "tags")
}
