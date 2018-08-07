
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import {
  Menu
} from 'antd';
import User from './User'
import Change from './Change'

const {
  ItemGroup,
} = Menu

const LeftComponent = () => {
    return (
      <div>
        <Router>
          <div>
            <Route path="/account/info/user" component={User}/>
            <Route path="/account/info/change" component={Change}/>
          </div>
        </Router>
        <Menu
          // onClick={this.menuClicked.bind(this)}
          style={{ width: 256 }}
          defaultSelectedKeys={['0']}
          defaultOpenKeys={['sub1']}
          mode="inline"
        >
            <ItemGroup key="g1">
              <Menu.Item key="0">
                <Link to='/account/info/user'>个人信息</Link >
              </Menu.Item>
              <Menu.Item key="1">
                <Link to='/account/info/change'>修改密码</Link >
              </Menu.Item>
              <Menu.Item key="2">
                绑定第三方钱包
              </Menu.Item>
              <Menu.Item key="3">
                绑定第三方账户
              </Menu.Item>
            </ItemGroup>
            <ItemGroup key="g2">
              <Menu.Item key="5">退出登录</Menu.Item>
            </ItemGroup>
        </Menu>
      </div>
    )
}

export default LeftComponent