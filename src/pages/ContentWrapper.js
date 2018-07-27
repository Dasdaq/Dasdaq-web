import React from "react";
import { Layout } from "antd";
const { Content } = Layout

// I don't know how to call this, Higher order Component?
// Or Just a simple Component composition 🤔️
export default (Component) => (props) => {
    return (
        <Content style={{ padding: '0 50px' }}>
            <Component {...props} />
        </Content>
    )
}
