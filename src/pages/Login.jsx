import React from "react"
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';

class Login extends React.Component {
    render() {
        return (
            <MuiThemeProvider>
              <div style={style.container}>
                    <h2>登录用户</h2>
                    <TextField
                      floatingLabelText="邮箱"
                      floatingLabelFixed={true}
                    />
                    <br />
                    <TextField
                      floatingLabelText="密码"
                      floatingLabelFixed={true}
                    />
                    <br />
                    <br />
                    <br />
                    <RaisedButton label="登录" primary={true} />
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

export default Login;
