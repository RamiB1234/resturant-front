import React from 'react';
import '../App.css';
import serializeForm from 'form-serialize'

class Reserve extends React.Component {
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
            <h1>Reserve</h1>
            <form className='create-contact-form'
                onSubmit={this.handleSubmit}>
                    <div className='create-contact-details'>
                        <div className='form-element'>
                          <lable>Fullname</lable>
                          <select name="cars" id="cars" style={{"width":"70%"}}>
                            <option value="breakfast">Breakfast</option>
                            <option value="lunch">Lunch</option>
                            <option value="dinner">Dinner</option>
                            <option value="drink">Drink</option>
                          </select>
                        </div>
                        <div className='form-element'>
                          <lable>Details</lable>
                          <textarea type='text' name='name' placeholder='Name' />
                        </div>
                        <button className='form-element'>Reserve</button>
                    </div>
            </form>
          </header>
        </div>
      );
    }
  
  }
  
  export default Reserve;