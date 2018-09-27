import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import Header from './components/layout/Header'
// import Footer from './components/layout/Footer'
import HomeContainer from './components/HomeContainer'
import EventsContainer from './components/events/EventsContainer'
import CreateEvent from './components/events/CreateEvent'
import EventContainer from './components/events/EventContainer'
import CreateTicket from './components/tickets/CreateTicket'
import UpdateTicket from './components/tickets/UpdateTicket'
import TicketContainer from './components/tickets/TicketContainer'
import Login from './components/login/Login'
import Logout from './components/logout/Logout'
import Signup from './components/signup/Signup'
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from 'react-router'
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
                <Switch>
                    <Route exact path='/' component={HomeContainer}/>
                    <Route exact path="/events" component={EventsContainer}/>
                    <Route exact path="/events/create" component={CreateEvent}/>
                    <Route exact path="/events/:id" component={EventContainer}/>
                    <Route exact path="/tickets/create" component={CreateTicket}/>
                    <Route exact path="/tickets/:id" component={TicketContainer}/>
                    <Route exact path="/tickets/:id/edit" component={UpdateTicket}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/logout" component={Logout}/>
                    <Route exact path="/signup" component={Signup}/>
                </Switch>
                </Row>
            </div>
        </Router>
    );
  }
}

export default App;
