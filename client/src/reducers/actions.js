import { USER_SIGNUP_SUCCESS, USER_SIGNUP_FAILED, USER_LOGIN_FAILED } from '../actions/users'
import { TICKET_CREATE_SUCCESS, TICKET_UPDATE_SUCCESS, TICKET_DELETE_SUCCESS } from '../actions/tickets'
import { EVENT_CREATE_SUCCESS, EVENT_UPDATE_SUCCESS, EVENT_DELETE_SUCCESS } from '../actions/events'

export default (state = {}, action = {}) => {
    switch (action.type) {
        case USER_LOGIN_FAILED:
          return {...state, loginError: action.payload }

        case USER_SIGNUP_SUCCESS:
          return {...state, signup: true }
        
        case USER_SIGNUP_FAILED:
          return {...state, signupError: {...action.error} }
        
        case EVENT_CREATE_SUCCESS:
          return {...state, event: true }

        case EVENT_UPDATE_SUCCESS:
          return {...state, eventUpdate: true }
        
        case EVENT_DELETE_SUCCESS:
          return {...state, eventDelete: true }
        
        case TICKET_CREATE_SUCCESS:
          return {...state, ticket: true }

        case TICKET_UPDATE_SUCCESS:
          return {...state, ticketUpdate: true }
        
        case TICKET_DELETE_SUCCESS:
          return {...state, ticketDelete: true }

        default:
          return state
      }
}
