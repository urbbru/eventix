import * as React from 'react'
import { Col, Tabs, Card, Avatar, Icon } from 'antd'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const TabPane = Tabs.TabPane
const { Meta } = Card

export default function Event(props) {
    const extraOptions = () => {
        if(!props.authenticated) return
        return [<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]
    }
    const showTickets = () => {
        if(props.event.tickets.length === 0) return "No tickets for this event yet"
        return props.event.tickets.map(ticket => {
            return (
                <Card
                    className="ticket-card"
                    style={{ width: 300 }}
                    cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                    actions={extraOptions()}
                >
                    <Meta
                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title={<Link to={`/tickets/${ticket.id}`}>{`Price: $ ${ticket.price}`}</Link>}
                    description={ticket.description}
                    />
                </Card>
            )
        })
    }
    return (
        <div>
                    <Col xs={{ span: 22, offset: 1 }}>
                    <h2>{props.event.name}</h2>
                    <Tabs type={"card"} tabPosition={"top"}>

                        <TabPane tab="Description" key="1">{props.event.description}</TabPane>

                        <TabPane tab="Price" key="2">{props.event.price}</TabPane>

                        <TabPane tab="Tickets" key="3">
                            {showTickets()}
                        </TabPane>

                    </Tabs>
                    </Col>
        </div>
    )  
}