import React from "react";
import { Layout, Row, Col } from "antd";
import { Link } from "react-router-dom";
import config from '../config'
import intl from "react-intl-universal";

const i18n = (name) => intl.get(`footer.${name}`)

const { Footer } = Layout;

const SocialItem = ({link = "", name}) => {
    const iconClass = `iconfont icon-${name}`
    const iconExtraStyle = { fontSize: "1.5rem" }
    return (
    <a href={link} 
        target="_blank" style={{textDecoration: 'none', display: "block", margin: "0.5rem", float: "left"}}>
            <i className={iconClass} style={iconExtraStyle} />
    </a>)
}

function FooterComponent() {
    return (
        <Footer style={{ textAlign: 'left' }}>
            <Row>
                <Col md={6} xs={24}>
                    <h1>{config.sitename}</h1>
                    <h3> Slogan Here. </h3>
                    <br/>
                    <p> © 2018 {config.sitename} All Right Reserved. </p>
                </Col>
                <Col md={6} xs={24}>
                    <h2>{i18n("joinus")}</h2>
                    <SocialItem name='telegram' />
                    <SocialItem name='youtube' />
                    <SocialItem name='twitter' />
                    <SocialItem name='weibo' />
                    <SocialItem name='facebook' />
                </Col>
                <Col md={6} xs={24}>
                    <h2>{i18n("explain")}</h2>
                    <ul style={{listStyleType: "none"}}>
                        <li><Link to="/tos"> {i18n("service")} </Link></li>
                    </ul>
                </Col>
                <Col md={6} xs={24}>
                    <h2>{i18n("about")}</h2>
                    <ul>
                        <li>
                            <a href="" target="_blank" >External Link</a> 
                        </li>
                        <li><Link to="/"> Internal Link </Link></li>
                    </ul>
                </Col>
            </Row>
          
        </Footer>
    )
}

export default FooterComponent