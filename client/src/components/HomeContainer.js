import React from 'react'
import {connect} from 'react-redux'
import Home from './Home'


class HomeContainer extends React.PureComponent {
  render() {
    return (
          <Home />
    )
  }
}

const mapStateToProps = ({order}) => ({order})

export default connect(mapStateToProps)(HomeContainer)