import * as React from 'react'
import {connect} from 'react-redux'
import {createEvent} from '../../actions/events'
import { Col, Form, Input, InputNumber, Tooltip, Icon, DatePicker, Button } from 'antd';
import {Redirect} from 'react-router-dom'

const { RangePicker } = DatePicker;
const FormItem = Form.Item;

class CreateEvent extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.createEvent(values)
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
    if (this.props.actions && this.props.actions.event === true) return (
      <Redirect to={`/events/${this.props.event.id}`} />
    )
    return (
      <Col xs={{ span: 22, offset: 1 }}>
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="Name"
        >
          {getFieldDecorator('name', {
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
            rules: [{ required: true, message: 'Please input the url of your picture!'}],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Price"
        >
          {getFieldDecorator('price', { initialValue: 0, rules: [{ required: true, message: 'Please input the url of your picture!'}]})(
            <InputNumber min={1} />
          )}
          <span className="ant-form-text"> euros</span>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Start & end date with time"
        >
          {getFieldDecorator('dates', {rules: [{ type: 'array', required: true, message: 'Please select time!' }]})(
            <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">Create Event</Button>
        </FormItem>
      </Form>
      </Col>
    );
  }
}

const WrappedEventCreator = Form.create()(CreateEvent);

const mapStateToProps = state => ({
    authenticated: state.currentUser !== null,
    currentUser: state.currentUser,
    event: state.event,
    actions: state.actions
  })

export default connect(mapStateToProps, {createEvent})(WrappedEventCreator)