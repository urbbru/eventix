import * as React from 'react'
import { Link } from "react-router-dom"
import {connect} from 'react-redux'
import { Col, Menu, Icon } from 'antd'
import logo from '../../logo.svg';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Header extends React.PureComponent {
    
    checkIfLoggedIn = () => {
        if(!this.props.authenticated) {
            return (
             
                <Menu.Item key="login" style={{float: 'right'}}>
                    <Link to={"/login"}>Log in</Link> 
                </Menu.Item>
        
            )
        } else {
            return (
                
                <SubMenu style={{float: 'right'}} title={<span><Icon type="user" />{this.props.user.info.userName}</span>}>
                    <MenuItemGroup title="Actions">
                    <Menu.Item key="createEvent"><Link to={"/events/create"}>Create Event</Link></Menu.Item>
                    <Menu.Item key="createTicket"><Link to={"/tickets/create"}>Create Ticket</Link></Menu.Item>
                    <Menu.Item key="Logout"><Link to={"/logout"}>Log out</Link></Menu.Item>
                    </MenuItemGroup>
                </SubMenu>
     
            )
        }
    }

    render() {
        return <Col xs={{ span: 22, offset: 1 }}>

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
                    
                    {this.checkIfLoggedIn()}

                    </Menu>
                
                </Col>
  }
}

const mapStateToProps = state => ({
  authenticated: state.currentUser !== null,
  user: state.currentUser
})

export default connect(mapStateToProps)(Header)