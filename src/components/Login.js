import React from 'react';
import '../App.css';
import serializeForm from 'form-serialize'

class Login extends React.Component {
    state = {
    };
    handleSubmit = (e) =>{
      e.preventDefault()
      const values = serializeForm(e.target, {
          hash: true
      })
  }
    render(){
      return (
        <div className="App">
          <header className="App-header">
            <h1>Login</h1>
            <form className='create-contact-form'
                onSubmit={this.handleSubmit}>
                    <div className='create-contact-details'>
                        <div className='form-element'>
                          <lable>Username</lable>
                          <input type='text' name='name' placeholder='Name' />
                        </div>
                        <div className='form-element'>
                          <lable>Password</lable>
                          <input type='text' name='name' placeholder='Name' />
                        </div>
                        <button className='form-element'>Login</button>
                    </div>
            </form>
          </header>
        </div>
      );
    }
  
  }
  
  export default Login;