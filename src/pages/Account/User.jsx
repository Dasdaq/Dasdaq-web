import React from "react"
import { Col, Menu, Row, Layout} from 'antd';
import {
  Switch, Route, Link
} from 'react-router-dom'
import { withScatter, eosNetwork } from "../../scatter";

import BindAccount from './Info/BindAccount'
import BindWallet from './Info/BindWallet'
import Change from './Info/Change'
import InfoUser from './Info/User'

const {
  ItemGroup,
} = Menu
const { Content, Sider } = Layout;

class User extends React.Component {

  eosNetwork = eosNetwork['mainnet']

  render() {
    const { match } = this.props
    return (
      <div>
        <Row>
          <Col span={24}>

            <Layout>
              <Sider
                theme="light"
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={(broken) => { console.log(broken); }}
                onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
              >
                <div className="logo" />
                <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
                  <ItemGroup key="g1">
                    <Menu.Item key="1">
                      <Link to={`${match.url}`}>个人信息</Link >
                    </Menu.Item>
                    <Menu.Item key="2">
                      <Link to={`${match.url}/change`}>修改密码</Link >
                    </Menu.Item>
                    <Menu.Item key="3">
                      <Link to={`${match.url}/bindWallet`}>绑定第三方钱包</Link >
                    </Menu.Item>
                    <Menu.Item key="4">
                      <Link to={`${match.url}/bindAccount`}>绑定第三方账户</Link >
                    </Menu.Item>
                  </ItemGroup>
                  <ItemGroup key="g2">
                    <Menu.Item key="5">
                      <Link to='/account/logout'>退出登录</Link >
                    </Menu.Item>
                  </ItemGroup>
                </Menu>
              </Sider>

                <Content>
                  <Switch>
                    <Route exact path='/account/info/' component={InfoUser} />
                    <Route path='/account/info/change' component={Change} />
                    <Route path='/account/info/bindAccount' component={BindAccount} />
                    <Route path='/account/info/bindWallet' component={BindWallet} />
                    <Route component={() => <div> 404 </div>} />
                  </Switch>
                </Content>

            </Layout>

          </Col>
        </Row>
      </div>
    )
  }
};

export default withScatter(User);
