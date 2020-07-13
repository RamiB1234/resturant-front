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
    token: "",
    localAPI: "https://localhost:44385/api",
    remoteAPI:"https://resturantapi20200713042036.azurewebsites.net/api"
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
          color='#1a1aff'
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
              localAPI = {this.state.localAPI} remoteAPI={this.state.remoteAPI}
              startLoading={() => this.LoadingBar.continuousStart()}
              finishLoading={() => this.LoadingBar.complete()} />} 
              />
              
              <Route path="/" exact render={props => <Login 
                localAPI = {this.state.localAPI} remoteAPI={this.state.remoteAPI}
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
                  localAPI = {this.state.localAPI} remoteAPI={this.state.remoteAPI}
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
