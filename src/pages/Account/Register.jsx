import React from "react"
import { Form, Icon, Input, Button, 
  // Checkbox 
} from 'antd';
import intl from "react-intl-universal";
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
    render() {
        return (
      <Form onSubmit={this.handleSubmit} className="login-form" style={ style.container }>
        <h2> { i18n('title') } </h2>
        <br />
        <FormItem {...formItemLayout} label={i18n('username')} >
            <Input prefix={IconPrefixFactory("user")} placeholder={i18n('username')} />
        </FormItem>
        <FormItem {...formItemLayout} label={i18n('email')}>
            <Input prefix={IconPrefixFactory("mail")} placeholder={i18n('email')}  />
        </FormItem>
        <FormItem {...formItemLayout} label={i18n("password")}>
            <Input prefix={IconPrefixFactory("lock")} type="password" placeholder={i18n("password")}  />
        </FormItem>
        <FormItem {...formItemLayout} label={i18n("confirm password")}>
            <Input prefix={IconPrefixFactory("lock")} type="password" placeholder={i18n("confirm password")}  />
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" className="login-form-button">
           { i18n('register') }
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
