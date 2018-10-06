import { EVENT_FETCHED, EVENT_CREATE_SUCCESS } from '../actions/events'

export default (state = {}, action = {}) => {
    switch (action.type) {
        case EVENT_FETCHED:
          return {...action.event}
        
        case EVENT_CREATE_SUCCESS:
          return { ...action.event }

        default:
          return state
      }
}
