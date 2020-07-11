import React from 'react';
import '../App.css';
import serializeForm from 'form-serialize'

class Login extends React.Component {
    state = {
      username: "",
      password: ""
    };

    handleChangeUsername = e => {
      const text = e.target.value;
  
      this.setState(() => ({
        username: text
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
      const values = serializeForm(e.target, {
          hash: true
      })
  }
    render(){

      const { username, password } = this.state;

      return (
        <div className="App">
          <header className="App-header">
            <h1>Login</h1>
            <form className='create-contact-form'
                onSubmit={this.handleSubmit}>
                    <div className='create-contact-details'>
                        <div className='form-element'>
                          <label>Username</label>
                          <input type='text' name='username' placeholder='Rami' value= {username} onChange={this.handleChangeUsername} />
                        </div>
                        <div className='form-element'>
                          <label>Password</label>
                          <input type='password' name='password' placeholder='password' value= {password} onChange={this.handleChangePassword} />
                        </div>
                        <button className='form-element'
                        disabled={username === "" || password === ""}>Login</button>
                    </div>
            </form>
          </header>
        </div>
      );
    }
  
  }
  
  export default Login;