import React from "react"
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import ContentLink from 'material-ui/svg-icons/content/link';
import Divider from 'material-ui/Divider';
import Delete from 'material-ui/svg-icons/action/delete';
import TextField from 'material-ui/TextField';

class User extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            menuindex: 0
        }
    }

    menuClicked(event,menuItem,index) {
        this.setState( {menuindex: index} );
    }

    renderInfo() {
        if(this.state.menuindex === 0) {
        return  <Paper style={style.papercontainer} zDepth={0}>
                    <h2>个人信息</h2>
                    <TextField
                      hintText="default name"
                      floatingLabelText="昵称"
                      floatingLabelFixed={true}
                    />
                    <br />
                    <TextField
                      hintText="default email"
                      floatingLabelText="邮箱"
                      floatingLabelFixed={true}
                    />
                    <br />
                    <br />
                    <br />
                    <RaisedButton label="确认修改" primary={true} />
                </Paper>
            }
    }

    renderPassword() {
        if(this.state.menuindex === 1) {
        return  <Paper style={style.papercontainer} zDepth={0}>
                    <h2>修改密码</h2>
                    <TextField
                      floatingLabelText="旧密码"
                      floatingLabelFixed={true}
                    />
                    <br />
                    <TextField
                      floatingLabelText="新密码"
                      floatingLabelFixed={true}
                    />
                    <br />
                    <TextField
                      floatingLabelText="确认新密码"
                      floatingLabelFixed={true}
                    />
                    <br />
                    <br />
                    <br />
                    <RaisedButton label="确认修改" primary={true} />
                </Paper>
            }
    }

    renderWallet() {
        if(this.state.menuindex === 2) {
        return  <Paper style={style.papercontainer} zDepth={0}>
                    <h2>绑定钱包</h2>
                </Paper>
            }
    }

    render() {
        return (
            <MuiThemeProvider>
            <div>
                <Paper style={style.paper}>
                  <Menu onItemClick={this.menuClicked.bind(this)}>
                    <MenuItem primaryText="个人信息" leftIcon={<PersonAdd />}/>
                    <MenuItem primaryText="修改密码" leftIcon={<RemoveRedEye />} />
                    <MenuItem primaryText="绑定第三方钱包" leftIcon={<ContentLink />} />
                    <MenuItem primaryText="绑定第三方账户" leftIcon={<ContentLink />} />
                    <Divider />
                    <MenuItem primaryText="退出登录" leftIcon={<Delete />} />
                  </Menu>
                </Paper>
                { this.renderInfo() }
                { this.renderPassword() }
                { this.renderWallet() }
            </div>
            </MuiThemeProvider>
        )
    }
}

const style = {
  paper: {
    display: 'inline-block',
    float: 'left',
  },
  papercontainer: {
    padding: '30px',
    marginLeft: '200px'
  },
  rightIcon: {
    textAlign: 'center',
    lineHeight: '24px',
  },
};

export default User;
