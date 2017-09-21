import './_booking-form.scss';

import React from 'react';
import {connect} from 'react-redux';

import * as bookingAction from '../../../action/booking-action.js';

let generateTemplate = (props, profile, target) => {
  if(props.booking) return props.booking;
  if(target) {
    return profile.type === 'band' ?
    {
      bandName: profile.userName,
      venueName: target.userName,
      location: target.coords,
      city: target.city,
      state: target.state
    }:
    {
      bandName: target.userName,
      venueName: profile.userName,
      location: profile.location,
      city: profile.city,
      state: profile.state,
    }
  }
}

class BookingForm extends React.Component {
  constructor(props) {
    super(props);
    let {profile, target} = this.props;
    let initialState = generateTemplate(this.props, profile, target);
    if(initialState.date) {
      let ISOdate = new Date(initialState.date).toISOString().split('T');
      initialState.date = ISOdate[0];
      initialState.time = ISOdate[1].split('.')[0];

    }
    this.state = {
      genre: '',
      coverCharge: 0,
      compensation: 0,
      description: '',
      time: '12:00:00',
      date: new Date(),
      ...initialState,

    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    console.log(this.state);
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
        <p>Genre:</p>
        <input
          type='text'
          name='genre'
          placeholder='Enter a Genre'
          value={this.state.genre}
          onChange={this.onChange}
        />
        <p>Please Enter a Cover Charge:</p>
        <input
          type='number'
          name='coverCharge'
          value={this.state.coverCharge}
          onChange={this.onChange}
        />
        <p>Please Enter a Compensation Amount:</p>
        <input
          type='number'
          name='compensation'
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

})

export default connect(mapStateToProps, mapDispatchToProps)(BookingForm);
