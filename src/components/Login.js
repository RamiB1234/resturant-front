import React from 'react';
import '../App.css';
import serializeForm from 'form-serialize'

class Login extends React.Component {
    state = {
      email: "",
      password: "",
      showEmailError: false
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
      }
      else{
        this.setState(() => ({
          showEmailError: true,
          email: ''
        }));
      }
    }
    render(){

      const { email, password, showEmailError } = this.state;

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
          </header>
        </div>
      );
    }
  
  }
  
  export default Login;