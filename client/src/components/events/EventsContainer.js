import * as React from 'react'
import {connect} from 'react-redux'
import {loadEvents} from '../../actions/events'
import { baseUrl } from '../../constants'
import { 
  Row, Col, Button, Select, Form, 
  Pagination, Switch, Radio, Icon,
  Card, Avatar
} from 'antd'
import Events from './Events'

class EventsContainer extends React.PureComponent {
  state = {
    skip: 0,
    take: 9,
    totalEvents: 0
  }
  
  componentDidMount() {
    this.props.loadEvents(this.state.skip, this.state.take)

    fetch(`${baseUrl}/events`)
      .then(response => response.json())
      .then(json => this.setState({totalEvents: json.events.length}))
  }

  paginate = (page) => {
    this.setState({skip:(page-1)*9}, () => this.props.loadEvents(this.state.skip, this.state.take))
  }
  
  render() {
    console.log(this.state)
    if(this.props.events.length === 0) return '..Loading'
    return (
      <div>
        <Events events={this.props.events} authenticated={this.props.authenticated}/>
        <Col xs={{ span: 22, offset: 1 }} className="pagination">
            <Pagination defaultCurrent={1} total={Math.ceil(this.state.totalEvents/9)*10} onChange={this.paginate}/>
        </Col>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  authenticated: state.currentUser !== null,
  events: state.events
})

export default connect(mapStateToProps, {loadEvents})(EventsContainer)

