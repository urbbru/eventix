import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import HomeContainer from './components/HomeContainer'
import EventsContainer from './components/events/EventsContainer'
import TicketsContainer from './components/tickets/TicketsContainer'
import LoginContainer from './components/login/LoginContainer'
import SignupContainer from './components/signup/SignupContainer'
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
                <Row id="header" align="middle">
                    <Col xs={{ span: 22, offset: 1 }} lg={{ span: 20, offset: 2 }}>

                        <img src={logo} className="logo" alt="logo" />

                        <Menu
                          mode="horizontal"
                        >
                          <Menu.Item key="mail">
                            <Icon type="mail" />Navigation One
                          </Menu.Item>
                          <SubMenu style={{float: 'right'}} title={<span><Icon type="setting" />Navigation Three - Submenu</span>}>
                            <MenuItemGroup title="Item 1">
                              <Menu.Item key="setting:1">Option 1</Menu.Item>
                              <Menu.Item key="setting:2">Option 2</Menu.Item>
                            </MenuItemGroup>
                            <MenuItemGroup title="Item 2">
                              <Menu.Item key="setting:3">Option 3</Menu.Item>
                              <Menu.Item key="setting:4">Option 4</Menu.Item>
                            </MenuItemGroup>
                          </SubMenu>
                          <Menu.Item key="alipay" style={{float: 'right'}}>
                            <a href="https://ant.design" target="_blank" rel="noopener noreferrer">Navigation Four - Link</a>
                          </Menu.Item>

                        </Menu>
                      
                      </Col>
                </Row>

                <Row type="flex" justify="space-around">
                    <Route exact path='/' component={HomeContainer}/>

                    <Route exact path="/events" component={EventsContainer}/>
                    <Route exact path="/events/:id" component={EventsContainer}/>
                    <Route exact path="/events/create" component={EventsContainer}/>
                    <Route exact path="/tickets/:id" component={TicketsContainer}/>
                    <Route exact path="/tickets/create" component={TicketsContainer}/>
                    <Route exact path="/login" component={LoginContainer}/>
                    <Route exact path="/signup" component={SignupContainer}/>
                </Row>
            </div>
        </Router>
    );
  }
}

export default App;
