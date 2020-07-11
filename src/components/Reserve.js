import React from 'react';
import '../App.css';
import serializeForm from 'form-serialize'

class Reserve extends React.Component {
    state = {
      meal: "",
      notes: ""
    };

    handleChangeNotes = e => {
      const text = e.target.value;

      this.setState(() => ({
        notes: text
      }));
    };

    handleSubmit = (e) =>{
      e.preventDefault()
      const values = serializeForm(e.target, {
          hash: true
      })
  }
    render(){

      const { notes} = this.state;
      return (
        <div className="App">
          <header className="App-header">
            <h1>Reserve</h1>
            <form className='create-contact-form'
                onSubmit={this.handleSubmit}>
                    <div className='create-contact-details'>
                        <div className='form-element'>
                          <lable>Meal</lable>
                          <select name="meal" style={{"width":"70%"}}>
                            <option value="breakfast">Breakfast</option>
                            <option value="lunch">Lunch</option>
                            <option value="dinner">Dinner</option>
                            <option value="drink">Drink</option>
                          </select>
                        </div>
                        <div className='form-element'>
                          <lable>Notes</lable>
                          <textarea type='text' name='notes' placeholder='Enter your order details' value={notes}
                          onChange={this.handleChangeNotes} />
                        </div>
                        <button className='form-element'
                        disabled={notes === ""}>Reserve</button>
                    </div>
            </form>
          </header>
        </div>
      );
    }
  
  }
  
  export default Reserve;