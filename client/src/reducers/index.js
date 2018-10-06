import { combineReducers } from 'redux'
import events from './events'
import event from './event'
import allUserTickets from './tickets'
import ticket from './ticket'
import actions from './actions'
import currentUser from './currentUser'

export default combineReducers({
  events,
  event,
  allUserTickets,
  ticket,
  actions,
  currentUser
})
