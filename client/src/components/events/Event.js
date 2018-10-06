import * as React from 'react'
import { Col, Tabs, Card, Avatar, Icon, Button, Popconfirm, message } from 'antd'
import { Link } from "react-router-dom";

const TabPane = Tabs.TabPane
const { Meta } = Card

export default function Event(props) {
    const confirm = (ticketId) => {
        props.deleteTicket(ticketId)
    }
    const cancel = () => {
        message.error('Ticket not deleted')
    }
    const showTickets = () => {
        if(props.event.tickets.length === 0) return "No tickets for this event yet"
        return props.event.tickets.map(ticket => {
            let extraOptions = [
                <Link to={`/tickets/${ticket.id}/edit`}><Icon type="edit" /></Link>, 
                <Popconfirm title="Are you sure you want to delete this ticket"
                        onConfirm={() => confirm(ticket.id)} 
                        onCancel={cancel} 
                        okText="Yes" 
                        cancelText="No"><Icon type="delete" />
                </Popconfirm>
            ]
            if(!props.authenticated || (ticket.user.id !== props.currentUser.info.id && !props.currentUser.info.admin)) extraOptions = []
            return (
                <Card
                    key={ticket.id}
                    className="ticket-card"
                    style={{ width: 300 }}
                    cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                    actions={extraOptions}
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
    const showEditEventBtn = () => {
        if(props.authenticated && props.currentUser.info.admin) return <Link to={`/events/${props.event.id}/edit`}><Button type="primary" icon="setting" className="back-btn">Edit event</Button></Link>
    }
    return (
        <div>
                    <Col xs={{ span: 22, offset: 1 }}>
                    <Link to={'/events'}><Button type="primary" icon="arrow-left" className="back-btn">Back to events</Button></Link>
                    <h2>{props.event.name}</h2>
                    {showEditEventBtn()}
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