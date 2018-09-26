import * as React from 'react'
import {connect} from 'react-redux'
import {loadEvents} from '../../actions/events'
import Events from './Events'

class EventsContainer extends React.PureComponent {
  componentDidMount() {
    this.props.loadEvents()
  }
  
  render() {
    if(this.props.events.length === 0) return '..Loading'
    return <Events events={this.props.events} authenticated={this.props.authenticated}/>
  }
}

const mapStateToProps = state => ({
  authenticated: state.currentUser !== null,
  events: state.events
})

export default connect(mapStateToProps, {loadEvents})(EventsContainer)

