import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { About } from "./components/about";
import Home from "./pages/Home";
import Construction from "./pages/Construction";
import './App.css';
const { Header, Content, Footer } = Layout;

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router basename="/">
            <div className="container">
              <Header>
                <div className="logo" />
                <Menu
                  theme="dark"
                  mode="horizontal"
                  defaultSelectedKeys={['2']}
                  style={{ lineHeight: '64px' }}
                >
                  <Menu.Item key="1">nav 1</Menu.Item>
                  <Menu.Item key="2">nav 2</Menu.Item>
                  <Menu.Item key="3">nav 3</Menu.Item>
                </Menu>
              </Header>

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
          Market ©2018
        </Footer>
      </div>
    );
  }
}

export default App;
