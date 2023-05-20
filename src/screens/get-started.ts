import type { Question, Operation } from "./types"

const operations = ["addition", "subtraction", "multiplication", "division"] as const
const tables = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"] as const

type OnSubmit = (questions: Question[]) => void

const operationToSymbol: Record<typeof operations[number], Operation> = {
  addition: "+",
  subtraction: "-",
  multiplication: "*",
  division: "/",
}

const tableToNumber: Record<typeof tables[number], number> = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
  eleven: 11,
  twelve: 12,
}

const calculateAnswer = (num1: number, num2: number, op: Operation) => {
  switch (op) {
    case "+":
      return num1 + num2
    case "-":
      return num1 - num2
    case "*":
      return num1 * num2
    case "/":
      return num1 / num2
  }
}

export function getStartedScreen(onSubmit: OnSubmit) {
  const form = document.getElementById("get-started") as HTMLFormElement

  form.addEventListener("submit", (e) => {
    e.preventDefault()
    const formData = new FormData(form)
    const data = Object.fromEntries(formData.entries())

    const operationChoices: Operation[] = []
    const tableChoices: number[] = []

    Object.keys(data).forEach((key) => {
      if (operations.includes(key as any)) {
        operationChoices.push(operationToSymbol[key as typeof operations[number]])
      }

      if (tables.includes(key as any)) {
        tableChoices.push(tableToNumber[key as typeof tables[number]])
      }
    })

    if (operationChoices.length === 0) {
      alert("Please select at least one operation")
      return
    }

    if (tableChoices.length === 0) {
      alert("Please select at least one table")
      return
    }

    const questions: Question[] = []

    for (let i = 0; i < 500; i++) {
      const op = operationChoices[Math.floor(Math.random() * operationChoices.length)]
      const table = tableChoices[Math.floor(Math.random() * tableChoices.length)]
      const number = Math.floor(Math.random() * 12) + 1
      const answer = calculateAnswer(number, table, op)

      questions.push([number, table, op, answer])
    }

    onSubmit(questions)
  })
}
