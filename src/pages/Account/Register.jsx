import React from "react"
import {
  Form, Icon, Input, Button, notification
  // Checkbox 
} from 'antd';
import intl from "react-intl-universal";
import { register } from "../../api/auth";
const i18n = (name) => intl.get(`user.register.${name}`)


const FormItem = Form.Item;

const IconPrefixFactory = (type) => <Icon type={type} style={{ color: 'rgba(0,0,0,.25)' }} />

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
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
};

class Register extends React.Component {
  constructor() {
    super()
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      isMismatch: true
    }
  }
  async handleSubmit(e) {
    const {
      email,
      password,
      confirmPassword
    } = this.state
    const { history } = this.props
    console.log("submitted")
    e.preventDefault();
    if (password !== confirmPassword) {
      notification.error({
        message: '密码不匹配',
        description: '请重新输入密码.'
      })
      this.setState({ password: '', confirmPassword: '', isMismatch: true })
    } else {
      console.info('checked ready to go!')
      try {
        await register({username: email, password, inviter: '' })
        notification.success({
          message: '注册成功',
          description: '正在跳转到登录页面'
        })
        history.push('/account/info')
      } catch (error) {
        notification.error({
          message: error.message
        })
      }
    }
  }
  handleConfirmPassword(event) {
    const confirmPassword = event.target.value
    if (this.state.password === confirmPassword) {
      this.setState({ isMismatch: false })
    } else {
      this.setState({ isMismatch: true })
    }
    this.setState({ confirmPassword })
  }
  handleChange(event, fieldName) {
    const obj = {}
    obj[fieldName] = event.target.value
    this.setState(obj);
  }
  passwordChecker() {
    const exp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/g
    const { password } = this.state
    if (exp.test(password)) {
      return {
        validateStatus: "success"
      }
    } else {
      return {
        validateStatus: "error",
        help: "Please check your password again"
      }
    }
  }
  confirmPasswordChecker() {
    if (this.state.password === this.state.confirmPassword) {
      return {
        validateStatus: "success"
      }
    } else {
      return {
        validateStatus: "error",
        help: "Please check your password again"
      }
    }
  }
  render() {
    const {
      isMismatch,
      password,
      confirmPassword
    } = this.state
    return (
      <Form onSubmit={(e) => this.handleSubmit(e)} className="login-form" style={style.container}>
        <h2> {i18n('title')} </h2>
        <br />
        {/* <FormItem {...formItemLayout} label={i18n('username')}>
          <Input
            onChange={(e) => this.handleChange(e, 'username')}
            onBlur={(e) => this.handleChange(e, 'username')}
             prefix={IconPrefixFactory("user")} placeholder={i18n('username')} />
        </FormItem> */
          // api have email only
        }
        <FormItem {...formItemLayout} label={i18n('email')}>
          <Input
            onChange={(e) => this.handleChange(e, 'email')}
            onBlur={(e) => this.handleChange(e, 'email')}
            prefix={IconPrefixFactory("mail")} placeholder={i18n('email')} />
        </FormItem>
        {/* <Alert
          message="Password is not matching"
          showIcon={true} iconType="lock"
          description="Please re-enter your password again"
          type="error"
          closable/> */}
        <FormItem {...formItemLayout} label={i18n("password")}
         {...this.passwordChecker()} >
          <Input prefix={IconPrefixFactory("lock")}
            validateStatus="error"
            help="Should be combination of numbers & alphabets"
            value={password}
            onChange={(e) => this.handleChange(e, 'password')}
            onBlur={(e) => this.handleChange(e, 'password')}
            type="password" placeholder={i18n("password")} />
        </FormItem>
        <FormItem {...formItemLayout} label={i18n("confirm password")}
          {...this.confirmPasswordChecker()} >
          <Input
            value={confirmPassword}
            onChange={(e) => this.handleConfirmPassword(e, 'confirmPassword')}
            onBlur={(e) => this.handleConfirmPassword(e, 'confirmPassword')}

            prefix={IconPrefixFactory("lock")} type="password" placeholder={i18n("confirm password")} />
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit"
            disabled={isMismatch}
            className="login-form-button">
            {i18n('register')}
          </Button>
        </FormItem>
      </Form>
    )
  }
}

const style = {
  container: {
    maxWidth: '32rem',
    padding: '30px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
};

export default Register;
