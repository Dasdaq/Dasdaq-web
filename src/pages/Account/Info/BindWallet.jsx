import React, { Component } from "react";
import { Card, Alert, Button, notification} from 'antd';
import IconFont from "../../../components/IconFont";
import { sign, getMyAddr } from "../../../apieth"
import { bindMetaMask, bindScatter } from "../../../api/auth";

const style = {
    walletContainer: {
      maxWidth: '800px',
      padding: '30px',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
};

class InfoUser extends Component {

    async requestIdentity() {
        const { scatter } = this.props
        try {
          const identity = await scatter.getIdentity({ accounts: [this.eosNetwork] })
          this.setState({ identity })
        } catch (error) {
          console.error(error.message)
        }
    }

    async signByMetaMask(e) {
        const account = await getMyAddr()
        const signature = await sign("dasdaq")
        console.log(signature)
        try {
          await bindMetaMask({ eth_address: account, metamask_signature: signature.result })
          notification.success({
            message: '绑定成功'
          })
        } catch (error) {
          notification.error({
            message: error.message
          })
        }
    }

    async requestIdAndSignWithScatter() {
        await this.requestIdentity()
        try {
          const scatter_signature = await this.getSignatureWithScatter()
          console.info('eos_signature' + scatter_signature)
          const eos_address = this.state.identity.accounts[0].name
          await bindScatter({ eos_address, scatter_signature })
          notification.success({
            message: `Scatter EOS 身份绑定成功, 你的 EOS 账户名: ${eos_address}`
          })
        } catch (error) {
          notification.error({
            message: error.message
          })
        }
    }

    async getSignatureWithScatter() {
        const { scatter } = this.props
        if (!this.state.identity) {
          return null;
        }
        const { publicKey } = this.state.identity
        const signMsg = "By Signing, you will bind your Scatter identity with your account."
    
        return scatter.getArbitrarySignature(
          publicKey, signMsg, 'Login Authentication', false)
    }

    renderWallet() {
        const { scatter } = this.props
        return <div style={style.walletContainer}>
        <h2>绑定钱包</h2>
        <Card title="使用钱包签名绑定账号" style={{ margin: "1rem" }}>
            <Alert
            message={
                <div> 使用 <IconFont name="metamask" /> MetaMask
                            或 <IconFont name="scatter" /> Scatter 钱包签名绑定 </div>
            }
            description="绑定账户后，登录时无需再输入账户密码，体验安全快捷、无需密码的登录方式！"
            type="info"
            iconType="key"
            showIcon
            style={{ marginBottom: "1rem" }}
            />
            <Button.Group>
            <Button size="large" onClick={this.signByMetaMask}>
                <IconFont name="metamask" /> MetaMask 签名绑定</Button>
            <Button size="large" disabled={!scatter}
                onClick={e => this.requestIdAndSignWithScatter(e)}>
                <IconFont name="scatter" /> Scatter 签名绑定</Button>
            </Button.Group>
        </Card>
        </div>
      }

    render() {
        return (
            <div>
                { this.renderWallet() }
            </div>
        )
    }
}

export default InfoUser;