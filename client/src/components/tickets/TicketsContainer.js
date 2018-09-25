import * as React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {connect} from 'react-redux'

class HangmanContainer extends React.PureComponent {
  render() {
    const game = false
    console.log(this.props)
    if (!game) return 'Loading...'
  }
}

const mapStateToProps = ({events}) => ({events})

export default connect(mapStateToProps)(HangmanContainer)
