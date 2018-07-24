import React from "react"
import { Form, Icon, Input, Button, Col , Menu, Row,
  // Checkbox
  } from 'antd';

const FormItem = Form.Item;
const {
  ItemGroup,
  Item
} = Menu

class User extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            menuindex: 0
        }
    }

    menuClicked(e) {
      const index = parseInt(e['key'], 10);
      this.setState( {menuindex: index} );
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
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="旧密码" />
                </FormItem>
                <FormItem>
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="新密码" />
                </FormItem>
                <FormItem>
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="确认新密码" />
                </FormItem>
                <FormItem>
                  <Button type="primary" htmlType="submit" className="login-form-button">
                    确认修改
                  </Button>
                </FormItem>
              </Form>
            }
    }

    renderWallet() {
        if(this.state.menuindex === 2) {
        return  <Form style={ style.container }>
                    <h2>绑定钱包</h2>
                </Form>
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
};

export default User;
