import * as React from 'react'
import {connect} from 'react-redux'
import {loadEvents, deleteEvent} from '../../actions/events'
import { baseUrl } from '../../constants'
import { Col, Pagination, Spin, message } from 'antd'
import Events from './Events'

class EventsContainer extends React.PureComponent {
  state = {
    skip: 0,
    take: 9,
    totalEvents: 0
  }
  
  componentDidMount() {
    this.props.loadEvents(this.state.skip, this.state.take)
    if(this.state.totalEvents === 0) {
      this.loadTotalEvents()
    }
  }

  componentDidUpdate() {
    if(this.props.actions.eventDelete) {
      this.props.loadEvents(this.state.skip, this.state.take)
      this.loadTotalEvents()
      message.success('Event deleted')
      this.props.actions.eventDelete = null
    }
  }

  loadTotalEvents = () => {
    fetch(`${baseUrl}/events`)
        .then(response => response.json())
        .then(json => this.setState({totalEvents: json.events.length}))
  }

  paginate = (page) => {
    this.setState({skip:(page-1)*9}, () => this.props.loadEvents(this.state.skip, this.state.take))
  }
  
  render() {
    if(this.props.events.length === 0) return (<div className="example"><Spin /></div>)
    return (
      <div>
        <Events events={this.props.events} deleteEvent={this.props.deleteEvent} authenticated={this.props.authenticated} currentUser={this.props.currentUser} actions={this.props.actions}/>
        <Col xs={{ span: 22, offset: 1 }} className="pagination">
            <Pagination defaultCurrent={1} total={Math.ceil(this.state.totalEvents/9)*10} onChange={this.paginate}/>
        </Col>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  authenticated: state.currentUser !== null,
  currentUser: state.currentUser,
  events: state.events,
  actions: state.actions
})

export default connect(mapStateToProps, {loadEvents, deleteEvent})(EventsContainer)

