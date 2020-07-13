import React from 'react';
import '../App.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

import Reservation from './Reservation';

class Reserve extends React.Component {
    state = {
      meal: "",
      notes: "",
      reserveDate: "",
      showDateError: false,
      notesLength: 0,
      showReservationSuccess: false,
      showReservationFail: false,
      isLoading: false,
      reservations: []
    };

    
    componentDidMount() {
      this.fetchUserReservations();
    }

    fetchUserReservations = function(){
      const { userId, token, localAPI, remoteAPI} = this.props;
      axios.get(`${localAPI}/reserve/`+userId,{headers: {
        'Authorization': "Bearer "+ token,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    }})
      .then(res => {
        console.log(res.data);
        this.setState({
          reservations: res.data
        });
      })
    }

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
      body.userId = this.props.userId;
console.log(body);
      const { startLoading, finishLoading, token, localAPI, remoteAPI} = this.props;

      startLoading();
      this.setState({
        isLoading: true
      });

      axios.post(`${localAPI}/reserve`, body, {headers: {
        'Authorization': "Bearer "+ token,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    }})
      .then(res => {
        console.log(res.status);
        finishLoading();
        this.setState({
          showReservationSuccess: true,
          showReservationFail: false,
          isLoading: false
        });
        this.fetchUserReservations();
      })
      .catch(error => { 
        console.log("error :"+error);
        finishLoading();
        this.setState({
          showReservationFail: true,
          showReservationSuccess: false,
          isLoading: false
        });
      })
  }
    render(){

      const { meal, notes, reserveDate, showDateError, 
        notesLength, showReservationSuccess, showReservationFail, isLoading, reservations} = this.state;
      return (
        <div className="App">
          <header className="App-header">
            <br/><h1>Reserve</h1><br/>
            <form
                onSubmit={this.handleSubmit}>
                    <div>
                      <div className='form-group'>
                        <label>Date</label>
                        <DatePicker
                          name="date"
                          className='form-control'
                          selected={reserveDate}
                          onChange={this.handleDateChange}
                        />
                      </div>
                        <div className='form-group'>
                          <label>Meal</label>
                          <select name="meal" className='form-control' value={meal} onChange={this.handleChangeMeal}>
                            <option value="breakfast">Breakfast</option>
                            <option value="lunch">Lunch</option>
                            <option value="dinner">Dinner</option>
                            <option value="drink">Drink</option>
                          </select>
                        </div>
                        <div className='form-group'>
                          <label>Notes</label>
                          <textarea type='text' className='form-control' name='notes' placeholder='Enter your order details' value={notes}
                          onChange={this.handleChangeNotes} />
                        </div>
                        <small>{300-notesLength} Remaining</small><br/>
                        <button className='btn btn-primary'
                        disabled={notes === "" || reserveDate === "" || isLoading=== true}>Reserve</button>
                    </div>
            </form>
            <br/>
            {showDateError=== false ? '': (
            <div className="alert alert-danger" role="alert">
              Please enter a date in the future
            </div>
            )}
            {showReservationFail=== false ? '': (
            <div className="alert alert-danger" role="alert">
              An error has occured
            </div>
            )}
            {showReservationSuccess=== false ? '': (
            <div className="alert alert-success" role="alert">
              Reservation request is complete
            </div>
            )}

            <div>
              <h3>History</h3>
              <ul className='reserve-history'>
              {reservations.length<= 0 ? 'Noting yet' :(
                reservations.map(r => {
                  return (
                    <li key={r.id} style={{"marginBottom": "30px"}}>
                      <Reservation
                      date={r.date} meal={r.meal} notes={r.notes}
                      />
                    </li>
                  );
                })
              )
            }
              </ul>
            </div>
          </header>
        </div>
      );
    }
  
  }
  
  export default Reserve;