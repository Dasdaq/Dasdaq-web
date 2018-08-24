import React, { Component } from "react";
// import intl from "react-intl-universal";
import { NavLink } from 'react-router-dom';
import { Menu, Icon, Modal, Select } from "antd";
import menus from "./menus";
import smartNavbarColor from "./smartColor";
import intl from "react-intl-universal";


const langList = {
    "zh-CN": "中文",
    "en-US": "English",
    "ja-JP": "日本語",
    "ko-KR": "한국말"
}

const Option = Select.Option;


const MenuItem = ({ path, name, icon, float = 'left' }) => {
    const smartIconStyle = name ? {} : { marginRight: 0 }
    return (
        <Menu.Item key={path} style={{ float }} >
            <NavLink to={path}>
                {icon && <Icon type={icon} style={smartIconStyle} />}
                {name && <span>{name}</span>}
            </NavLink>
        </Menu.Item>
    )
}

class NavbarComponent extends Component {
    constructor() {
        super()
        this.state = {
            settingVisible: false
        }
    }

    setSettingVisible(settingVisible) {
        this.setState({ settingVisible })
    }

    render() {
        const { settingVisible } = this.state
        const { location, lang, theme, crypto, user } = this.props
        const { setCrypto, setLanguage, setTheme } = this.props
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

                <Menu.Item style={{ float: 'right' }} onClick={() => this.setSettingVisible(true)}>
                    <Icon type="setting" />
                    {intl.get('setting.setting')}
                </Menu.Item>

                <Modal
                    title={intl.get('setting.setting')}
                    visible={settingVisible}
                    onOk={() => this.setSettingVisible(false)}
                    onCancel={() => this.setSettingVisible(false)}
                >
                    {intl.get('setting.setunit')}
                <Select defaultValue={crypto} style={{ width: 120 }} onChange={(value) => setCrypto(value)}>
                        <Option value="BTC">Bitcoin</Option>
                        <Option value="ETH">Ethereum</Option>
                        <Option value="EOS">EOS</Option>
                    </Select>
                    <br />
                    <br />
                    {intl.get('setting.setlang')}
                <Select defaultValue={langList[lang]} style={{ width: 120 }} onChange={(value) => setLanguage(value)}>
                        <Option value="SWITCH_TO_CHINESE">中文</Option>
                        <Option value="SWITCH_TO_ENGLISH">English</Option>
                        <Option value="SWITCH_TO_JAPANESE">日本語</Option>
                        <Option value="SWITCH_TO_KOREAN">한국말</Option>
                    </Select>
                    <br />
                    <br />
                    {intl.get('setting.setcolor')}
                <Select defaultValue={theme} style={{ width: 120 }} onChange={(value) => setTheme(value)}>
                        <Option value="SWITCH_TO_DARK">DARK</Option>
                        <Option value="SWITCH_TO_LIGHT">LIGHT</Option>
                    </Select>
                </Modal>
            </Menu>
        )
    }
}

export default NavbarComponent