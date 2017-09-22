import React from 'react';
import {Link} from 'react-router-dom';

import * as util from '../../../lib/util';

function normalDate(date) {
  let dateString = date.toString().split(':')[0].split(' ');
  dateString.pop();
  dateString = dateString.join(' ');

  console.log(dateString)
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if(minutes.length !== 2) minutes = `0${minutes}`;
  return `${dateString} at ${hours}:${minutes}`;
}




class BookingItem extends React.Component {
  constructor(props) {
    super(props);

    this.onUpdate = this.onUpdate.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }

  onUpdate() {
    this.props.renderModal(this.props.booking);
  }

  onConfirm() {
    this.props.confirmBooking(this.props.booking);
  }

  render() {
    let {booking} = this.props;
    let date = new Date(booking.date);
    let confirmed = booking.venueConfirm && booking.bandConfirm;
    return(
      <li className='booking-list-item'>
        <div className='booking-item-photo'>
          <img src={booking.avatar}/>
        </div>
        <div>
          <Link to={`/profile/${booking.bandName}`}>
            <p>{`Band: ${booking.bandName}`}</p>
          </Link>
          <Link to={`/profile/${booking.venueName}`}>
            <p>{`Venue: ${booking.venueName}`}</p>
          </Link>
            <p>{`Date: ${normalDate(date)}`}</p>
            <p>{`Cover Charge: ${booking.coverCharge}`}</p>
            <p>{`Location: ${booking.city},${booking.state}`}</p>
            {util.renderIf(this.props.public && !confirmed,
              <button onClick={this.onUpdate}>Update Booking</button>
            )}
            {util.renderIf(this.props.public && !confirmed,
              <button onClick={this.onConfirm}>Confirm Booking</button>
            )}
            {util.renderIf(confirmed && this.props.public,
              <p className='confirmed'>Confirmed!</p>
            )}
          </div>
      </li>
    )
  }
}

export default BookingItem;
