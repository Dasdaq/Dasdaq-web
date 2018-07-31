import React from "react"
import { Form, Icon, Input, Button, Checkbox, Modal, notification, Card, Row, Col, Alert } from 'antd';
import { NavLink } from "react-router-dom";
import intl from "react-intl-universal";
import { login, getMyInfo } from "../../api/auth";
const i18n = (name) => intl.get(`user.login.${name}`)


const FormItem = Form.Item;

const IconFactory = (type) => (
  <Icon type={type} style={{ color: 'rgba(0,0,0,.25)' }} />
)

class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
    }
  }

  handleSubmit = async (e) => {
    const { saveUser } = this.props

    const { username, password } = this.state
    console.info(username, password)
    e.preventDefault();
    try {
      await login({ username, password })
      const result = await getMyInfo()
      saveUser(result)
      notification.success({
        message: 'Login successfully',
        description: 'We will redirect to previous page in no time.'
      })
    } catch (error) {
      Modal.error({
        title: 'Error Happened',
        content: error.message,
      });
    }
  }

  handleChange(event, fieldName) {
    const obj = {}
    obj[fieldName] = event.target.value
    this.setState(obj);
  }

  render() {
    const { user } = this.props
    if (user !== null) {
      return (
        <div className="notification">
          <Card title="欢迎回来">
            你已登录，请打开 <Button size="large"><NavLink to="/account/info"> 我的账户 </NavLink></Button>
          </Card>
        </div>
      )
    } else {
      return (
        <Row>
          <Col span={12}>
            <Card title="使用钱包签名快速登录">
              <Alert
                  message="使用 MetaMask 或 Scatter 钱包签名登录"
                  description="无需输入账户密码，体验安全快捷、无需密码的登录方式！"
                  type="info"
                  iconType="key"
                  showIcon
                />
              <Button.Group>
                <Button icon="download" size="large">使用 MetaMask 签名登录</Button>
                <Button icon="download" size="large">使用 Scatter 签名登录</Button>
              </Button.Group>
            </Card>
          </Col>
          <Col span={12}>
            <Form onSubmit={this.handleSubmit} className="login-form" style={style.container}>
              <h2> {i18n('user login')}</h2>
              <br />
              <FormItem label={i18n('username')}>
                <Input prefix={IconFactory('user')}
                  onChange={(e) => this.handleChange(e, 'username')}
                  onBlur={(e) => this.handleChange(e, 'username')}
                  placeholder={i18n('username')} />
              </FormItem>
              <FormItem label={i18n('password')}>
                <Input prefix={IconFactory("lock")}
                  onChange={(e) => this.handleChange(e, 'password')}
                  onBlur={(e) => this.handleChange(e, 'password')}
                  type="password" placeholder={i18n('password')} />
              </FormItem>
              <FormItem>
                <Checkbox>{i18n('remember me')}</Checkbox>
                <a className="login-form-forgot" href="">{i18n('forgot password')}</a>
              </FormItem>
              <FormItem>
                <Button type="primary" htmlType="submit" className="login-form-button" size="large">
                  {i18n('login')}
                </Button>
              </FormItem>
              <FormItem>
                {i18n('or')}
                <NavLink to="/account/register">{i18n('register new account')}</NavLink>
              </FormItem>
            </Form>
            </Col>
        </Row>
      );
    }
    
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
