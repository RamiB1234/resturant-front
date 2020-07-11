import React from 'react';
import '../App.css';
import serializeForm from 'form-serialize'

class Register extends React.Component {
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
            <h1>Register</h1>
            <form className='create-contact-form'
                onSubmit={this.handleSubmit}>
                    <div className='create-contact-details'>
                        <div className='form-element'>
                          <lable>Fullname</lable>
                          <input type='text' name='name' placeholder='Name' />
                        </div>
                        <div className='form-element'>
                          <lable>Email</lable>
                          <input type='text' name='name' placeholder='Name' />
                        </div>
                        <div className='form-element'>
                          <lable>Mobile</lable>
                          <input type='text' name='name' placeholder='Name' />
                        </div>
                        <div className='form-element'>
                          <lable>Password</lable>
                          <input type='text' name='name' placeholder='Name' />
                        </div>
                        <button className='form-element'>Register</button>
                    </div>
            </form>
          </header>
        </div>
      );
    }
  
  }
  
  export default Register;