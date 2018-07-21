import React from "react"
import { Form, Icon, Input, Button, 
  // Checkbox 
} from 'antd';

const FormItem = Form.Item;

class Register extends React.Component {
    render() {
        return (
      <Form onSubmit={this.handleSubmit} className="login-form" style={ style.container }>
        <h2>用户注册</h2>
        <br />
        <FormItem>
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
        </FormItem>
        <FormItem>
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="邮箱" />
        </FormItem>
        <FormItem>
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
        </FormItem>
        <FormItem>
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="确认密码" />
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">
            确认注册
          </Button>
        </FormItem>
      </Form>
        )
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

export default Register;
