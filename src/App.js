import React, { Component } from 'react';
import { Layout } from 'antd';
import intl from 'react-intl-universal';

// Connecting store's state as props in the export process at the bottom
import { connect } from "react-redux";

// React-router stuff
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import locales from "./locale";

// Pages
import SimpleMarket from "./components/crypto/SimpleMarketView";
import VisiableHeader from "./containers/VisiableHeader";
import PageNotFound from "./pages/PageNotFound";
import { Market, Home } from "./pages/asyncRenderWrapper";
import Dapp from "./pages/Dapp";
import config from './config'
import './App.css';
import AccountView from "./pages/User";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Detail from "./pages/DappDetail";

const { Footer } = Layout;

// const AccountView = ({match}) => (
//   <div className="account"> {JSON.stringify(match)} </div>
// )

class App extends Component {
  constructor() {
    super()
    this.state = {
      i18nLoaded: false
    }
  }
  async componentDidMount() {
    const { lang } = this.props
    console.info(`用户语言为: ${lang}`)
    // i18n 的黑魔法，不 await 阻塞会引起部分i18n文字为空白
    await intl.init({
      currentLocale: lang,
      locales,
    })
    this.setState({ i18nLoaded: true })
    console.log(intl.get('welcome'))
  }
  render() {
    return this.state.i18nLoaded && (
      <div className="App">
        <Router basename="/">
          <div className="container" style={{ minHeight: 'calc(100vh - 70px)' }}>
            {/* <Header /> */}
            <VisiableHeader />
            <div className="router-view" >
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/market" component={Market} />

                {/* Routes Account Part */}
                <Route path="/account" >
                  <Switch>
                    <Route path="/account/info" component={AccountView} />
                    <Route path="/account/login" component={Login} />
                    <Route path="/account/register" component={Register} />
                    <Route component={PageNotFound} />
                  </Switch>
                </Route>

                <Route path="/coin/:symbol/:fiat" component={SimpleMarket} />
                <Route path="/dapp" component={Dapp} />
                <Route path="/detail" component={Detail} />
                <Route component={PageNotFound} />
              </Switch>
            </div>


          </div>
        </Router>
        <Footer style={{ textAlign: 'center' }}>
          {config.sitename} ©2018
        </Footer>
      </div>
    );
  }
}


export default connect(
  (state) => ({ lang: state.lang })
)(App);
