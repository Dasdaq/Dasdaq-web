import React, { Component } from "react";
import {Col, Row} from 'antd';

class InfoUser extends Component {
    constructor() {
        super()
    }
    render() {
        return (
            <div>
                <Row>
                    <Col span={20}>
                        嘿嘿。
                    </Col>
                </Row>
            </div>
        )
    }
}

export default InfoUser;