import React from "react";
import { Layout, Row, Col } from "antd";
import { Link } from "react-router-dom";
import config from '../config'

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
                <Col span={6}>
                    <h1>{config.sitename}</h1>
                    <h3> Slogan Here. </h3>
                    <br/>
                    <p> © 2018 {config.sitename} All Right Reserved. </p>
                </Col>
                <Col span={6}>
                    <h2>加入我们的社群</h2>
                    <SocialItem name='telegram' />
                    <SocialItem name='youtube' />
                    <SocialItem name='twitter' />
                    <SocialItem name='weibo' />
                    <SocialItem name='facebook' />
                </Col>
                <Col span={6}>
                    <h2>条款说明</h2>
                    <ul style={{listStyleType: "none"}}>
                        <li><Link to="/tos"> 服务条款 </Link></li>
                    </ul>
                </Col>
                <Col span={6}>
                    <h2>关于</h2>
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