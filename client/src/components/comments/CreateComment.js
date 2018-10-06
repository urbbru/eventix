import * as React from 'react'
import {connect} from 'react-redux'
import { Form, Input, Button } from 'antd';

const moment = require('moment')
const FormItem = Form.Item;

class CreateComment extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const comment = {
          content: values.comment,
          date: moment().format()
        }
        this.props.createComment(comment, this.props.ticketId)
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 }
      },
      wrapperCol: {
        xs: { span: 24 }
      }
    }
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        }
      }
    }
    if (!this.props.authenticated) return (
        <p>You need to log in to post a comment</p>
    )
    return (
      <Form onSubmit={this.handleSubmit} className="comment-form">
        <FormItem
          {...formItemLayout}
          label="Comment"
        >
          {getFieldDecorator('comment', {
            rules: [{
              required: true, message: 'Please input a comment',
            }]
          })(
            <Input />
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">Create Comment</Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedCommentCreator = Form.create()(CreateComment);

const mapStateToProps = state => ({
    authenticated: state.currentUser !== null,
    currentUser: state.currentUser
})

export default connect(mapStateToProps)(WrappedCommentCreator)