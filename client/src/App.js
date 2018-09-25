import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import HomeContainer from './components/HomeContainer'
import EventsContainer from './components/events/EventsContainer'
import TicketsContainer from './components/tickets/TicketsContainer'
import Login from './components/login/Login'
import Signup from './components/signup/Signup'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Row, Col, Menu, Icon } from 'antd'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


class App extends Component {
  onChange = (e) => {
    console.log(e)
  }
  render() {
    return (
        <Router basename={process.env.PUBLIC_URL}>
            <div>
                <Row id="header">
                    <Col xs={{ span: 22, offset: 1 }}>

                        <img src={logo} className="logo" alt="logo" />

                        <Menu
                          mode="horizontal"
                        >
                          <Menu.Item key="home">
                            <Link to={"/"}>Home</Link>
                          </Menu.Item>
                          <Menu.Item key="events">
                            <Link to={"/events"}>All events</Link>
                          </Menu.Item>
                          <SubMenu style={{float: 'right'}} title={<span><Icon type="setting" />Username</span>}>
                            <MenuItemGroup title="Item 1">
                              <Menu.Item key="createEvent">Create Event</Menu.Item>
                              <Menu.Item key="createTicket">Create Ticket</Menu.Item>
                            </MenuItemGroup>
                            <MenuItemGroup title="Item 2">
                              <Menu.Item key="setting:3">Option 3</Menu.Item>
                              <Menu.Item key="setting:4">Option 4</Menu.Item>
                            </MenuItemGroup>
                          </SubMenu>
                          <Menu.Item key="login" style={{float: 'right'}}>
                            <Link to={"/login"}>Log in</Link>
                          </Menu.Item>
                          <Menu.Item key="signup" style={{float: 'right'}}>
                            <Link to={"/signup"}>Sign up</Link>
                          </Menu.Item>

                        </Menu>
                      
                      </Col>
                </Row>

                <Row id="content">
                    <Route exact path='/' component={HomeContainer}/>

                    <Route exact path="/events" component={EventsContainer}/>
                    <Route exact path="/events/:id" component={EventsContainer}/>
                    <Route exact path="/events/create" component={EventsContainer}/>
                    <Route exact path="/tickets/:id" component={TicketsContainer}/>
                    <Route exact path="/tickets/create" component={TicketsContainer}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/signup" component={Signup}/>
                </Row>
            </div>
        </Router>
    );
  }
}

export default App;
