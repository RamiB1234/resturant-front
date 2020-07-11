import React, {Fragment} from 'react';
import { HashRouter as Router, Route, NavLink } from "react-router-dom";
import '../App.css';

import Login from "./Login";
import Register from "./Register";
import Reserve from "./Reserve";

class App extends React.Component {
  state = {
    guestId: "",
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
                <li>
                  <NavLink to ='/'>
                        Login
                  </NavLink>
                </li>
                <li>
                  <NavLink to ='/register'>
                        Register
                  </NavLink>
                </li>
              </ul> 
              <h3>Welcome to Resturant Reservation System V0.1</h3>
              <Route path="/register" exact component={Register} />
              <Route path="/" component={Login} />
            </Fragment>
              ) : (
                <Fragment>
                  <ul className="Nav-list">
                    <li><a href="#">Logout</a></li>
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
