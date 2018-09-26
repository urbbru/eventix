import * as React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {connect} from 'react-redux'
import {login} from '../../actions/users'
import {Redirect} from 'react-router-dom'

import { Form, Icon, Input, Button, Checkbox, Col } from 'antd';

const FormItem = Form.Item;

class LoginContainer extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.login(values.email, values.password)
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    if (this.props.currentUser) return (
			<Redirect to="/" />
		)
    return (
      <Col xs={{ span: 22, offset: 1 }}>
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
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
          <span className="register-now">Or <Link to={"/signup"}>register now!</Link></span>

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

const mapStateToProps = ({currentUser}) => ({currentUser})

export default connect(mapStateToProps, {login})(WrappedLogin)
