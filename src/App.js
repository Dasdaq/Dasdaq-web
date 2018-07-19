import React, { Component } from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SimpleMarket from "./components/crypto/SimpleMarketView";
import VisiableHeader from "./containers/VisiableHeader";
import PageNotFound from "./pages/PageNotFound";
import Home from "./pages/Home";
import Market from "./pages/Market";
import Dapp from "./pages/Dapp";
import config from './config'
import './App.css';
const { Footer } = Layout;

const AccountView = ({match}) => (
  <div className="account"> {JSON.stringify(match)} </div>
)

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router basename="/">
            <div className="container">
              {/* <Header /> */}
              <VisiableHeader />
              <div className="router-view" >
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/market" component={Market} />
                
                {/* Routes Account Part */}
                <Route path="/account">
                  <Switch>
                    <Route path="/account/login" component={AccountView} />
                    <Route path="/account/register" component={AccountView} />
                    <Route component={PageNotFound} />
                  </Switch>
                </Route>

                <Route path="/coin/:symbol/:fiat" component={SimpleMarket} />
                <Route path="/dapp" component={Dapp} />
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

export default App;
