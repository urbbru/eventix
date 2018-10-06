import { TICKET_FETCHED, TICKET_CREATE_SUCCESS } from '../actions/tickets'

export default (state = {}, action = {}) => {
      switch (action.type) {
          case TICKET_FETCHED:
            return { ...action.ticket }

          case TICKET_CREATE_SUCCESS:
            return { ...action.ticket }

          default:
            return state
        }
  }
  