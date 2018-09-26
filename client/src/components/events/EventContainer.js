import * as React from 'react'
import {connect} from 'react-redux'
import {loadEvent} from '../../actions/events'
import Event from './Event'

class EventsContainer extends React.PureComponent {
  componentDidMount() {
    this.props.loadEvent(this.props.match.params.id)
  }
  
  render() {
    if(Object.keys(this.props.event).length === 0) return '..Loading'
    return <Event event={this.props.event} authenticated={this.props.authenticated}/>
  }
}

const mapStateToProps = state => ({
  authenticated: state.currentUser !== null,
  event: state.event
})

export default connect(mapStateToProps, {loadEvent})(EventsContainer)

