import React from "react"
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { NavLink } from "react-router-dom";
import intl from "react-intl-universal";
const i18n = (name) => intl.get(`user.login.${name}`)


const FormItem = Form.Item;

class Login extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit} className="login-form" style={ style.container }>
        <h2> { i18n('user login') }</h2>
        <br />
        <FormItem>
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder={ i18n('username') } />
        </FormItem>
        <FormItem>
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder={ i18n('password') } />
        </FormItem>
        <FormItem>
            <Checkbox>{ i18n('remember me') }</Checkbox>
          <a className="login-form-forgot" href="">{ i18n('forgot password') }</a>
          <Button type="primary" htmlType="submit" className="login-form-button">
          { i18n('login') }
          </Button>
          { i18n('or') } 
          <NavLink to="/account/register">{ i18n('register new account') }</NavLink>
        </FormItem>
      </Form>
    );
  }
}

const style = {
  container: {
    maxWidth: '300px',
    padding: '30px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
};

export default Login;
