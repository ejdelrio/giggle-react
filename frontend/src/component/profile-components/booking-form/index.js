import React from 'react';
import {connect} from 'react-redux';

import * as bookingAction from '../../../action/booking-action.js';

class BookingForm extends React.Component {
  constructor(props) {
    super(props);
    let {profile, target} = this.props;
    let initialState = profile.type === 'band' ?
    {
      bandName: profile.userName,
      venueName: target.userName,
      coords: target.coords,
      city: target.city,
      state: target.state
    }:
    {
      bandName: target.userName,
      venueName: profile.userName,
      location: profile.ocation,
      city: profile.city,
      state: profile.state,
      date: new Date(),
      time: ''
    }

    this.state = {
      ...initialState,
      coverCharge: 0,
      compensation: 0,
      description: '',
      time: '',

    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    let {name, value} = e.target;
    console.log(value);
    this.setState({
      [name]: value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    let booking = this.state;
    booking.date = new Date(`${booking.date} ${booking.time}`);
    console.log(booking)
    this.props.createBooking(booking);
  }

  render() {
    return(
      <form onSubmit={this.onSubmit} id='booking-form'>
        <p>{`Band Name: ${this.state.bandName}`}</p>
        <p>{`Venue Name: ${this.state.venueName}`}</p>
        <p>{`Location: ${this.state.city},${this.state.state}`}</p>
        <p>Date:</p>
        <input
          type='date'
          name='date'
          value={this.state.date}
          onChange={this.onChange}
        />
        <p>Time:</p>
        <input
          type='time'
          name='time'
          value={this.state.time}
          onChange={this.onChange}
        />
        <p>Please Enter a Cover Chare:</p>
        <input
          type='number'
          name='coverCharge'
          placeholder='0$'
          value={this.state.cover}
          onChange={this.onChange}
        />
        <p>Please Enter a Compensation Amount:</p>
        <input
          type='number'
          name='compensation'
          placeholder='0$'
          value={this.state.compensation}
          onChange={this.onChange}
        />
        <p>Description:</p>
        <textarea
          name='description'
          type='text'
          placeholder='Please enter a description'
          value={this.state.description}
          onChange={this.onChange}
        ></textarea>
        <button type='submit'>{this.props.buttonText}</button>
      </form>
    )
  }
}
let mapStateToProps = state => ({
  profile: state.profile,
  socket: state.socket
});
let mapDispatchToProps = dispatch => ({
  createBooking: booking => dispatch(bookingAction.requestBooking(booking))
})

export default connect(mapStateToProps, mapDispatchToProps)(BookingForm);
