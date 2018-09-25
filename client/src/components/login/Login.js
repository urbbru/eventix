import * as React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {connect} from 'react-redux'
import Login from './Login'

import { Form, Icon, Input, Button, Checkbox, Col } from 'antd';

const FormItem = Form.Item;

class LoginContainer extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Col xs={{ span: 22, offset: 1 }}>
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username or Email" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          
          <a className="login-form-forgot" href="">Forgot password</a>
          <span className="register-now">Or <a href="">register now!</a></span>

          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          
        </FormItem>
      </Form>
      </Col>
    );
  }
}

const WrappedLogin = Form.create()(LoginContainer)

const mapStateToProps = ({events}) => ({events})

export default connect(mapStateToProps)(WrappedLogin)
