
import React from "react";
import { NavLink, withRouter } from 'react-router-dom';
import { Layout, Menu as AntMenu, Icon } from "antd";
const { Header } = Layout;

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

const MenuItem = ({path, name, icon}) => 
<AntMenu.Item key={path}>
<NavLink to={path}>
    {icon ? <Icon type={icon} /> : <div/>}
   <span>{name}</span>
</NavLink>
</AntMenu.Item>

function HeaderComponent({ location }) {
    return (<Header>
        <div className="logo" />
        <AntMenu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['/']}
            selectedKeys={[location.pathname]}
            style={{ lineHeight: '64px' }}>
            {
                navigationMenus.map(MenuItem)
            }
        </AntMenu>
    </Header>)
}

export default withRouter(HeaderComponent)