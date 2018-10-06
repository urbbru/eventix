import * as React from 'react'
import {connect} from 'react-redux'
import {loadEvents} from '../../actions/events'
import {createTicket} from '../../actions/tickets'
import { Col, Form, Input, InputNumber, Tooltip, Icon, Select, Button } from 'antd';
import {Redirect} from 'react-router-dom'

const moment = require('moment')
const FormItem = Form.Item;
const Option = Select.Option;

class CreateTicket extends React.Component {
  componentDidMount() {
    this.props.loadEvents()
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const eventId = values.event
        const ticket = {
            price: values.price,
            description: values.description,
            picture: values.picture,
            date: moment().format()
        }
        this.props.createTicket(ticket, eventId)
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    }
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    }
    if (!this.props.authenticated) return (
      <Redirect to="/" />
    )
    if (this.props.actions && this.props.actions.ticket === true) return (
      <Redirect to={`/tickets/${this.props.ticket.id}`} />
    )
    return (
      <Col xs={{ span: 22, offset: 1 }}>
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="Which event is the ticket for?"
        >
          {getFieldDecorator('event', { rules: [{ required: true, message: 'Please input for which event the ticket is!'}]})(
                <Select
                showSearch
                placeholder="Select a event"
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                    {this.props.events.map(event => {
                        return <Option value={event.id}>{event.name}</Option>
                    })}
                </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Price"
        >
          {getFieldDecorator('price', { initialValue: 1, rules: [{ required: true, message: 'Please input price of your ticket!'}]})(
            <InputNumber min={1} />
          )}
          <span className="ant-form-text"> euros</span>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Description"
        >
          {getFieldDecorator('description', {
            rules: [{
              required: true, message: 'Please input description of ticket',
            }]
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              Picture(url)&nbsp;
              <Tooltip title="Upload on ImgBB to get url">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
        >
          {getFieldDecorator('picture', {
            rules: [{ required: true, message: 'Please input the url of your picture!'}],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">Create Ticket</Button>
        </FormItem>
      </Form>
      </Col>
    );
  }
}

const WrappedTicketCreator = Form.create()(CreateTicket);

const mapStateToProps = state => ({
    authenticated: state.currentUser !== null,
    currentUser: state.currentUser,
    events: state.events,
    ticket: state.ticket,
    actions: state.actions
  })

export default connect(mapStateToProps, {loadEvents, createTicket})(WrappedTicketCreator)