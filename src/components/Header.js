
import React from "react";
import { NavLink, withRouter } from 'react-router-dom';
import { Layout, Menu, Icon } from "antd";
const { Header } = Layout;
const {SubMenu} = Menu

const navigationMenus = [
    {
        path: '/',
        icon: 'home',
        name: '首页'
    },
    {
        path: '/market',
        icon: 'area-chart',
        name: '市场'
    },
    {
        path: '/about',
        name: '关于'
    },
]


const MenuItem = ({ path, name, icon }) =>
    <Menu.Item key={path}>
        <NavLink to={path}>
            {icon ? <Icon type={icon} /> : <div />}
            <span>{name}</span>
        </NavLink>
    </Menu.Item>

const DockToRightMenuItem = ({ desc, action }) => (
    <Menu.Item onClick={action} style={{ float: 'right' }}>
        {desc}
    </Menu.Item>
)

function RightMenu() {
    return (
        <Menu.Item style={{ float: 'right' }}>
            语言
        </Menu.Item>
    )
}

function HeaderComponent({ location }) {
    return (<Header>
        <div className="logo" />
        <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['/']}
            selectedKeys={[location.pathname]}
            style={{ lineHeight: '64px' }}>
            {
                navigationMenus.map(MenuItem)
            }
            <Menu.Item style={{ float: 'right' }}>
                当前货币：BTC
            </Menu.Item>
            <SubMenu key="sub4" title={<span><Icon type="setting" /><span>语言</span></span>}>
                <Menu.Item key="9">Option 9</Menu.Item>
                <Menu.Item key="10">Option 10</Menu.Item>
                <Menu.Item key="11">Option 11</Menu.Item>
                <Menu.Item key="12">Option 12</Menu.Item>
            </SubMenu>
            <Menu.Item style={{ float: 'right' }}>
                黑白
            </Menu.Item>
        </Menu>
    </Header>)
}

export default withRouter(HeaderComponent)