import * as React from 'react'
import { Link } from "react-router-dom";
import { Col, Icon, Card, Avatar, Popconfirm, message} from 'antd'
const { Meta } = Card;

export default function Events(props) {
    const confirm = (eventId) => {
        props.deleteEvent(eventId)
    }
    const cancel = () => {
        message.error('Event not deleted')
    }
    const extraOptions = (eventId) => {
        if(!props.authenticated || !props.currentUser.info.admin) return
        return [
            <Link to={`/events/${eventId}/edit`}><Icon type="edit" /></Link>, 
            <Popconfirm title="Are you sure you want to delete this event" 
                        onConfirm={() => confirm(eventId)} 
                        onCancel={cancel} 
                        okText="Yes" 
                        cancelText="No"><Icon type="delete" />
            </Popconfirm>
        ]
    }
    return (
        <div>
            <h1 className="align-center">Events coming up</h1>
            {props.events.map(event => {
                return (
                    <Col xs={{ span: 22, offset: 1 }} lg={{ span: 8, offset:0 }} key={event.id}>
                    <Card
                        className="event-card"
                        cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                        actions={extraOptions(event.id)}
                    >
                        <Meta
                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title={<Link to={`/events/${event.id}`}>{event.name}</Link>}
                        description={event.description}
                        />
                    </Card>
                    </Col>
                )
            })}
        </div>
    )  
}