import { combineReducers } from 'redux'
import events from './events'
import event from './event'
import tickets from './tickets'
import ticket from './ticket'
import currentUser from './currentUser'

export default combineReducers({
  events,
  event,
  tickets,
  ticket,
  currentUser
})
