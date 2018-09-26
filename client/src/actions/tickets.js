import request from 'superagent'
import { baseUrl } from '../constants'

export const TICKET_FETCHED = 'TICKET_FETCHED'
export const TICKET_CREATE_SUCCESS = 'TICKET_CREATE_SUCCESS'
export const TICKET_DELETE_SUCCESS = 'TICKET_DELETE_SUCCESS'

const ticketFetched = ticket => ({
  type: TICKET_FETCHED,
  ticket
})

const ticketCreateSuccess = ticket => ({
  type: TICKET_CREATE_SUCCESS,
  ticket
})

const ticketDeleteSuccess = ticket => ({
  type: TICKET_DELETE_SUCCESS,
  ticket
})

export const loadTicket = (ticketId) => dispatch => {
  request
    .get(`${baseUrl}/tickets/${ticketId}`)
    .then(response => {
      dispatch(ticketFetched(response.body))
    })
    .catch(console.error)
}

export const createTicket = (data) => dispatch => {
  request
    .post(`${baseUrl}/tickets`)
    .send(data)
    .then(response => {
      dispatch(ticketCreateSuccess(response.body))
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