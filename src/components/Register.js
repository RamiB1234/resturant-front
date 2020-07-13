import React from 'react';
import '../App.css';
import axios from 'axios';
import { withRouter } from "react-router-dom";

class Register extends React.Component {
    state = {
      fullName: "",
      email: "",
      mobile: "",
      password: "",
      showEmailError: false,
      showEmailAlreadyExists: false,
      showRegistrationFail: false,
      showRegistrationSuccessful: false,
      redirctToLogin: false,
      isLoading: false
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

        const { startLoading, finishLoading, localAPI, remoteAPI } = this.props;

        startLoading();
        this.setState({
          isLoading: true
        });

        axios.post(`${localAPI}/auth/register`, body)
        .then(res => {
          console.log(res.status);

          this.setState({
            showRegistrationFail: false,
            showEmailAlreadyExists: false,
            showEmailError: false,
            showRegistrationSuccessful: true,
            isLoading: false
          });

          that.props.finishLoading();

          setTimeout(function () {
            // redirect to login
            that.setState(() => ({
              redirctToLogin: true
            }));
 
        }, 1000);
        })
        .catch(error => { 
          console.log("error :"+error);

          // 406 error:
          if(error.toString().includes('406')){
            this.setState({
              showRegistrationFail: false,
              showEmailAlreadyExists: true,
              showEmailError: false,
              showRegistrationSuccessful: false,
              isLoading: false
            });
          }
          else{
            this.setState({
              showRegistrationFail: true,
              showEmailAlreadyExists: false,
              showEmailError: false,
              showRegistrationSuccessful: false,
              isLoading: false
            });
          }
          finishLoading();
        })
      }
      else{
        this.setState(() => ({
          showEmailError: true,
          showRegistrationSuccessful: false,
          showEmailAlreadyExists: false,
          showRegistrationFail: false,
          email: ''
        }));
      }
  }

    render(){

      const { fullName, email, mobile, password, showEmailError, showEmailAlreadyExists,
         showRegistrationFail, showRegistrationSuccessful, redirctToLogin, isLoading } = this.state;

      return (
        <div className="App">
          <header className="App-header">
            <br/><h1>Register</h1><br/>
            <form
                onSubmit={this.handleSubmit}>
                    <div>
                        <div className='form-group'>
                          <label>Fullname</label>
                          <input type='text' className='form-control' name='fullName' placeholder='Rami' value={fullName}
                          onChange={this.handleChangeFullName} />
                        </div>
                        <div className='form-group'>
                          <label>Email</label>
                          <input type='text' className='form-control' name='email' placeholder='someone@domain.com' value={email}
                          onChange={this.handleChangeEmail} />
                        </div>
                        <div className='form-group'>
                          <label>Mobile</label>
                          <input type='text' className='form-control' name='mobile' placeholder='0599565705' value={mobile}
                          onChange={this.handleChangeMobile} />
                        </div>
                        <div className='form-group'>
                          <label>Password</label>
                          <input type='password' className='form-control' name='password' placeholder='Password' value={password}
                          onChange={this.handleChangePassword} />
                        </div>
                        <button className='btn btn-primary'
                        disabled={fullName === "" || email === "" || mobile === "" || password === "" || isLoading===true}>Register</button>
                    </div>
            </form>
            <br/>
            {showEmailError=== false ? '': (
            <div className="alert alert-danger" role="alert">
              Please enter a valid email
            </div>
            )}
            {showRegistrationFail=== false ? '': (
            <div className="alert alert-danger" role="alert">
              User registration failed, please contact admin
            </div>

            )}
            {showEmailAlreadyExists=== false ? '': (
            <div className="alert alert-danger" role="alert">
              Email already exists
            </div>
            )}
            {showRegistrationSuccessful=== false ? '': (
            <div className="alert alert-success" role="alert">
              User registration is successful
            </div>
            )}
            {redirctToLogin== false ? '' : this.props.history.push('/') }

          </header>
        </div>
      );
    }
  
  }
  
  export default withRouter(Register);