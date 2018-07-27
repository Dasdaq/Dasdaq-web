import React, { Component } from 'react';
import { Layout } from 'antd';
import intl from 'react-intl-universal';

// Connecting store's state as props in the export process at the bottom
import { connect } from "react-redux";

// React-router stuff
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import locales from "./locale";

// Async Load Pages using react-loadable(https://github.com/jamiebuilds/react-loadable)
import { Login, Register, User } from "./containers/Account";
import { Market, Home } from "./pages/asyncRenderWrapper";

// Pages
import SimpleMarket from "./components/crypto/SimpleMarketView";
import Loading from "./components/Loading";
import Header from "./containers/VisiableHeader";
import PageNotFound from "./pages/PageNotFound";
// Dapp Store
import Dapp from "./pages/DappStore/Dapp";
import withContent from "./pages/ContentWrapper";
import Detail from "./pages/DappStore/DappDetail";


import config from './config'
import './App.css';
const { Footer } = Layout;


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
  }
  render() {
    return this.state.i18nLoaded && (
      <div className="App">
        <Router basename="/">
          <div className="container" style={{ minHeight: 'calc(100vh - 70px)' }}>
            <Header />
            <div className="router-view" >
              <Switch>
                <Route exact path="/" component={Home} />
                {/* Routes Account Part */}
                <Route path="/account" >
                  <Switch>
                    <Route path="/account/info" component={User} />
                    <Route path="/account/login" component={Login} />
                    <Route path="/account/register" component={Register} />
                    <Route component={PageNotFound} />
                  </Switch>
                </Route>
                {/* Routes Dapp Store Part */}
                <Route path="/dapp" component={withContent(Dapp)} />
                {/* Routes Market Data Part */}
                <Route path="/market" component={withContent(Market)} />
                <Route path="/coin/:symbol/:fiat" component={SimpleMarket} />
                <Route path="/detail" component={Detail} />
                <Route path="/loadingTest" component={Loading} />
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
