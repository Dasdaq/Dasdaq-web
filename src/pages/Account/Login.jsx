import React from "react"
import { Form, Icon, Input, Button, Checkbox, Modal, notification, Card, Row, Col, Alert } from 'antd';
import { NavLink } from "react-router-dom";
import intl from "react-intl-universal";
import { login, getMyInfo, loginByMetaMask, loginByScatter } from "../../api/auth";
import IconFont from "../../components/IconFont";
import withContent from "../ContentWrapper";
import { sign } from "../../apieth"
import { compose } from "ramda";
import { withScatter } from "../../scatter";
const i18n = (name) => intl.get(`user.login.${name}`)


const FormItem = Form.Item;

const IconFactory = (type) => (
  <Icon type={type} style={{ color: 'rgba(0,0,0,.25)' }} />
)

const formItemLayout = {
  labelCol: {
    xs: { span: 0 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      isLoadedPlugin: {
        scatter: false,
        metamask: false
      }
    }
  }

  async componentDidMount() {
    if (this.props.user !== null) {
      notification.info(
        {
          duration: 3000, message: 'You have logined already.',
          description: 'We will redirect to the page in 3 seconds.'
        }
      )
      setTimeout(() => {
        this.props.history.push("/account/info");
      }, 3000)
    }
  }

  async requestIdAndSignWithScatter() {
    await this.requestIdentity()
    try {
      const signature = await this.getSignatureWithScatter()
      console.info('signature ' + signature)
      const result = await loginByScatter({ signature })
      // console.log(result)
      this.props.saveUser(result)
      notification.success({
        message: 'Login successfully',
        description: 'We will redirect to previous page in no time.'
      })
    } catch (error) {
      notification.error({
        message: error.message
      })
    }
  }

  async requestIdentity() {
    const { scatter } = this.props
    try {
      const identity = await scatter.getIdentity()
      this.setState({ identity })
    } catch (error) {
      console.error(error.message)
    }
  }

  async getSignatureWithScatter() {
    const { scatter } = this.props
    if (!this.state.identity) {
      return null;
    }
    const { publicKey } = this.state.identity
    const signMsg = "By Signing, you will bind your Scatter identity with your account."
    return scatter.getArbitrarySignature(
      publicKey, signMsg, 'Login Authentication', false)

  }

  handleSubmit = async (e) => {
    const { saveUser } = this.props

    const { username, password } = this.state
    console.info(username, password)
    e.preventDefault();
    try {
      await login({ username, password, "login_type": 0 })
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

  signByMetaMask = async (e) => {
    const { saveUser } = this.props
    const signature = await sign("dasdaq")
    console.log(signature)
    try {
      const result = await loginByMetaMask({ signature: signature.result })
      saveUser(result)
      notification.success({
        message: 'Login successfully',
        description: 'We will redirect to previous page in no time.'
      })
    } catch (error) {
      notification.error({
        message: error.message
      })
    }
  }

  render() {
    const { user } = this.props
    if (user !== null) {
      return (
        <div className="login-ok">
          <Card title="使用钱包签名快速登录">
            你已登录，请打开 <Button size="large"><NavLink to="/account/info"> 我的账户 </NavLink></Button>
          </Card>
        </div>
      )
    } else {
      return (
        <Row>
          <Col span={12}>
            <Card title="使用钱包签名快速登录" style={{ margin: "1rem" }}>
              <Alert
                message={
                  <div> 使用 <IconFont name="metamask" /> MetaMask
                    或 <IconFont name="scatter" /> Scatter 钱包签名登录 </div>
                }
                type="info" description="无需输入账户密码，体验安全快捷、无需密码的登录方式！"
                showIcon iconType="key"
                style={{ marginBottom: "1rem" }}
              />
              <Button.Group>
                <Button size="large" onClick={this.signByMetaMask}>
                  <IconFont name="metamask" /> MetaMask 签名登录</Button>
                <Button size="large" disabled={!this.props.scatter}
                  onClick={e => this.requestIdAndSignWithScatter(e)}>
                  <IconFont name="scatter" /> Scatter 签名登录</Button>
              </Button.Group>
            </Card>
          </Col>
          <Col span={12}>
            <Form onSubmit={this.handleSubmit} className="login-form" style={style.container}>
              <h2> {i18n('user login')}</h2>
              <br />
              <FormItem label={i18n('username')} {...formItemLayout}>
                <Input prefix={IconFactory('user')}
                  onChange={(e) => this.handleChange(e, 'username')}
                  onBlur={(e) => this.handleChange(e, 'username')}
                  placeholder={i18n('username')} />
              </FormItem>
              <FormItem label={i18n('password')} {...formItemLayout}>
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
                <Button type="primary" htmlType="submit" style={{ width: '100%' }} size="large">
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
    // maxWidth: '36rem',
    padding: '30px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
};

export default compose(
  withContent,
  withScatter
)(Login);
