import { EVENTS_FETCHED, EVENT_CREATE_SUCCESS } from '../actions/events'

export default (state = [], action = {}) => {
      switch (action.type) {
          case EVENTS_FETCHED:
            return [...action.events]

          case EVENT_CREATE_SUCCESS:
            return [...action.event]

          default:
            return state
        }
  }
  