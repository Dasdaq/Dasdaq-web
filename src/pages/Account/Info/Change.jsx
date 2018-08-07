import React, { Component } from "react";
import {Col, Row, Form, Icon, Input, Button, notification} from 'antd';
import { changePassword} from "../../../api/auth";

const FormItem = Form.Item;

class InfoUser extends Component {
    constructor() {
        super()
        this.state = {
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: ''
        }
    }

    handlePasswordChange(event, pwtype) {
        const obj = {}
        obj[pwtype] = event.target.value
        this.setState(obj);
    }

    async changePassword(e) {
        const { oldPassword, newPassword, confirmNewPassword } = this.state
        if (newPassword !== confirmNewPassword) {
            notification.error({
                message: '两次新密码不匹配',
                description: '请重新输入新密码.'
            })
        } else {
            try {
                await changePassword({ old_password:oldPassword, new_password:newPassword })
                    notification.success({
                    message: '密码修改成功'
                })
            } catch (error) {
                notification.error({
                    message: error.message
                })
            }
        }
    }

    renderPassword() {
        return <Form style={ style.container }>
                <h2>修改密码</h2>
                <br />
                <FormItem>
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="旧密码" 
                    value={this.state.oldPassword}
                    onChange={(e) => this.handlePasswordChange(e, 'oldPassword')}/>
                </FormItem>
                <FormItem>
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="新密码" 
                    value={this.state.newPassword}
                    onChange={(e) => this.handlePasswordChange(e, 'newPassword')}/>
                </FormItem>
                <FormItem>
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="确认新密码" 
                    value={this.state.confirmNewPassword}
                    onChange={(e) => this.handlePasswordChange(e, 'confirmNewPassword')}/>
                </FormItem>
                <FormItem>
                  <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.changePassword}>
                    确认修改
                  </Button>
                </FormItem>
              </Form>
    }

    render() {
        return (
            <div>
                <Row>
                    <Col span={20}>
                        { this.renderPassword() }
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