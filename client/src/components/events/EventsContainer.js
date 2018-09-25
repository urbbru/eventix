import * as React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {connect} from 'react-redux'
import Events from './Events'

class HangmanContainer extends React.PureComponent {
  render() {
     return <Events />
  }
}

const mapStateToProps = ({events}) => ({events})

export default connect(mapStateToProps)(HangmanContainer)
