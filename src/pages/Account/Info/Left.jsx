
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

const {
  ItemGroup,
} = Menu

const LeftComponent = () => {
    return (
      <div>
        <Router>
          <Route path="/account/info/user" component={User}/>
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
              <Menu.Item key="1">修改密码</Menu.Item>
              <Menu.Item key="2">绑定第三方钱包</Menu.Item>
              <Menu.Item key="3">绑定第三方账户</Menu.Item>
            </ItemGroup>
            <ItemGroup key="g2">
              <Menu.Item key="5">退出登录</Menu.Item>
            </ItemGroup>
        </Menu>
      </div>
    )
}

export default LeftComponent