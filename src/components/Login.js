import React from 'react';
import '../App.css';
import axios from 'axios';

class Login extends React.Component {
    state = {
      email: "",
      password: "",
      showEmailError: false,
      showLoginError: false
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

        axios.post(`https://localhost:44385/api/auth`, body)
        .then(res => {
          console.log(res.status);
          this.props.saveUserDetails(res.data.userId, res.data.fullName, res.data.token)

        })
        .catch(error => { 
          console.log("error :"+error);
          this.setState(() => ({
            showEmailError: false,
            showLoginError: true
          }));

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

      const { email, password, showEmailError, showLoginError } = this.state;

      return (
        <div className="App">
          <header className="App-header">
            <h1>Login</h1>
            <form className='create-contact-form'
                onSubmit={this.handleSubmit}>
                    <div className='create-contact-details'>
                        <div className='form-element'>
                          <label>Email</label>
                          <input type='text' name='email' placeholder='someone@domain.com' value= {email} onChange={this.handleChangeEmail} />
                        </div>
                        <div className='form-element'>
                          <label>Password</label>
                          <input type='password' name='password' placeholder='password' value= {password} onChange={this.handleChangePassword} />
                        </div>
                        <button className='form-element'
                        disabled={email === "" || password === ""}>Login</button>
                    </div>
            </form>
            {showEmailError=== false ? '': (
            <div style={{"color": "red"}}>
            Please enter a valid email
          </div>
            )}
            {showLoginError=== false ? '': (
            <div style={{"color": "red"}}>
            Username or password is not correct
          </div>
            )}
          </header>
        </div>
      );
    }
  
  }
  
  export default Login;