import React from "react"
import { Form, Icon, Input, Button, Col , Menu, Row, Card,Alert,notification
  // Checkbox
  } from 'antd';
import IconFont from "../../components/IconFont";
import { sign, getMyAddr } from "../../apieth"
import { changePassword, bindMetaMask } from "../../api/auth";

const FormItem = Form.Item;
const {
  ItemGroup,
} = Menu

class User extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            menuindex: 0,
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: ''
        }
    }

    menuClicked(e) {
      const index = parseInt(e['key'], 10);
      this.setState( {menuindex: index} );
      this.setState({ oldPassword: '', newPassword: '', confirmNewPassword: '' })
    }

    async signByMetaMask(e) {
      const account = await getMyAddr()
      const signature = await sign("dasdaq")
      console.log(signature)
      try {
        const result = await bindMetaMask({ eth_address: account, metamask_signature: signature.result })
        notification.success({
          message: '绑定成功'
        })
      } catch (error) {
        notification.error({
          message: error.message
        })
      }
    }

    handlePasswordChange(event, pwtype) {
      const obj = {}
      obj[pwtype] = event.target.value
      this.setState(obj);
    }

    async changePassword(e) {
      const { oldPassword, newPassword, confirmNewPassword } = this.state
      if (newPassword !== confirmNewPassword) {
        notification.error({
          message: '两次新密码不匹配',
          description: '请重新输入新密码.'
        })
      } else {
        try {
          await changePassword({ old_password:oldPassword, new_password:newPassword })
          notification.success({
            message: '密码修改成功'
          })
        } catch (error) {
          notification.error({
            message: error.message
          })
        }
      }
    }

    renderInfo() {
        if(this.state.menuindex === 0) {
        return <Form style={ style.container }>
                <h2>个人信息</h2>
                <br />
                <FormItem>
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                </FormItem>
                <FormItem>
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="邮箱" />
                </FormItem>
                <FormItem>
                  <Button type="primary" htmlType="submit" className="login-form-button">
                    确认修改
                  </Button>
                </FormItem>
              </Form>
            }
    }

    renderPassword() {
        if(this.state.menuindex === 1) {
        return <Form style={ style.container }>
                <h2>修改密码</h2>
                <br />
                <FormItem>
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="旧密码" 
                    value={this.state.oldPassword}
                    onChange={(e) => this.handlePasswordChange(e, 'oldPassword')}/>
                </FormItem>
                <FormItem>
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="新密码" 
                    value={this.state.newPassword}
                    onChange={(e) => this.handlePasswordChange(e, 'newPassword')}/>
                </FormItem>
                <FormItem>
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="确认新密码" 
                    value={this.state.confirmNewPassword}
                    onChange={(e) => this.handlePasswordChange(e, 'confirmNewPassword')}/>
                </FormItem>
                <FormItem>
                  <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.changePassword}>
                    确认修改
                  </Button>
                </FormItem>
              </Form>
            }
    }

    renderWallet() {
        if(this.state.menuindex === 2) {
        return  <div style={ style.walletContainer }>
                    <h2>绑定钱包</h2>
                    <Card title="使用钱包签名绑定账号" style={{ margin: "1rem" }}>
                      <Alert
                        message={
                          <div> 使用 <IconFont name="metamask" /> MetaMask
                            或 <IconFont name="scatter" /> Scatter 钱包签名绑定 </div>
                        }
                        description="绑定账户后，登录时无需再输入账户密码，体验安全快捷、无需密码的登录方式！"
                        type="info"
                        iconType="key"
                        showIcon
                        style={{ marginBottom: "1rem" }}
                      />
                      <Button.Group>
                        <Button size="large" onClick={this.signByMetaMask}>
                          <IconFont name="metamask" /> MetaMask 签名绑定</Button>
                        <Button size="large" disabled={true}
                          onClick={e => this.requestIdAndSignWithScatter(e)}>
                          <IconFont name="scatter" /> Scatter 签名绑定</Button>
                      </Button.Group>
                    </Card>
                </div>
            }
    }

    render() {
        return (
            <div>
              <Row>
                <Col span={4}>
                  <Menu
                    onClick={this.menuClicked.bind(this)}
                    style={{ width: 256 }}
                    defaultSelectedKeys={['0']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                  >
                      <ItemGroup key="g1">
                        <Menu.Item key="0">个人信息</Menu.Item>
                        <Menu.Item key="1">修改密码</Menu.Item>
                        <Menu.Item key="2">绑定第三方钱包</Menu.Item>
                        <Menu.Item key="3">绑定第三方账户</Menu.Item>
                      </ItemGroup>
                      <ItemGroup key="g2">
                        <Menu.Item key="5">退出登录</Menu.Item>
                      </ItemGroup>
                  </Menu>
                </Col>
                <Col span={20}>
                  { this.renderInfo() }
                  { this.renderPassword() }
                  { this.renderWallet() }
                </Col>
              </Row>
            </div>
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
  walletContainer: {
    maxWidth: '800px',
    padding: '30px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
};

export default User;
