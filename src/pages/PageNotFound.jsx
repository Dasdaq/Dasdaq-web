import React from "react";
import { Icon, Button } from "antd";
import { withRouter } from "react-router-dom";

const IconStyle = {
    fontSize: "12rem",
    background: "#f5222d",
    color: "#FFF",
    borderRadius: "100%"
}

const buttonStyle = {
    margin: "0.5rem"
}

const PageNotFound = 
    ({location}) => (
    <div id="page-not-found">
        <Icon type="exclamation" style={IconStyle} />
        <h1 className="title">Oops, something went wrong.</h1>
        <h1 className="title">Code 404</h1>
        <h2 className="subtitle">
        The page you requested { location.pathname } is not exist. </h2>
        <p className="description"> If you were directed to here, please let us know! </p>
        <Button type="primary" size="large" style={buttonStyle}> Go back </Button>
        <Button type="primary" size="large" style={buttonStyle}> Go to HomePage </Button>
    </div>
)

export default withRouter(PageNotFound)