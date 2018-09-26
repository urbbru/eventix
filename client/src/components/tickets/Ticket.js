import * as React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Col, Button, Card, List, Avatar, Icon, Tooltip } from 'antd'

const data = [
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    {
      title: 'Ant Design Title 3',
    },
    {
      title: 'Ant Design Title 4',
    },
  ];

export default function Ticket(props) {
    console.log(props)
    const IconText = ({ type, text }) => {
        if(type === "check"){ 
        return  <span>
                    <Tooltip title="Chance of fraud">
                    <Icon type={type} style={{ marginRight: 8 }} />
                    {text}
                    </Tooltip>
                </span>
        } else {
            return  <span>
                        <Icon type={type} style={{ marginRight: 8 }} />
                        {text}
                    </span>
        }
    }
    const extraOptions = () => {
        if(!props.authenticated) return
        return [<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]
    }
    return (
        <div>
                    <Col xs={{ span: 22, offset: 1 }}>
                    <Link to={`/events/${props.ticket.event.id}`}><Button type="primary" icon="arrow-left" className="back-btn">Back to event</Button></Link>
                    <Card>
                        <List
                            itemLayout="vertical"
                            size="large"
                            footer={`Ticket for the "${props.ticket.event.name}" event`}
                        >
                            <List.Item
                                    key={"Se"}
                                    actions={[<IconText type="check" text="156" />, <IconText type="message" text={props.ticket.comments.length} />]}
                                    extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
                                >
                                    <List.Item.Meta
                                    avatar={<Avatar src={"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"} />}
                                    title={`Posted by ${props.ticket.user.userName}`}
                                    description={`$ ${props.ticket.price}`}
                                    />
                                    {props.ticket.description}
                            </List.Item>
                        </List>
                    </Card>
                    </Col>
                    <Col xs={{ span: 22, offset: 1 }} lg={{ span: 12 }}>

                        <h1 className="title">Comments</h1>

                        <List itemLayout="horizontal">

                        {props.ticket.comments.map(comment => {
                            return (
                                <List.Item>
                                <List.Item.Meta
                                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                title={`Posted by ${comment.user.userName}`}
                                description={comment.content}
                                />
                                </List.Item>
                            )
                        })}

                        </List>

                    </Col>
        </div>
    )  
}