import React from 'react';
import '../App.css';
import serializeForm from 'form-serialize'

class Register extends React.Component {
    state = {
      fullName: "",
      email: "",
      mobile: "",
      password: "",
      showEmailError: false
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
        const values = serializeForm(e.target, {
          hash: true
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

      const { fullName, email, mobile, password, showEmailError } = this.state;

      return (
        <div className="App">
          <header className="App-header">
            <h1>Register</h1>
            <form className='create-contact-form'
                onSubmit={this.handleSubmit}>
                    <div className='create-contact-details'>
                        <div className='form-element'>
                          <lable>Fullname</lable>
                          <input type='text' name='fullName' placeholder='Rami' value={fullName}
                          onChange={this.handleChangeFullName} />
                        </div>
                        <div className='form-element'>
                          <lable>Email</lable>
                          <input type='text' name='email' placeholder='someone@domain.com' value={email}
                          onChange={this.handleChangeEmail} />
                        </div>
                        <div className='form-element'>
                          <lable>Mobile</lable>
                          <input type='text' name='mobile' placeholder='0599565705' value={mobile}
                          onChange={this.handleChangeMobile} />
                        </div>
                        <div className='form-element'>
                          <lable>Password</lable>
                          <input type='password' name='password' placeholder='Password' value={password}
                          onChange={this.handleChangePassword} />
                        </div>
                        <button className='form-element'
                        disabled={fullName === "" || email === "" || mobile === "" || password === ""}>Register</button>
                    </div>
            </form>
            {showEmailError== false ? '': (
            <div style={{"color": "red"}}>
            Please enter a valid email
          </div>
            )}

          </header>
        </div>
      );
    }
  
  }
  
  export default Register;