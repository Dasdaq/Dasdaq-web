import React, { Component } from "react";
import {Col, Row, Form, Icon, Input, Button} from 'antd';
import Left from "./Left";

const FormItem = Form.Item;

class InfoUser extends Component {
    constructor() {
        super()
    }

    renderInfo() {
        return <Form style={ style.container }>
                <h2>个人信息</h2>
                <br />
                <FormItem>
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                </FormItem>
                <FormItem>
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="邮箱" />
                </FormItem>
                <FormItem>
                  <Button type="primary" htmlType="submit" className="login-form-button">
                    确认修改
                  </Button>
                </FormItem>
              </Form>
    }

    render() {
        return (
            <div>
                <Row>
                    <Col span={4}>
                        <Left />
                    </Col>
                    <Col span={20}>
                        { this.renderInfo() }
                    </Col>
                </Row>
            </div>
        )
    }
}

const style = {
    container: {
      maxWidth: '300px',
      padding: '30px',
      marginLeft: 'auto',
      marginRight: 'auto',
    }
}

export default InfoUser;