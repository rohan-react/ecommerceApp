import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./redux/Store";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ContextProvider } from "./Context";
import Menu from "./component/Menu";
import Navbar from "./component/Navbar";
import Cart from "./component/Cart";
import Login from "./component/Login";
import Register from "./component/Register";
import "./App.css";

export default class App extends Component {
  render() {
    {
      return (
        <Provider store={store}>
          <Router>
            <Navbar />
            <Route exact path="/" render={() => <Menu />} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Router>
        </Provider>
      );
    }
  }
}
