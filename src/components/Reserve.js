import React from 'react';
import '../App.css';
import serializeForm from 'form-serialize'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

class Reserve extends React.Component {
    state = {
      meal: "",
      notes: "",
      reserveDate: "",
      showDateError: false,
      notesLength: 0,
      showReservationSuccess: false,
      showReservationFail: false
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

      const formData = new FormData(e.target)
      const body = {}
      formData.forEach((value, property) => body[property] = value)

      axios.post(`https://localhost:44385/api/reserve`, body)
      .then(res => {
        console.log(res.status);
        this.setState({
          showReservationSuccess: true,
          showReservationFail: false
        });
      })
      .catch(error => { 
        console.log("error :"+error);
        this.setState({
          showReservationFail: true,
          showReservationSuccess: false
        });
      })
  }
    render(){

      const { meal, notes, reserveDate, showDateError, 
        notesLength, showReservationSuccess, showReservationFail} = this.state;
      return (
        <div className="App">
          <header className="App-header">
            <h1>Reserve</h1>
            <form className='create-contact-form'
                onSubmit={this.handleSubmit}>
                    <div className='create-contact-details'>
                      <div className='form-element'>
                        <label>Date</label>
                        <DatePicker
                          name="date"
                          selected={reserveDate}
                          onChange={this.handleDateChange}
                        />
                      </div>
                        <div className='form-element'>
                          <label>Meal</label>
                          <select name="meal" style={{"width":"70%"}} value={meal} onChange={this.handleChangeMeal}>
                            <option value="breakfast">Breakfast</option>
                            <option value="lunch">Lunch</option>
                            <option value="dinner">Dinner</option>
                            <option value="drink">Drink</option>
                          </select>
                        </div>
                        <div className='form-element'>
                          <label>Notes</label>
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
            {showReservationFail== false ? '': (
            <div style={{"color": "red"}}>
            An error has occured, try again later
          </div>
            )}
            {showReservationSuccess== false ? '': (
            <div style={{"color": "white"}}>
            Reservation request is successful
          </div>
            )}
          </header>
        </div>
      );
    }
  
  }
  
  export default Reserve;