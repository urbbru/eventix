import * as React from 'react'
import {connect} from 'react-redux'
import {loadEvent} from '../../actions/events'
import {deleteTicket} from '../../actions/tickets'
import Event from './Event'
import { Spin, message } from 'antd'

class EventsContainer extends React.PureComponent {
  componentDidMount() {
    this.props.loadEvent(this.props.match.params.id)
  }

  componentDidUpdate() {
    const actions = this.props.actions
    if(actions.event) {message.success('Successfully created new event!'); actions.event = null}
    if(actions.eventUpdate) {message.success('Successfully updated event!'); actions.eventUpdate = null}
    if(actions.ticketDelete) {
      this.props.loadEvent(this.props.match.params.id)
      message.success('Ticket deleted')
      this.props.actions.ticketDelete = null
    }
  }
  
  render() {
    if(Object.keys(this.props.event).length === 0 || !this.props.event.hasOwnProperty("tickets")) return (<div className="example"><Spin /></div>)
    return <Event event={this.props.event} authenticated={this.props.authenticated} currentUser={this.props.currentUser} deleteTicket={this.props.deleteTicket}/>
  }
}

const mapStateToProps = state => ({
  authenticated: state.currentUser !== null,
  currentUser: state.currentUser,
  event: state.event,
  actions: state.actions
})

export default connect(mapStateToProps, {loadEvent, deleteTicket})(EventsContainer)

