import request from 'superagent'
import { baseUrl } from '../constants'
import { logout } from './users'
import { isExpired } from '../jwt'

export const TICKETS_FETCHED = 'TICKETS_FETCHED'
export const TICKET_FETCHED = 'TICKET_FETCHED'
export const TICKET_CREATE_SUCCESS = 'TICKET_CREATE_SUCCESS'
export const TICKET_UPDATE_SUCCESS = 'TICKET_UPDATE_SUCCESS'
export const TICKET_DELETE_SUCCESS = 'TICKET_DELETE_SUCCESS'

const ticketsFetched = tickets => ({
  type: TICKETS_FETCHED,
  tickets
})

const ticketFetched = ticket => ({
  type: TICKET_FETCHED,
  ticket
})

const ticketCreateSuccess = ticket => ({
  type: TICKET_CREATE_SUCCESS,
  ticket
})

const ticketUpdateSuccess = () => ({
  type: TICKET_UPDATE_SUCCESS
})

const ticketDeleteSuccess = () => ({
  type: TICKET_DELETE_SUCCESS
})

export const loadTicket = (ticketId) => dispatch => {
  request
    .get(`${baseUrl}/tickets/${ticketId}`)
    .then(response => {
      dispatch(ticketFetched(response.body))
    })
    .catch(console.error)
}

export const loadAllTicketsOfUser = (userId) => dispatch => {
  request
    .get(`${baseUrl}/users/${userId}/tickets`)
    .then(response => {
      dispatch(ticketsFetched(response.body))
    })
    .catch(console.error)
}

export const createTicket = (data, eventId) => (dispatch, getState) => {
  const jwt = getState().currentUser.jwt
  
  request
    .post(`${baseUrl}/events/${eventId}/tickets`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(data)
    .then(response => {
      dispatch(ticketCreateSuccess(response.body))
    })
    .catch(console.error)
}

export const createComment = (data, ticketId) => (getState) => {
  const jwt = getState().currentUser.jwt

  request
    .post(`${baseUrl}/tickets/${ticketId}/comments`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(data)
    .catch(console.error)
}

export const updateTicket = (ticket, ticketId) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .put(`${baseUrl}/tickets/${ticketId}`)
    .set('Authorization', `Bearer ${jwt}`)
    .send(ticket)
    .then(_ => dispatch(ticketUpdateSuccess()))
    .catch(err => console.error(err))
}

export const deleteTicket = id => dispatch => {
  request
    .del(`${baseUrl}/tickets/${id}`)
    .then(_ => dispatch(ticketDeleteSuccess()))
    .catch(console.error)
}