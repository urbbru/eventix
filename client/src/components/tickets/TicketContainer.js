import * as React from 'react'
import {connect} from 'react-redux'
import {loadTicket} from '../../actions/tickets'
import Ticket from './Ticket'

class TicketContainer extends React.PureComponent {
  componentDidMount() {
    this.props.loadTicket(this.props.match.params.id)
  }
  
  render() {
    if(Object.keys(this.props.ticket).length === 0) return '..Loading'
    return <Ticket ticket={this.props.ticket} authenticated={this.props.authenticated}/>
  }
}

const mapStateToProps = state => ({
  authenticated: state.currentUser !== null,
  ticket: state.ticket
})

export default connect(mapStateToProps, {loadTicket})(TicketContainer)

