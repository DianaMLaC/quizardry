import { Question } from "../app/quiz/types"

export const fetchedQuestions = [
  {
    id: 1,
    question: "How to delete a directory in Linux?",
    description: "delete folder",
    answers: {
      answer_a: "ls",
      answer_b: "delete",
      answer_c: "remove",
      answer_d: "rmdir",
      answer_e: null,
      answer_f: null,
    },
    multiple_correct_answers: "false",
    correct_answers: {
      answer_a_correct: "false",
      answer_b_correct: "false",
      answer_c_correct: "false",
      answer_d_correct: "true",
      answer_e_correct: "false",
      answer_f_correct: "false",
    },
    explanation: "rmdir deletes an empty directory",
    tip: null,
    tags: [],
    category: "linux",
    difficulty: "Easy",
  },
]

export const questions: Question[] = [
  {
    id: "1qa",
    q: "Identify the best phrase that defines OOP",
    answers: [
      {
        id: "1",
        a: "OOP is an approach to solving problems by grouping data.",
        correct: false,
      },
      {
        id: "2",
        a: "OOP is an approach to solving problems by creating interfaces with object models.",
        correct: true,
      },
      {
        id: "3",
        a: "OOP is an approach to solving problems by breaking down the problem into smaller problems.",
        correct: false,
      },
      {
        id: "4",
        a: "OOP is a design principle for modeling objects.",
        correct: false,
      },
    ],
  },
  {
    id: "2qa",
    q: "Given the following problem scenario, decide whether OOP is a good way to approach the problem. I want to sum up all the elements in an array. Should I use OOP to solve this problem?",
    answers: [
      {
        id: "5",
        a: "Yes",
        correct: false,
      },
      {
        id: "6",
        a: "No",
        correct: true,
      },
      {
        id: "7",
        a: "Maybe",
        correct: false,
      },
      {
        id: "8",
        a: "I don't know",
        correct: false,
      },
    ],
  },
  {
    id: "3qa",
    q: "Given the following problem scenario, decide whether OOP is a good way to approach the problem. I want to create a game of Rock, Paper, Scissors. Should I use OOP to solve this problem?",
    answers: [
      {
        id: "9",
        a: "Yes",
        correct: false,
      },
      {
        id: "10",
        a: "No",
        correct: false,
      },
      {
        id: "11",
        a: "Maybe",
        correct: true,
      },
      {
        id: "12",
        a: "I don't know",
        correct: false,
      },
    ],
  },
  {
    id: "4qa",
    q: "Given the following problem scenario, decide whether OOP is a good way to approach the problem. I want to calculate an estimate of how much air circulation a house with 4 people living inside of it needs. Should I use OOP to solve this problem?",
    answers: [
      {
        id: "15",
        a: "Yes",
        correct: true,
      },
      {
        id: "16",
        a: "No",
        correct: false,
      },
      {
        id: "17",
        a: "Maybe",
        correct: false,
      },
      {
        id: "18",
        a: "I don't know",
        correct: false,
      },
    ],
  },
]
