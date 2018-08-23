import React, { Component } from 'react';
import { getMyInfo } from "./api/auth";
import { userLogin } from "./actions";
import intl from 'react-intl-universal';

// Connecting store's state as props in the export process at the bottom
import { connect } from "react-redux";

// React-router stuff
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import locales from "./locale";

// Async Load Pages using react-loadable(https://github.com/jamiebuilds/react-loadable)
import acctTestRoutes from "./containers/Account";
import { Dapp, Home } from "./pages/asyncRenderWrapper";
import Market from "./pages/Market";

// Page
import Footer from "./components/Footer";
import Header from "./containers/VisiableHeader";
import PageNotFound from "./pages/PageNotFound";
// Content
import withContent from "./pages/ContentWrapper";
// Dapp Store
import DappDetail from "./pages/DappStore/DappDetail";
// Market
// import MarketDetail from "./pages/Market/MarketDetail";

import './App.css';


class App extends Component {
  constructor() {
    super()
    this.state = {
      i18nLoaded: false
    }
  }
  
  async componentDidMount() {
    const { lang, saveUserData } = this.props
    console.info(`用户语言为: ${lang}`)
    // i18n 的黑魔法，不 await 阻塞会引起部分i18n文字为空白
    await intl.init({
      currentLocale: lang,
      locales,
    })
    this.setState({ i18nLoaded: true })
    getMyInfo().then(res => {
      saveUserData(res)
    })
  }
  render() {
    return this.state.i18nLoaded && (
        <div className="App">
          <Router basename="/">
            <div className="container" >
              <div style={{ minHeight: 'calc(100vh - 70px)' }}>
                <Header />
                <div className="router-view" >
                  <Switch>
                    <Route exact path="/" component={Home} />
                    {/* Routes Account Part */}
                    <Route path="/account" >
                      <Switch>
                        {acctTestRoutes.map(route => <Route key={route.path} {...route} />)}
                      </Switch>
                    </Route>
                    {/* Routes Dapp Store Part */}
                    <Route path="/dapp" component={withContent(Dapp)} />
                    <Route path="/dappdetail/:symbol/:exchange" component={DappDetail} />
                    {/* Routes Market Data Part */}
                    <Route path="/market" component={Market} />
                    <Route component={PageNotFound} />
                  </Switch>
                </div>
              </div>
              <Footer />
            </div>

          </Router>
        </div>
    );
  }
}


export default connect(
  (state) => ({ lang: state.lang }),
  (dispatch) => ({
    saveUserData: code => dispatch(userLogin(code)),
  })
)(App);
