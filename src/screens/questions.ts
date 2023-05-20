import screenManager from "../screen-manager";
import { Question } from "./types";

export const questionsScreen = () => {
  const number = document.getElementById('number') as HTMLSpanElement;
  const operation = document.getElementById('operation') as HTMLSpanElement;
  const table = document.getElementById('table') as HTMLSpanElement;
  const answerForm = document.getElementById('answer-form') as HTMLFormElement;
  const answer = document.getElementById('answer') as HTMLInputElement;
  const processInner = document.getElementById('timer-progress-inner') as HTMLDivElement;

  const totalTimeMs = 1.5 * 60 * 1000;

  return {
    init: function(questions: Question[]) {
      const answers: [number, boolean][] = [];
      let currentQuestionIndex = 0;
      let startTime = Date.now();
      let renderProgressTimeout: number;

      const renderQuestion = () => {
        const question = questions[currentQuestionIndex % questions.length];
        number.textContent = question[0].toString();
        operation.textContent = question[2];
        table.textContent = question[1].toString();
        answer.value = '';
        answer.focus()
      }

      const renderProgress = () => {
        const elapsedTimeMs = Date.now() - startTime;
        const remainingTimeMs = totalTimeMs - elapsedTimeMs;
        const percentage = (remainingTimeMs / totalTimeMs) * 100;

        processInner.style.setProperty('--progress', `${Math.min(100 - percentage, 100)}%`)
      }

      answerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const questionAnswer = questions[currentQuestionIndex % questions.length][3];
        const actualAnswer = Number(answer.value);
        answers.push([actualAnswer, questionAnswer === actualAnswer])
        currentQuestionIndex++;

        renderQuestion();
      });

      const onSpacePressed = (e: KeyboardEvent) => {
        if (e.key === " ") {
          e.preventDefault()
          answerForm.requestSubmit()
        }
      }

      answer.addEventListener("keydown", onSpacePressed)

      renderQuestion();
      renderProgressTimeout = setInterval(renderProgress, 100);

      setTimeout(() => {
        clearInterval(renderProgressTimeout);
        answer.removeEventListener("keydown", onSpacePressed)

        console.log(answers);

        console.log("Total", answers.length)
        console.log("Correct", answers.filter(a => a[1]).length)
        screenManager.show('2')
      }, totalTimeMs)
    }
  }
}
