
import React from "react";
import { NavLink } from 'react-router-dom';
import intl from "react-intl-universal";
import { Layout, Menu, Icon, Row, Col } from "antd";
// import BrandLight from "../Brand-Light.svg";
// import BrandDark from "../Brand-Dark.svg";
import BrandLight from "../Brand-Light1.svg";
import BrandDark from "../Brand-Dark1.svg";
const { Header } = Layout;
const { SubMenu } = Menu




const MenuItem = ({ path, name, icon }) =>
    <Menu.Item key={path}>
        <NavLink to={path}>
            {icon ? <Icon type={icon} /> : <div />}
            <span>{name}</span>
        </NavLink>
    </Menu.Item>

function smartNavbarColor({ location, theme }) {
    const isHomePage = location.pathname === '/'
    console.info(`${location.pathname} isHomePage: ${isHomePage}`)
    const navbarThemeColor = theme === 'light' ? "#FFF" : "#000"
    const isTransparent = isHomePage === true && theme !== 'light'
    const headerBackgroundColor = isTransparent ? "rgba(0, 0, 0, 0.47)" : navbarThemeColor
    const otherColor = isTransparent ? "transparent" : headerBackgroundColor
    return { headerBackgroundColor, isTransparent, otherColor }
}

const langList = {
    "zh-CN": "中文",
    "en-US": "English",
    "ja-JP": "日本語",
    "ko-KR":"한국말"
}

const navbarI18n = (name) => intl.get(`navbar.${name}`)

const HeaderComponent = ({ location, lang, setLanguage, theme, setTheme, crypto, setCrypto }) => {
    const navigationMenus = [
        {
            path: '/',
            icon: 'home',
            name: navbarI18n('home')
        },
        {
            path: '/market',
            icon: 'area-chart',
            name: navbarI18n('market')
        },
        {
            path: '/dapp',
            icon: 'appstore',
            name: navbarI18n('app store')
        },
        {
            path: '/account',
            icon: 'user',
            name: navbarI18n('my account')
        }
    ]
    const { headerBackgroundColor, otherColor } = smartNavbarColor({ location, theme })
    // headerBackgroundColor = isHomePage === true ?  : headerBackgroundColor 
    const Brand = theme === 'light' ? BrandDark : BrandLight
    return (<Header className="header" style={{ background: headerBackgroundColor,padding: 0 }}>
        <Row style={
            {
                background: otherColor,
            }}>
            <Col xxl={4} xl={5} lg={3} sm={24} xs={24}>
                <div className="logo" >
                    <img src={Brand} alt="Dasdaq Brand"
                        style={{ maxHeight: '3rem' }}></img>
                </div>
            </Col>
            <Col xxl={20} xl={19} lg={19} sm={24} xs={24}>
                <Menu
                    theme={theme}
                    mode="horizontal"
                    defaultSelectedKeys={['/']}
                    selectedKeys={[location.pathname]}
                    style={
                        {
                            lineHeight: '64px',
                            background: otherColor,
                            borderBottomColor: otherColor,
                        }}>
                    {
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
                    <Menu.Item style={{ float: 'right' }}>
                        
            </Menu.Item>
                </Menu>
            </Col>
        </Row>
    </Header>)
}

export default HeaderComponent