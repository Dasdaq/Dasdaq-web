import React from "react"
import { Icon, Button } from 'antd';
import { NavLink } from "react-router-dom";
import intl from "react-intl-universal";
import { logout } from "../../api/auth";

const i18n = (name) => intl.get(`user.logout.${name}`)

const IconStyle = {
    fontSize: "12rem",
    borderRadius: "100%"
}
const OKStyle = {
    ...IconStyle,
    background: "#52c41a",
    color: "#FFF",
}
const WarningStyle = {
    ...IconStyle,
    background: "#FFF",
    color: "#fadb14",
}

const buttonStyle = {
    margin: "0.5rem"
}


class Logout extends React.Component {
    constructor() {
        super()
        this.state = {
            isLogout: false
        }
    }

    async componentDidMount() {
        try {
            await logout()
            this.setState({ isLogout: true })
        } catch (error) {
        
        }
    }


    render() {
        const { isLogout } = this.state
        if (isLogout) {
            return (
                <div id="notification">
                    <Icon type="check" style={OKStyle} />
                    <h1 className="title">{i18n('title')} 退出成功 </h1>
                    <h2 className="subtitle">
                        你已经安全地退出了账户
                </h2>
                    <Button size="large"><NavLink to="/account/login"> 重新登录 </NavLink></Button>
                    <Button type="primary" size="large" style={buttonStyle}> {i18n('Go Back')}</Button>
                    <Button type="primary" size="large" style={buttonStyle}> {i18n('Go Home')} </Button>
                </div>
            )
        } else {
            return (
                <div id="notification">
                    <Icon type="loading" style={WarningStyle} />
                    <h1 className="title">{i18n('title')} 正在退出 </h1>
               </div>
            )
        }

    }
}


export default Logout;
