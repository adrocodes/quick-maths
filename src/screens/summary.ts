import screenManager from "../screen-manager";

function summaryScreen() {
  let answers: [number, boolean][] = [];
  const correct = document.getElementById('correct') as HTMLSpanElement;
  const attempted = document.getElementById('attempted') as HTMLSpanElement;
  const accuracy = document.getElementById('accuracy') as HTMLSpanElement;
  const restart = document.getElementById('restart') as HTMLButtonElement;
  const getStartedForm = document.getElementById('get-started') as HTMLFormElement;

  restart.addEventListener('click', () => {
    answers = []
    getStartedForm.reset()
    screenManager.show('0')
  })

  return {
    setAnswers: function(newAnswers: [number, boolean][]) {
      answers = newAnswers;
    },
    populateStats: function() {
      attempted.textContent = answers.length.toString();
      const correctAnswers = answers.filter(([_, isCorrect]) => isCorrect);
      correct.textContent = correctAnswers.length.toString();
      accuracy.textContent = `${Math.round((correctAnswers.length / answers.length) * 100)}%`;
    }
  }
}

export default summaryScreen()
