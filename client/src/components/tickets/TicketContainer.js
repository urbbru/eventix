import * as React from 'react'
import {connect} from 'react-redux'
import {loadTicket, loadAllTicketsOfUser, createComment} from '../../actions/tickets'
import {loadEvent} from '../../actions/events'
import Ticket from './Ticket'

class TicketContainer extends React.PureComponent {
  componentDidMount() {
    this.props.loadTicket(this.props.match.params.id)
  }

  componentDidUpdate() {
    if(Object.keys(this.props.tickets).length === 0 || this.props.ticket.user.id !== this.props.tickets.id) this.props.loadAllTicketsOfUser(this.props.ticket.user.id)
    if(Object.keys(this.props.event).length === 0 || this.props.ticket.event.id !== this.props.event.id) this.props.loadEvent(this.props.ticket.event.id)
  }
  
  render() {
    if(Object.keys(this.props.ticket).length === 0) return '..Loading'
    return <Ticket event={this.props.event} ticket={this.props.ticket} tickets={this.props.tickets} createComment={this.props.createComment} authenticated={this.props.authenticated}/>
  }
}

const mapStateToProps = state => ({
  authenticated: state.currentUser !== null,
  event: state.event,
  tickets: state.tickets,
  ticket: state.ticket
})

export default connect(mapStateToProps, {loadTicket, loadAllTicketsOfUser, createComment, loadEvent})(TicketContainer)

