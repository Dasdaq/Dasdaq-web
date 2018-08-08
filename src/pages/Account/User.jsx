import React from "react"
import { Col, Menu, Row } from 'antd';
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

class User extends React.Component {

  eosNetwork = eosNetwork['mainnet']

  render() {
    const { match , location } = this.props
    return (
      <div>
        <Row>
          <Col span={4}>
            <Menu
              style={{ width: 256 }}
              defaultSelectedKeys={['/']}
              selectedKeys={[location.pathname]}
              defaultOpenKeys={['sub1']}
              mode="inline"
            >
              <ItemGroup key="g1">
                <Menu.Item key={`${match.url}`}>
                  <Link to={`${match.url}`}>个人信息</Link >
                </Menu.Item>
                <Menu.Item key={`${match.url}/change`}>
                  <Link to={`${match.url}/change`}>修改密码</Link >
                </Menu.Item>
                <Menu.Item key={`${match.url}/bindWallet`}>
                  <Link to={`${match.url}/bindWallet`}>绑定第三方钱包</Link >
                </Menu.Item>
                <Menu.Item key={`${match.url}/bindAccount`}>
                  <Link to={`${match.url}/bindAccount`}>绑定第三方账户</Link >
                </Menu.Item>
              </ItemGroup>
              <ItemGroup key="g2">
                <Menu.Item key="5">
                  <Link to='/account/logout'>退出登录</Link >
                </Menu.Item>
              </ItemGroup>
            </Menu>
          </Col>
          <Col span={20}>
              <Switch>
                <Route exact path='/account/info/' component={InfoUser} />
                <Route path='/account/info/change' component={Change} />
                <Route path='/account/info/bindAccount' component={BindAccount} />
                <Route path='/account/info/bindWallet' component={BindWallet} />
                <Route component={() => <div> 404 </div>} />
              </Switch>
          </Col>
        </Row>
      </div>
    )
  }
};

export default withScatter(User);
