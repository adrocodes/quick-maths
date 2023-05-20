import './style.css'
import screenManager from './screen-manager'
import { getStarted } from './screens/get-started'

getStarted((questions) => {
  console.log(questions)
})
