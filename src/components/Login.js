import React from 'react';
import '../App.css';
import axios from 'axios';

class Login extends React.Component {
    state = {
      email: "",
      password: "",
      showEmailError: false,
      showLoginError: false,
      isLoading: false
    };

    handleChangeEmail = e => {
      const text = e.target.value;
  
      this.setState(() => ({
        email: text
      }));
    };

    handleChangePassword = e => {
      const text = e.target.value;
  
      this.setState(() => ({
        password: text
      }));
    };

    handleSubmit = (e) =>{
      e.preventDefault()
      const {email } = this.state;
      const reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

      const validEmail= reg.test(email);
      if(validEmail){
        this.setState(() => ({
          showEmailError: false,
        }));

        const formData = new FormData(e.target)
        const body = {}
        formData.forEach((value, property) => body[property] = value)
        const that = this;

        const { startLoading, finishLoading, saveUserDetails, localAPI, remoteAPI } = this.props;

        startLoading();
        this.setState({
          isLoading: true
        });

        axios.post(`${localAPI}/auth`, body)
        .then(res => {
          console.log(res.status);
          saveUserDetails(res.data.userId, res.data.fullName, res.data.token)
          finishLoading();
          this.setState({
            showEmailError: false,
            showLoginError: false,
            isLoading: false
          });
        })
        .catch(error => { 
          console.log("error :"+error);
          this.setState(() => ({
            showEmailError: false,
            showLoginError: true,
            isLoading: false
          }));
          finishLoading();
        })
      }
      else{
        this.setState(() => ({
          showEmailError: true,
          showLoginError: false,
          email: ''
        }));
      }
    }
    render(){

      const { email, password, showEmailError, showLoginError, isLoading } = this.state;

      return (
        <div className="App">
          <header className="App-header">
            <br/>
            <h1>Login</h1>
            <br/>
            <form
                onSubmit={this.handleSubmit}>
                    <div>
                        <div className='form-group'>
                          <label>Email</label>
                          <input type='text' className='form-control' name='email' placeholder='someone@domain.com' value= {email} onChange={this.handleChangeEmail} />
                        </div>
                        <div className='form-group'>
                          <label>Password</label>
                          <input type='password' className='form-control' name='password' placeholder='password' value= {password} onChange={this.handleChangePassword} />
                        </div>
                        <button className='btn btn-primary'
                        disabled={email === "" || password === "" || isLoading===true}>Login</button>
                    </div>
            </form>
            <br/>
            {showEmailError=== false ? '': (
            <div className="alert alert-danger" role="alert">
              Please enter a valid email
            </div>
            )}
            {showLoginError=== false ? '': (
            <div className="alert alert-danger" role="alert">
              email/password is not correct
          </div>
            )}
          </header>
        </div>
      );
    }
  
  }
  
  export default Login;