import React from "react";
import intl from "react-intl-universal";
import { NavLink } from 'react-router-dom';
import { Menu, Icon } from "antd";
import { menus } from "./menus";
import smartNavbarColor from "./smartColor";


const langList = {
    "zh-CN": "中文",
    "en-US": "English",
    "ja-JP": "日本語",
    "ko-KR": "한국말"
}


const { SubMenu } = Menu
const navbarI18n = (name) => intl.get(`navbar.${name}`)

const MenuItem = ({ path, name, icon, float = 'left' }) => (
    <Menu.Item key={path} style={{ float }} >
        <NavLink to={path}>
            {   icon
                ? <Icon type={icon} /> 
                : <div />
            }
            <span>{name}</span>
        </NavLink>
    </Menu.Item>
)

export default function Navbar(props) {
    const { location, lang, theme, crypto } = props
    const { setCrypto, setLanguage, setTheme } = props
    // Each Time Render read the menus and the navbar color
    const navigationMenus = menus()
    const { otherColor } = smartNavbarColor({ location, theme })
    const menuStyle = {
        lineHeight: '64px',
        background: otherColor,
        borderBottomColor: otherColor,
    }
    return (
        <Menu
            theme={theme} mode="horizontal" defaultSelectedKeys={['/']}
            selectedKeys={[location.pathname]} style={menuStyle}>
            {
                // all magics happened right here
                navigationMenus.map(MenuItem)
            }

            <SubMenu
                style={{ float: 'right' }}
                title={<span> {theme} </span>}>
                <Menu.Item onClick={() => setTheme('SWITCH_TO_DARK')}> DARK </Menu.Item>
                <Menu.Item onClick={() => setTheme('SWITCH_TO_LIGHT')}> LIGHT </Menu.Item>
            </SubMenu>
            <SubMenu
                style={{ float: 'right' }}
                title={<span><Icon type="global" /><span> {langList[lang]} </span></span>}>
                <Menu.Item onClick={() => setLanguage('SWITCH_TO_CHINESE')}>中文</Menu.Item>
                <Menu.Item onClick={() => setLanguage('SWITCH_TO_ENGLISH')}>English</Menu.Item>
                <Menu.Item onClick={() => setLanguage('SWITCH_TO_JAPANESE')}>日本語</Menu.Item>
                <Menu.Item onClick={() => setLanguage('SWITCH_TO_KOREAN')}>한국말</Menu.Item>
            </SubMenu>
            <SubMenu
                style={{ float: 'right' }}
                title={<span><Icon type="bank" /><span> {navbarI18n('unit')}: {crypto}</span></span>}>
                <Menu.Item onClick={() => setCrypto('BTC')}>Bitcoin</Menu.Item>
                <Menu.Item onClick={() => setCrypto('ETH')}>Ethereum</Menu.Item>
                <Menu.Item onClick={() => setCrypto('EOS')}>EOS</Menu.Item>
            </SubMenu>
        </Menu>
    )
}