
import React from "react";
import { NavLink } from 'react-router-dom';
import { Layout, Menu, Icon } from "antd";
const { Header } = Layout;
const { SubMenu } = Menu

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


const HeaderComponent = ({ location, lang, setLanguage}) => {
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
            <SubMenu 
            style={{ float: 'right' }} 
            title={<span><Icon type="global" /><span>语言 {lang}</span></span>}>
                <Menu.Item onClick={() => setLanguage('SWITCH_TO_CHINESE')}>中文</Menu.Item>
                <Menu.Item onClick={() => setLanguage('SWITCH_TO_ENGLISH')}>English</Menu.Item>
                <Menu.Item onClick={() => setLanguage('SWITCH_TO_JAPANESE')}>日本語</Menu.Item>
                <Menu.Item onClick={() => setLanguage('SWITCH_TO_KOREAN')}>한국말</Menu.Item>
            </SubMenu>
            <Menu.Item style={{ float: 'right' }}>
                黑白
            </Menu.Item>
        </Menu>
    </Header>)
}

export default HeaderComponent