import request from 'superagent'
import { baseUrl } from '../constants'

export const EVENTS_FETCHED = 'EVENTS_FETCHED'
export const EVENT_CREATE_SUCCESS = 'EVENT_CREATE_SUCCESS'
export const EVENT_FETCHED = 'EVENT_FETCHED'
export const EVENT_DELETE_SUCCESS = 'EVENT_DELETE_SUCCESS'

const eventsFetched = events => ({
  type: EVENTS_FETCHED,
  ...events
})

const eventFetched = event => ({
  type: EVENT_FETCHED,
  event
})

const eventCreateSuccess = event => ({
  type: EVENT_CREATE_SUCCESS,
  event
})

const eventDeleteSuccess = event => ({
  type: EVENT_DELETE_SUCCESS,
  event
})

export const loadEvents = () => (dispatch, getState) => {
  if (getState().events.length > 0) return
  request(`${baseUrl}/events`)
    .then(response => {
      dispatch(eventsFetched(response.body))
    })
    .catch(console.error)
}

export const loadEvent = (eventId) => (dispatch, getState) => {
  
  if(Object.keys(getState().event).length > 0 && eventId === getState().event.id) return 
    request
      .get(`${baseUrl}/events/${eventId}`)
      .then(response => {
        dispatch(eventFetched(response.body))
      })
      .catch(console.error)
  
}

export const createEvent = (data) => dispatch => {
  // const jwt = getState().currentUser.jwt
    // .set('Authorization', `Bearer ${jwt}`)
  request
    .post(`${baseUrl}/events`)
    .send(data)
    .then(response => {
      dispatch(eventCreateSuccess(response.body))
    })
    .catch(console.error)
}

export const deleteEvent = id => dispatch => {
  console.log(id)
  // request
  //   .del(`${baseUrl}/events/${getState().event.id}`)
  //   .then(response => {
  //     dispatch(eventDeleteSuccess(response.body))
  //   })
  //   .catch(console.error)
}