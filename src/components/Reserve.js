import React from 'react';
import '../App.css';
import serializeForm from 'form-serialize'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class Reserve extends React.Component {
    state = {
      meal: "",
      notes: "",
      reserveDate: "",
      showDateError: false,
      notesLength: 0
    };

    handleChangeMeal = e => {
      const selectedMeal = e.target.value;
 
      this.setState(() => ({
        meal: selectedMeal
      }));
    }

    handleChangeNotes = e => {
      const text = e.target.value;
 
      this.setState(() => ({
        notes: text.substring(0, 299),
        notesLength: text.length
      }));
    }

    handleDateChange = date => {
      var now = new Date();
      now.setHours(0,0,0,0);

      if(date < now){
        this.setState({
          reserveDate: "",
          showDateError: true
        });
      }
      else{
        this.setState({
          reserveDate: date,
          showDateError: false
        });
      }
    };

    handleSubmit = (e) =>{
      e.preventDefault()
      const values = serializeForm(e.target, {
          hash: true
      })
  }
    render(){

      const { meal, notes, reserveDate, showDateError, notesLength} = this.state;
      return (
        <div className="App">
          <header className="App-header">
            <h1>Reserve</h1>
            <form className='create-contact-form'
                onSubmit={this.handleSubmit}>
                    <div className='create-contact-details'>
                      <div className='form-element'>
                        <lable>Date</lable>
                        <DatePicker
                          selected={reserveDate}
                          onChange={this.handleDateChange}
                        />
                      </div>
                        <div className='form-element'>
                          <lable>Meal</lable>
                          <select name="meal" style={{"width":"70%"}} value={meal} onChange={this.handleChangeMeal}>
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
                        {300-notesLength} Remaining
                        <button className='form-element'
                        disabled={notes === "" || reserveDate === ""}>Reserve</button>
                    </div>
            </form>
            {showDateError== false ? '': (
            <div style={{"color": "red"}}>
            Please enter a date in the future
          </div>
            )}
          </header>
        </div>
      );
    }
  
  }
  
  export default Reserve;