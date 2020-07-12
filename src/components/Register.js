import React from 'react';
import '../App.css';
import axios from 'axios';

class Register extends React.Component {
    state = {
      fullName: "",
      email: "",
      mobile: "",
      password: "",
      showEmailError: false,
      showRegistrationFail: false,
      showRegistrationSuccessful: false,
      redirctToLogin: false
    };

    handleChangeFullName = e => {
      const text = e.target.value;
  
      this.setState(() => ({
        fullName: text
      }));
    };

    handleChangeEmail = e => {
      const text = e.target.value;

      this.setState(() => ({
        email: text
      }));
    };

    handleChangeMobile = e => {
      const text = e.target.value;

      if(/^\d+$/.test(text)) {
        //proceed with rest of code
        this.setState(() => ({
          mobile: text
        }));
       }
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

        axios.post(`https://localhost:44385/api/auth/register`, body)
        .then(res => {
          console.log(res.status);

          this.setState({
            showRegistrationFail: false,
            showRegistrationSuccessful: true
          });

          setTimeout(function () {
            // redirect to login
            that.setState(() => ({
              redirctToLogin: true
            }));
 
        }, 1000);
        })
        .catch(error => { 
          console.log("error :"+error);
          this.setState({
            showRegistrationFail: true,
            showRegistrationSuccessful: false
          });
        })
      }
      else{
        this.setState(() => ({
          showEmailError: true,
          email: ''
        }));
      }
  }
    render(){

      const { fullName, email, mobile, password, showEmailError,
         showRegistrationFail, showRegistrationSuccessful, redirctToLogin } = this.state;

      return (
        <div className="App">
          <header className="App-header">
            <h1>Register</h1>
            <form className='create-contact-form'
                onSubmit={this.handleSubmit}>
                    <div className='create-contact-details'>
                        <div className='form-element'>
                          <label>Fullname</label>
                          <input type='text' name='fullName' placeholder='Rami' value={fullName}
                          onChange={this.handleChangeFullName} />
                        </div>
                        <div className='form-element'>
                          <label>Email</label>
                          <input type='text' name='email' placeholder='someone@domain.com' value={email}
                          onChange={this.handleChangeEmail} />
                        </div>
                        <div className='form-element'>
                          <label>Mobile</label>
                          <input type='text' name='mobile' placeholder='0599565705' value={mobile}
                          onChange={this.handleChangeMobile} />
                        </div>
                        <div className='form-element'>
                          <label>Password</label>
                          <input type='password' name='password' placeholder='Password' value={password}
                          onChange={this.handleChangePassword} />
                        </div>
                        <button className='form-element'
                        disabled={fullName === "" || email === "" || mobile === "" || password === ""}>Register</button>
                    </div>
            </form>
            {showEmailError=== false ? '': (
            <div style={{"color": "red"}}>
            Please enter a valid email
          </div>
            )}
            {showRegistrationFail=== false ? '': (
            <div style={{"color": "red"}}>
            User registration failed, please contact admin
          </div>
            )}
            {showRegistrationSuccessful=== false ? '': (
            <div style={{"color": "green"}}>
            User registration is successful
          </div>
            )}
            {redirctToLogin== false ? '' : this.props.history.push('/')}

          </header>
        </div>
      );
    }
  
  }
  
  export default Register;