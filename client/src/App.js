import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Homepage from "./components/Homepage";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Route exact path="/homepage" render={() => <Homepage />} />
        </Router>
      </div>
    );
  }
}

export default App;
