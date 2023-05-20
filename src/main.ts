import './style.css'
import screenManager from './screen-manager'
import { getStartedScreen } from './screens/get-started'
import { questionsScreen } from './screens/questions'

getStartedScreen((questions) => {
  let screen = questionsScreen()
  screenManager.show('1')
  screen.init(questions)
})
