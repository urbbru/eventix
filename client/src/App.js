import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import Header from './components/layout/Header'
// import Footer from './components/layout/Footer'
import HomeContainer from './components/HomeContainer'
import EventsContainer from './components/events/EventsContainer'
import EventContainer from './components/events/EventContainer'
import TicketContainer from './components/tickets/TicketContainer'
import Login from './components/login/Login'
import Signup from './components/signup/Signup'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Row } from 'antd'

class App extends Component {
  onChange = (e) => {
    console.log(e)
  }
  render() {
    return (
        <Router basename={process.env.PUBLIC_URL}>
            <div>
                <Row id="header">
                    <Header />
                </Row>

                <Row id="content">
                    <Route exact path='/' component={HomeContainer}/>

                    <Route exact path="/events" component={EventsContainer}/>
                    <Route exact path="/events/:id" component={EventContainer}/>
                    {/* <Route exact path="/events/create" component={EventFormContainer}/> */}
                    <Route exact path="/tickets/:id" component={TicketContainer}/>
                    {/* <Route exact path="/tickets/create" component={TicketFormContainer}/> */}
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/signup" component={Signup}/>
                </Row>
            </div>
        </Router>
    );
  }
}

export default App;
