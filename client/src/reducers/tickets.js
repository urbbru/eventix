import { TICKETS_FETCHED } from '../actions/tickets'

export default (state = {}, action = {}) => {
      switch (action.type) {
          case TICKETS_FETCHED:
            return {...action.tickets}

          default:
            return state
        }
  }
  