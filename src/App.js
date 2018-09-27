import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

import AppNavbar from "./components/layout/AppNavbar";
import Dashboard from "./components/layout/Dashboard";
import TipsAndFacts from "./components/layout/TipsAndFacts";
import Footer from "./components/layout/Footer";
import Items from "./components/items/Items";
import AddItem from "./components/items/AddItem";
import EditItem from "./components/items/EditItem";

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
                <Route exact path="/" component={Dashboard} />
                <Route exact path="/statistics" component={Dashboard} />
                <Route exact path="/tipsfacts" component={TipsAndFacts} />
                <Route exact path="/items" component={Items} />
                <Route exact path="/item/add" component={AddItem} />
                <Route exact path="/item/edit/:id" component={EditItem} />
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
