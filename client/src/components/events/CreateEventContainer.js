import * as React from 'react'
import {connect} from 'react-redux'
import {createEvent} from '../../actions/events'
import CreateEvent from './CreateEvent'
import {Redirect} from 'react-router-dom'

class CreateEventContainer extends React.PureComponent {
  componentDidMount() {

  }
  
  render() {
    if (!this.props.authenticated) return (
        <Redirect to="/" />
    )
    return <p>se</p>
    // <CreateEvent authenticated={this.props.authenticated} createEvent={this.props.createEvent}/>
  }
}

const mapStateToProps = state => ({
  authenticated: state.currentUser !== null,
  currentUser: state.currentUser
})

export default connect(mapStateToProps, {createEvent})(CreateEventContainer)

