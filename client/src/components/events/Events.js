import * as React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { 
    Row, Col, Button, Select, Form, 
    Pagination, Switch, Radio, Icon,
    Card, Avatar
} from 'antd'
const { Meta } = Card;




export default function Events(props) {
    const extraOptions = () => {
        if(!props.authenticated) return
        return [<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]
    }
    return (
        <div>
            <h1 className="align-center">Events coming up</h1>
            {props.events.map(event => {
                return (
                    <Col xs={{ span: 22, offset: 1 }} lg={{ span: 8, offset:0 }}>
                    <Card
                        className="event-card"
                        cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                        actions={extraOptions()}
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