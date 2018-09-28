import * as React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Col, Button, Card, List, Avatar, Icon, Tooltip } from 'antd'
import CreateComment from '../comments/CreateComment'
import {fraudCalculator, giveColor} from '../../constants'

export default function Ticket(props) {
    const IconText = ({ type, text }) => {
        if(type === "check"){ 
        return  <span className={giveColor(fraudCalculator(props.ticket, props.tickets, props.event))}>
                    <Tooltip title="Chance of fraud">
                    <Icon type={type} style={{ marginRight: 8 }} />
                    {fraudCalculator(props.ticket, props.tickets, props.event)}
                    </Tooltip>
                </span>
        } else {
            return  <span>
                        <Icon type={type} style={{ marginRight: 8 }} />
                        {text}
                    </span>
        }
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
                                    title={`Posted by ${props.ticket.user.userName}, contact: ${props.ticket.user.email}`}
                                    description={`$ ${props.ticket.price}`}
                                    />
                                    {props.ticket.description}

                            </List.Item>
                        </List>
                    </Card>
                    </Col>
                    <Col xs={{ span: 22, offset: 1 }} lg={{ span: 11 }}>

                    <h1 className="title">Add comment</h1>

                        <CreateComment ticketId={props.ticket.id} createComment={props.createComment}/>

                    </Col>
                    <Col xs={{ span: 22, offset: 1 }} lg={{ span: 11 }}>

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