import * as React from 'react'
import {connect} from 'react-redux'
import {loadEvents} from '../../actions/events'
import { 
  Row, Col, Button, Select, Form, 
  Pagination, Switch, Radio, Icon,
  Card, Avatar
} from 'antd'
import Events from './Events'

class EventsContainer extends React.PureComponent {
  state = {
    skip: 0,
    take: 4
  }
  componentDidMount() {
    this.props.loadEvents()
  }
  paginate = (page) => {
    this.setState({skip:(page-1)*4})
  }
  
  render() {
    if(this.props.events.length === 0) return '..Loading'
    return (
      <div>
        <Events events={this.props.events} authenticated={this.props.authenticated}/>
        <Col xs={{ span: 22, offset: 1 }} className="pagination">
            <Pagination defaultCurrent={1} total={100} onChange={this.paginate}/>
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

