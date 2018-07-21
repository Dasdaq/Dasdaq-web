import React from "react"
import { Form, Icon, Input, Button, Checkbox } from 'antd';

const FormItem = Form.Item;

class Login extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit} className="login-form" style={ style.container }>
        <h2>用户登录</h2>
        <br />
        <FormItem>
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
        </FormItem>
        <FormItem>
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
        </FormItem>
        <FormItem>
            <Checkbox>记住我</Checkbox>
          <a className="login-form-forgot" href="">忘记密码</a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
          或 <a href="">注册新用户</a>
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
