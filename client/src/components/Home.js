import * as React from 'react'
import { Link } from "react-router-dom";
import { Col, Button, Icon, Card, Avatar } from 'antd'
const { Meta } = Card;

export default function Home(props) {
    const extraOptions = () => {
        if(!props.authenticated) return
        return [<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]
    }
    return (
        <div>
                {props.events.map(event => {
                    return (
                        <Col key={event.id} xs={{ span: 22, offset: 1 }} lg={{ span: 8, offset:0 }}>
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
                <Col xs={{ span: 22, offset: 1 }} className="align-center" style={{ marginTop:'5%' }}>

                    <Link to={"/events"}>
                    <Button type="primary" icon="calendar" size="large" >
                        See all events
                    </Button>
                    </Link>
                    
                    <Link to={"/login"} className="login-btn">
                    <Button size="large">Log in</Button>
                    </Link>

                </Col>
        </div>
    )  
}