import React from "react"
import config from "../config";

const logo = 'https://i.loli.net/2018/07/14/5b495a8628987.jpg'

const bannerStyle = {
    padding: `6rem`,
    color: `#fafafa`,
    width: "100%", minHeight: "48rem",
    background: `url(${logo})`, backgroundSize: 'cover'
}

const titleStyle = {
    opacity: 1, transform: `translate(0px, 0px)`,
    fontSize: `68px`,
    color: `#fafafa`,
    fontWeight: 600,
    lineHeight: `76px`,
    margin: `8px 0 28px`,
    letterSpacing: 0
}

export default function Home() {
    return (<div className="index-page">
        <div className="banner" style={bannerStyle}>
            <h1 style={ titleStyle }>
                {config.sitename}
            </h1>
            <p style={{
                opacity: 1, transform: `translate(0px, 0px)`, fontSize: `20px`,
                lineHeight: `40px`,
            }}>
                币本位查看法币涨跌</p>
            <p> </p>
        </div>
        {/* <img src={logo} alt="给你比心" style={{ maxWidth: "100%" }} /> */}
    </div>)
}