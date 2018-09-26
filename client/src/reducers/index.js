import { combineReducers } from 'redux'
import events from './events'
import event from './event'
import ticket from './tickets'
import currentUser from './currentUser'

export default combineReducers({
  events,
  event,
  ticket,
  currentUser
})
