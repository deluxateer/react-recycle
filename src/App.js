import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { UserIsAuthenticated, UserIsNotAuthenticated } from "./lib/auth";

import { Provider } from "react-redux";
import store from "./store";

import AppNavbar from "./components/layout/AppNavbar";
import Dashboard from "./components/layout/Dashboard";
import TipsAndFacts from "./components/layout/TipsAndFacts";
import Footer from "./components/layout/Footer";
import Items from "./components/items/Items";
import AddItem from "./components/items/AddItem";
import EditItem from "./components/items/EditItem";

import Login from "./components/auth/Login";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <AppNavbar />
            <div className="container">
              <Switch>
                <Route
                  exact
                  path="/"
                  component={UserIsAuthenticated(Dashboard)}
                />
                <Route
                  exact
                  path="/statistics"
                  component={UserIsAuthenticated(Dashboard)}
                />
                <Route
                  exact
                  path="/tipsfacts"
                  component={UserIsAuthenticated(TipsAndFacts)}
                />
                <Route
                  exact
                  path="/items"
                  component={UserIsAuthenticated(Items)}
                />
                <Route
                  exact
                  path="/item/add"
                  component={UserIsAuthenticated(AddItem)}
                />
                <Route
                  exact
                  path="/item/edit/:id"
                  component={UserIsAuthenticated(EditItem)}
                />
                <Route
                  exact
                  path="/login"
                  component={UserIsNotAuthenticated(Login)}
                />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
