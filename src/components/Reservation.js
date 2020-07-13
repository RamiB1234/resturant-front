import React from 'react';

class Reservation extends React.Component {

    render(){

        return(
            <div className="card text-center" style={{"color" : "black", "width": "400px"}}>
            <div className="card-header">
                Date: {new Date(this.props.date).toLocaleDateString("en-US")}
            </div>
            <div className="card-body">
              <h5 className="card-title">Meal: {this.props.meal}</h5>
              <p className="card-text">Notes: {this.props.notes}</p>
            </div>
          </div>

        )
    }


}


export default Reservation;