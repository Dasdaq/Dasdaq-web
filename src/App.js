import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import { About } from "./components/about";
import Header from "./components/Header";
import Home from "./pages/Home";
import Construction from "./pages/Construction";
import config from './config'
import './App.css';
const { Content, Footer } = Layout;

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router basename="/">
            <div className="container">
              <Header />
              <div className="router-view" 
              // style={{ margin: "2rem 1rem" }}
              >
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
                <Route path="/my"
                  component={() => Construction({ pageName: '我的爱心' })} />
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
