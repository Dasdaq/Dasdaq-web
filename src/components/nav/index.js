import React from "react";
import intl from "react-intl-universal";
import { NavLink } from 'react-router-dom';
import { Menu, Icon, Modal, Select } from "antd";
import menus from "./menus";
import smartNavbarColor from "./smartColor";


const langList = {
    "zh-CN": "中文",
    "en-US": "English",
    "ja-JP": "日本語",
    "ko-KR": "한국말"
}

const Option = Select.Option;


const { SubMenu } = Menu
const navbarI18n = (name) => intl.get(`navbar.${name}`)

const MenuItem = ({ path, name, icon, float = 'left' }) => {
    const smartIconStyle = name ?  {} : { marginRight: 0 }
    return (
        <Menu.Item key={path} style={{ float }} >
            <NavLink to={path}>
                {icon && <Icon type={icon} style={smartIconStyle} />}
                {name && <span>{name}</span>}
            </NavLink>
        </Menu.Item>
    )
}

export default function Navbar(props) {
    const { location, lang, theme, crypto, user, settingVisible } = props
    const { setCrypto, setLanguage, setTheme, setSettingVisible } = props
    // Each Time Render read the menus and the navbar color
    const logined = user !== null
    const navigationMenus = menus({ logined })
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

            <Menu.Item style={'right'} onClick={() => setSettingVisible(true)}>
                设置
            </Menu.Item>

            <Modal
              title="设置"
              visible={settingVisible}
              onOk={() => setSettingVisible(false)}
              onCancel={() => setSettingVisible(false)}
            >
                选择单位：
                <Select defaultValue={crypto} style={{ width: 120 }} onChange={(value) => setTheme(value)}>
                  <Option value="BTC">Bitcoin</Option>
                  <Option value="ETH">Ethereum</Option>
                  <Option value="EOS">EOS</Option>
                </Select>
                <br />
                <br />
                选择语言：
                <Select defaultValue={langList[lang]} style={{ width: 120 }} onChange={(value) => setTheme(value)}>
                  <Option value="SWITCH_TO_CHINESE">中文</Option>
                  <Option value="SWITCH_TO_ENGLISH">English</Option>
                  <Option value="SWITCH_TO_JAPANESE">日本語</Option>
                  <Option value="SWITCH_TO_KOREAN">한국말</Option>
                </Select>
                <br />
                <br />
                主题色：
                <Select defaultValue={theme} style={{ width: 120 }} onChange={(value) => setTheme(value)}>
                  <Option value="SWITCH_TO_DARK">DARK</Option>
                  <Option value="SWITCH_TO_LIGHT">LIGHT</Option>
                </Select>
            </Modal>
        </Menu>
    )
}



            // <SubMenu
            //     style={{ float: 'right' }}
            //     title={<span> {theme} </span>}>
            //     <Menu.Item onClick={() => setTheme('SWITCH_TO_DARK')}> DARK </Menu.Item>
            //     <Menu.Item onClick={() => setTheme('SWITCH_TO_LIGHT')}> LIGHT </Menu.Item>
            // </SubMenu>
            // <SubMenu
            //     style={{ float: 'right' }}
            //     title={<span><Icon type="global" /><span> {langList[lang]} </span></span>}>
            //     <Menu.Item onClick={() => setLanguage('SWITCH_TO_CHINESE')}>中文</Menu.Item>
            //     <Menu.Item onClick={() => setLanguage('SWITCH_TO_ENGLISH')}>English</Menu.Item>
            //     <Menu.Item onClick={() => setLanguage('SWITCH_TO_JAPANESE')}>日本語</Menu.Item>
            //     <Menu.Item onClick={() => setLanguage('SWITCH_TO_KOREAN')}>한국말</Menu.Item>
            // </SubMenu>
            // <SubMenu
            //     style={{ float: 'right' }}
            //     title={<span><Icon type="bank" /><span> {navbarI18n('unit')}: {crypto}</span></span>}>
            //     <Menu.Item onClick={() => setCrypto('BTC')}>Bitcoin</Menu.Item>
            //     <Menu.Item onClick={() => setCrypto('ETH')}>Ethereum</Menu.Item>
            //     <Menu.Item onClick={() => setCrypto('EOS')}>EOS</Menu.Item>
            // </SubMenu>