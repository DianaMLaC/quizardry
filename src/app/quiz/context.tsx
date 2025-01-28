"use client"
import { createContext, useContext, useState } from "react"
import { AnswersAPI, QuestionAPI, QuizContextType, QuizProviderProps, Result } from "./types"

export default function QuizProvider({ children }: QuizProviderProps) {
  const [questions, setQuestions] = useState<QuestionAPI[] | null>(null)
  const [quizResults, setQuizResults] = useState<Result[] | null>(null)

  const extractCorrectAnswer = (question: QuestionAPI) => {
    for (const [key, value] of Object.entries(question.correct_answers)) {
      if (value === "true") {
        const answerKey = key.split("_correct")[0]
        return question.answers[answerKey] || ""
      }
    }
    return ""
  }

  const updateResults = (question: QuestionAPI, answerSelected: AnswersAPI) => {
    if (!question.correct_answers || !question.answers) {
      console.error("Invalid question data")
      return
    }
    console.log("in context updateResults")

    let passed = false
    let correctAnswer = ""
    const { key, value } = answerSelected

    const selectedAnswerKey = `${key}_correct`
    const isCorrect = question.correct_answers[selectedAnswerKey]

    if (isCorrect === "true") {
      passed = true
    } else {
      correctAnswer = extractCorrectAnswer(question)
    }

    const result: Result = {
      questionData: question,
      passed,
      selectedAnswer: value as string,
      correctAnswer,
    }
    console.log(result)

    setQuizResults((prevResults) => {
      const updatedResults = prevResults || []
      return [...updatedResults, result]
    })
    console.log(`Answer ${answerSelected} is ${passed ? "correct" : "incorrect"}`)
  }
  console.log("quiz context rerender")

  return (
    <QuizContext.Provider
      value={{ questions, setQuestions, updateResults: updateResults, quizResults }}
    >
      {children}
    </QuizContext.Provider>
  )
}

const QuizContext = createContext<QuizContextType | null>(null)

export function useQuiz() {
  const context = useContext(QuizContext)

  if (!context) {
    throw new Error("useQuiz must be used within a QuizProvider")
  }
  return context
}
