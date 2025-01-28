export interface QuizProviderProps {
  children: React.ReactNode
}

export interface QuizContextType {
  questions: QuestionAPI[] | null
  quizResults: Result[] | null
  setQuestions: React.Dispatch<React.SetStateAction<QuestionAPI[] | null>>
  updateResults: (question: QuestionAPI, answerSelected: AnswersAPI) => void
}

export interface QuestionAPI {
  id: number
  question: string
  description: string
  answers: AnswersAPI
  multiple_correct_answers: string //boolean
  correct_answers: AnswersAPI
  correct_answer: string | null
  explanation: string // might be null?
  tip: string | null
  tags: Tag[]
  category: string
  difficulty: string
}

export interface AnswersAPI {
  [key: string]: string | null
}

export interface Category {
  id: number
  name: string
}

export interface Tag {
  id: number
  name: string
}

export interface Option {
  value: string
  label: string
}

export interface Difficulty {
  value: string
  label: string
}

export interface Result {
  questionData: QuestionAPI
  passed: boolean
  selectedAnswer: string
  correctAnswer: string
}
