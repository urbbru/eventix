import request from 'superagent'
import { baseUrl } from '../constants'
import { logout } from './users'
import { isExpired } from '../jwt'

export const EVENTS_FETCHED = 'EVENTS_FETCHED'
export const EVENT_CREATE_SUCCESS = 'EVENT_CREATE_SUCCESS'
export const EVENT_UPDATE_SUCCESS = 'EVENT_UPDATE_SUCCESS'
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

const eventUpdateSuccess = event => ({
  type: EVENT_UPDATE_SUCCESS,
  event
})

const eventDeleteSuccess = () => ({
  type: EVENT_DELETE_SUCCESS
})

export const loadEvents = (skip, take) => (dispatch) => {
  // if (getState().events.length > 0) return
  if(skip === undefined && take === undefined) {
    request(`${baseUrl}/events`)
      .then(response => {
        dispatch(eventsFetched(response.body))
      })
      .catch(console.error)
  } else {
    request(`${baseUrl}/events`)
      .query({ skip, take })
      .then(response => {
        dispatch(eventsFetched(response.body))
      })
      .catch(console.error)
  }
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

export const createEvent = (data) => (dispatch, getState) => {
  const jwt = getState().currentUser.jwt
  const event = {
      name: data.name,
      description: data.description,
      picture: data.picture,
      price: data.price,
      startDate: data.dates[0], 
      endDate: data.dates[1]
  }

  request
    .post(`${baseUrl}/events`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(event)
    .then(response => {
      dispatch(eventCreateSuccess(response.body))
    })
    .catch(console.error)
}

export const updateEvent = (data, eventId) => (dispatch, getState) => {
  const jwt = getState().currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  const event = {
    name: data.name,
    description: data.description,
    picture: data.picture,
    price: data.price,
    startDate: data.dates[0], 
    endDate: data.dates[1]
  }

  request
    .put(`${baseUrl}/events/${eventId}`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(event)
    .then(_ => dispatch(eventUpdateSuccess()))
    .catch(err => console.error(err))
}

export const deleteEvent = id => dispatch => {
  request
    .del(`${baseUrl}/events/${id}`)
    .then(response => {
      dispatch(eventDeleteSuccess(response.body))
    })
    .catch(console.error)
}