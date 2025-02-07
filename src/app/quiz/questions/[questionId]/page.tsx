"use client"

import { use } from "react"
import styles from "./question.module.css"
import { AnswersAPI } from "../../types"
import { useQuiz } from "../../context"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function QuestionSlug({ params }: { params: Promise<{ questionId: string }> }) {
  const { questionId } = use(params)
  const { updateResults, questions } = useQuiz()
  const router = useRouter()

  // Get the current question based on questionId
  const question = questions && questions.find((q) => q.id === parseInt(questionId, 10))

  // Get the current question's index based on questionId
  const questionIndex = questions && questions.findIndex((q) => q.id === parseInt(questionId, 10))

  if (!question) {
    return <div>No question found</div>
  }

  const nextQuestion = (): string | undefined => {
    if (questions && questionIndex !== null && questionIndex !== undefined) {
      if (questionIndex === -1 || questionIndex === questions.length - 1) {
        console.log("in next question qIdx", questionIndex)

        return `/quiz/results`
      }
      const nextId = questions[questionIndex + 1].id
      console.log("in next question nextId", nextId)

      return `/quiz/questions/${nextId}`
    }
    return
  }

  const handleSubmit = (answerSelected: AnswersAPI) => {
    const link = nextQuestion()
    console.log("link in handle submit", link)

    updateResults(question, answerSelected)
    if (link) {
      router.push(link)
    }
  }

  const renderAnswers = (answers: AnswersAPI) => {
    return (
      Object.entries(answers)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(([_, value]) => value !== null)
        .map(([key, value]) => (
          <Link key={key} href={nextQuestion() || ""}>
            <div className={styles.answer} onClick={() => handleSubmit({ key, value })}>
              <p>{value}</p>
            </div>
          </Link>
        ))
    )
  }

  return (
    <div className={styles.questionBox}>
      <header className={styles.header}>
        <h3 className={styles.headerTitle}>{question.question}</h3>
        <p className={styles.description}>{question.description}</p>
      </header>
      <div className={styles.answersBox}>{renderAnswers(question.answers)}</div>
      <div className={styles.infoBox}>
        <div>
          <span className={styles.infoLabel}>Category: </span>
          <span className={styles.infoValue}>{question.category}</span>
        </div>
        <div>
          <span className={styles.infoLabel}>Difficulty: </span>
          <span className={styles.infoValue}>{question.difficulty}</span>
        </div>
      </div>
    </div>
  )
}
