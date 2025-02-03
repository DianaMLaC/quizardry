// /app/questions/results.tsx
"use client"

import { useQuiz } from "../context"
import styles from "./results.module.css"

export default function Results() {
  const { quizResults } = useQuiz()

  if (!quizResults || quizResults.length === 0) {
    return <div>No results available.</div>
  }

  const score = Math.round(
    (quizResults.filter((result) => result.passed).length / quizResults.length) * 100
  )

  console.log(quizResults)

  return (
    <div className={styles.resultsBox}>
      <header className={styles.header}>
        <h3 className={styles.headerTitle}>Your Quiz Results</h3>
        <p>Score: {score}%</p>
      </header>

      <ul className={styles.qAndABox}>
        {quizResults.map((result, index) => (
          <li key={index}>
            <div className={styles.question}>
              <div>{result.questionData.question}</div>
            </div>
            <div className={styles.userAnswersBox}>
              <div className={styles.userAnswer}>
                <div className={styles.userAnswerLabel}>
                  Your Answer: {result.passed ? "Correct" : "Incorrect"}
                </div>
                <div className={styles.answerValue}>{result.selectedAnswer} </div>
              </div>
              {!result.passed && (
                <div className={styles.correctAnswer}>
                  <div className={styles.correctAnswerLabel}>Correct Answer:</div>
                  <div className={styles.answerValue}>{result.correctAnswer} </div>
                </div>
              )}
              <div className={styles.explanation}>{result.questionData.explanation}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
