import React, {Fragment} from 'react';
import { HashRouter as Router, Route } from "react-router-dom";
import '../App.css';

import Login from "./Login";
import Register from "./Register";
import Reserve from "./Reserve";

class App extends React.Component {
  state = {
    guestId: "3",
    fullName: ""
  };
  render(){
    return (
      <div className="App">
        <header className="App-header">
          <Router basename="/">
          {this.state.guestId === "" ? (
            <Fragment>
              <ul className="Nav-list">
                <li><a href="default.asp">Register</a></li>
                <li><a href="news.asp">Login</a></li>
              </ul> 
              <h3>Welcome to Resturant Reservation System V0.1</h3>
              <Route path="/register" exact component={Register} />
              <Route path="/" component={Login} />
            </Fragment>
              ) : (
                <Fragment>
                  <ul className="Nav-list">
                    <li><a href="default.asp">Logout</a></li>
                  </ul> 
                  <Reserve />
                </Fragment>
              )}
          </Router>
      </header>
      </div>
    );
  }

}

export default App;