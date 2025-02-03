"use client"
import styles from "./quiz.module.css"
import { useEffect, useState } from "react"
import Select, { SingleValue } from "react-select"
import { Category, Option, Difficulty } from "./types"
import categoriesData from "../../components/data/categories.json"
import Link from "next/link"
import customSelectStyles from "../../components/customStyles"
import { useQuiz } from "./context"
import { fetchQuizWithParams, fetchRandomQuiz } from "../../components/util"
import { useAuth } from "../auth /useAuth"

export default function Quiz() {
  const { user } = useAuth()
  const categories: Category[] = categoriesData as Category[]
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null)
  const [toggleFilter, setToggleFilter] = useState(false)
  const { setQuestions, questions } = useQuiz()
  const [firstQuestionId, setFirstQuestionId] = useState<number | null>(null)

  const questionId = questions && questions[0].id

  useEffect(() => {
    setFirstQuestionId(questionId)
  }, [questionId])

  // Map categories for React Select
  const categoryOptions: Option[] = categories.map((category) => ({
    value: category.name,
    label: category.name,
  }))

  // Map difficulty options for React Select
  const difficultyOptions: Difficulty[] = [
    { value: "easy", label: "Easy" },
    { value: "medium", label: "Medium" },
    { value: "hard", label: "Hard" },
  ]

  const handleFetchQuizWithParams = async (e: React.FormEvent) => {
    e.preventDefault()
    //check and test edge cases (chose to have either categories, or tags?)

    const limitInput = (document.getElementById("number-select") as HTMLInputElement).value
    const limit = parseInt(limitInput, 10) || 20

    const customQuiz = await fetchQuizWithParams(selectedCategory, selectedDifficulty, limit)
    console.log(customQuiz)

    if (customQuiz) {
      setQuestions(customQuiz)
    }
  }

  const handleFetchRandomQuiz = async () => {
    const randomQuiz = await fetchRandomQuiz()
    if (randomQuiz) {
      setQuestions(randomQuiz)
    }
    console.log(randomQuiz)
  }

  return (
    <div className={styles.quizBox}>
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>Welcome</h1>
        {user && <span>{user.email}</span>}
      </header>
      <div className={styles.quizOptions}>
        <div className={styles.randomQuizBox}>
          <p className={styles.quizSelectionQ}>Would you like to take a random quiz?</p>
          <div
            className={styles.quizSelectionA}
            onClick={() => {
              handleFetchRandomQuiz()
            }}
          >
            Generate Random Quiz
          </div>
        </div>
        <div className={styles.tailoredQuizBox}>
          <p className={styles.quizSelectionQ}>Or would you like to create your own?</p>
          <div
            className={styles.quizSelectionA}
            onClick={() => {
              setToggleFilter((prevToggleFilter) => !prevToggleFilter)
            }}
          >
            Create Quiz
          </div>
        </div>
        {toggleFilter && (
          <form
            className={styles.quizForm}
            onSubmit={(e) => {
              handleFetchQuizWithParams(e)
            }}
          >
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Category</label>
              <Select
                // className={styles.select}
                styles={customSelectStyles}
                options={categoryOptions}
                onChange={(option: SingleValue<Option>) =>
                  setSelectedCategory(option?.value || null)
                }
                placeholder="Select a category"
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Difficulty</label>
              <Select
                styles={customSelectStyles}
                options={difficultyOptions}
                onChange={(option: SingleValue<{ value: string; label: string }>) =>
                  setSelectedDifficulty(option?.value || null)
                }
                placeholder="Select difficulty"
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Limit</label>
              <input
                className={styles.numberInput}
                id="number-select"
                type="number"
                min="1"
                max="20"
              />
            </div>
            <button className={styles.submitButton} type="submit">
              Generate Quiz
            </button>
          </form>
        )}
      </div>
      {firstQuestionId && (
        <div className={styles.quizStartButton}>
          <Link href={`/quiz/questions/${firstQuestionId}`}>
            <button className={styles.startButton}>Start Quiz</button>
          </Link>
        </div>
      )}
    </div>
  )
}
