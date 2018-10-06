import * as React from 'react'
import {connect} from 'react-redux'
import {loadEvent, updateEvent} from '../../actions/events'
import { Col, Form, Input, InputNumber, Tooltip, Icon, DatePicker, Button } from 'antd';
import {Redirect} from 'react-router-dom'

const moment = require('moment')
const { RangePicker } = DatePicker;
const FormItem = Form.Item;

class UpdateEvent extends React.Component {
    componentDidMount() {
        this.props.loadEvent(this.props.match.params.id)
    }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const eventId = this.props.match.params.id
        this.props.updateEvent(values, eventId)
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
    if (!this.props.authenticated || !this.props.currentUser.info.admin) return (
      <Redirect to="/events" />
    )
    if (this.props.actions && this.props.actions.eventUpdate) return (
      <Redirect to={`/events/${this.props.match.params.id}`} />
    )
    return (
        
      <Col xs={{ span: 22, offset: 1 }}>
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="Name"
        >
          {getFieldDecorator('name', {
            initialValue: this.props.event.name,
            rules: [{
              required: true, message: 'Please input name of event!',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Description"
        >
          {getFieldDecorator('description', {
            initialValue: this.props.event.description,
            rules: [{
              required: true, message: 'Please input description of event',
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
            initialValue: this.props.event.picture,
            rules: [{ required: true, message: 'Please input the url of your picture!'}],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Price"
        >
            {getFieldDecorator('price', { 
              initialValue: this.props.event.price, 
              rules: [{ 
                  required: true, 
                  message: 'Please input the url of your picture!'
                }]
            })(
                <InputNumber min={1} />
            )}
          <span className="ant-form-text"> euros</span>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Start & end date with time"
        >
          {getFieldDecorator('dates', {
              initialValue: [moment(this.props.event.startDate), moment(this.props.event.endDate)],
              rules: [{ type: 'array', required: true, message: 'Please select time!' }]})(
            <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">Update Event</Button>
        </FormItem>
      </Form>
      </Col>
    );
  }
}

const WrappedEventUpdator = Form.create()(UpdateEvent);

const mapStateToProps = state => ({
    authenticated: state.currentUser !== null,
    currentUser: state.currentUser,
    event: state.event,
    actions: state.actions
  })

export default connect(mapStateToProps, {loadEvent, updateEvent})(WrappedEventUpdator)