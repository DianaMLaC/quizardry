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

interface AppMetadata {
  provider: string
  providers: string[]
}

interface UserMetadata {
  avatar_url: string
  email: string
  email_verified: boolean
  full_name: string
  iss: string
  name: string
  phone_verified: boolean
  picture: string
  provider_id: string
  sub: string
}

interface IdentityData {
  avatar_url: string
  email: string
  email_verified: boolean
  full_name: string
  iss: string
  name: string
  phone_verified: boolean
  picture: string
  provider_id: string
  sub: string
}

interface Identity {
  identity_id: string
  id: string
  user_id: string
  identity_data: IdentityData
  provider: string
  last_sign_in_at: string
  created_at: string
  updated_at: string
  email: string
}

export interface User {
  id: string
  aud: string
  role: string
  email: string
  email_confirmed_at: string
  phone: string
  confirmed_at: string
  last_sign_in_at: string
  app_metadata: AppMetadata
  user_metadata: UserMetadata
  identities: Identity[]
  created_at: string
  updated_at: string
  is_anonymous: boolean
}
