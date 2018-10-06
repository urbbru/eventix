import * as React from 'react'
import {connect} from 'react-redux'
import {loadTicket, loadAllTicketsOfUser, createComment} from '../../actions/tickets'
import {loadEvent} from '../../actions/events'
import Ticket from './Ticket'
import { Spin, message } from 'antd'

class TicketContainer extends React.PureComponent {
  componentDidMount() {
    this.props.loadTicket(this.props.match.params.id)
  }

  componentDidUpdate() {
    if(Object.keys(this.props.allUserTickets).length === 0 || this.props.ticket.user.id !== this.props.allUserTickets.id) this.props.loadAllTicketsOfUser(this.props.ticket.user.id)
    if(Object.keys(this.props.event).length === 0 || (this.props.ticket.event && this.props.ticket.event.id !== this.props.event.id)) this.props.loadEvent(this.props.ticket.event.id)
    if(!this.props.ticket.comments) this.props.loadTicket(this.props.match.params.id)
      
    const actions = this.props.actions
      if(actions.ticket) {message.success('Successfully created new ticket!'); actions.ticket = null}
      if(actions.ticketUpdate) {message.success('Successfully updated ticket!'); actions.ticketUpdate = null}
  }
  
  render() {
    if(Object.keys(this.props.ticket).length === 0 || !this.props.ticket.hasOwnProperty("comments")) return (<div className="example"><Spin /></div>)
    return <Ticket currentUser={this.props.currentUser} event={this.props.event} ticket={this.props.ticket} allUserTickets={this.props.allUserTickets} createComment={this.props.createComment} authenticated={this.props.authenticated}/>
  }
}

const mapStateToProps = state => ({
  authenticated: state.currentUser !== null,
  currentUser: state.currentUser,
  event: state.event,
  allUserTickets: state.allUserTickets,
  ticket: state.ticket,
  actions: state.actions
})

export default connect(mapStateToProps, {loadTicket, loadAllTicketsOfUser, createComment, loadEvent})(TicketContainer)

