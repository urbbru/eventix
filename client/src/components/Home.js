import * as React from 'react'
import logo from '../logo.svg'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { 
    Row, Col, Button, Select, Form, 
    InputNumber, Switch, Radio, Icon,
    Card, Avatar
} from 'antd'
const { Meta } = Card;




export default function Home(props) {
    return (
        <div>
                <Col xs={{ span: 22, offset: 1 }} lg={{ span: 8, offset:0 }}>
                <Card
                    style={{ width: 280, margin:'0 auto' }}
                    cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                    actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
                >
                    <Meta
                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title="Card title"
                    description="This is the description"
                    />
                </Card>
                </Col>
                <Col xs={{ span: 22, offset: 1 }} lg={{ span: 8, offset:0}}>
                <Card
                    style={{ width: 280, margin:'0 auto' }}
                    cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                    actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
                >
                    <Meta
                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title="Card title"
                    description="This is the description"
                    />
                </Card>
                </Col>
                <Col xs={{ span: 22, offset: 1 }} lg={{ span: 8, offset:0}}>
                <Card
                    style={{ width: 280, margin:'0 auto' }}
                    cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                    actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
                >
                    <Meta
                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title="Card title"
                    description="This is the description"
                    />
                </Card>
                </Col>
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