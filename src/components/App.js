import React, {Fragment} from 'react';
import LoadingBar from 'react-top-loading-bar';
import { HashRouter as Router, Route, NavLink, withRouter } from "react-router-dom";
import '../App.css';

import Login from "./Login";
import Register from "./Register";
import Reserve from "./Reserve";

class App extends React.Component {
  state = {
    userId: "",
    fullName: "",
    token: ""
  };

  logout = () => {
    this.setState(() => ({
      userId: "",
      fullName: ""
    }));
  }

  saveUserDetails= (id, name, token) =>{
    this.setState(() => ({
      userId: id,
      fullName: name,
      token: token
    }));

    console.log('token is: '+ this.state.token);
  }
  
  render(){
    return (
      <div className="App">
        <header className="App-header">
        <LoadingBar
          height={3}
          color='#f11946'
          onRef={ref => (this.LoadingBar = ref)}
        />
          <Router basename="/">
          {this.state.userId === "" ? (
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
              <Route path="/register" exact render={props =><Register
              startLoading={() => this.LoadingBar.continuousStart()}
              finishLoading={() => this.LoadingBar.complete()} />} 
              />
              
              <Route path="/" exact render={props => <Login 
                saveUserDetails = {this.saveUserDetails}
                startLoading={() => this.LoadingBar.continuousStart()}
              finishLoading={() => this.LoadingBar.complete()}/>} />
            </Fragment>
              ) : (
                <Fragment>
                  <ul className="Nav-list">
                    <li><a href='#'>Welcome {this.state.fullName}</a></li>
                    <li><a href="#" onClick={this.logout}>Logout</a></li>
                  </ul> 
                  <Reserve token={this.state.token} userId={this.state.userId}
                  startLoading={() => this.LoadingBar.continuousStart()}
                  finishLoading={() => this.LoadingBar.complete()} />
                </Fragment>
              )}
          </Router>
      </header>
      </div>
    );
  }

}

export default App;
