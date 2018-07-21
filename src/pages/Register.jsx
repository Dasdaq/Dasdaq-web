import React from "react"
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';

class Register extends React.Component {
    render() {
        return (
            <MuiThemeProvider>
              <div style={style.container}>
                    <h2>注册新用户</h2>
                    <TextField
                      floatingLabelText="昵称"
                      floatingLabelFixed={true}
                    />
                    <br />
                    <TextField
                      floatingLabelText="邮箱"
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
                    <RaisedButton label="注册" primary={true} />
              </div>
            </MuiThemeProvider>
        )
    }
}

const style = {
  container: {
    padding: '30px'
  },
};

export default Register;
