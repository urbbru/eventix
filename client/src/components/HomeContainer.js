import React from 'react'
import {connect} from 'react-redux'
import Home from './Home'
import { Spin } from 'antd'
import {loadEvents} from '../actions/events'

class HomeContainer extends React.PureComponent {
  componentDidMount() {
    this.props.loadEvents(0, 3)
  }
  render() {
    if(this.props.events.length === 0) return (<div className="example"><Spin /></div>)
    return <Home events={this.props.events}/>
  }
}

const mapStateToProps = ({events}) => ({events})

export default connect(mapStateToProps, {loadEvents})(HomeContainer)