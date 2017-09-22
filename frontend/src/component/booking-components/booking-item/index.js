import React from 'react';
import {Link} from 'react-router-dom';

import * as util from '../../../lib/util';

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
    let confirmed = booking.venueConfirm && booking.bandConfirm;
    return(
      <li className='booking-list-item'>
        <Link to={`/profile/${booking.bandName}`}>
          <p>{`Band: ${booking.bandName}`}</p>
        </Link>
        <Link to={`/profile/${booking.venueName}`}>
          <p>{`Venue: ${booking.venueName}`}</p>
        </Link>
          <p>{`Date: ${booking.date}`}</p>
          <p>{`Cover Charge: ${booking.coverCharge}`}</p>
          <p>{`Location: ${booking.city},${booking.state}`}</p>
          {util.renderIf(this.props.public && !confirmed,
            <button onClick={this.onUpdate}>Update Booking</button>
          )}
          {util.renderIf(this.props.public && !confirmed,
            <button onClick={this.onConfirm}>Confirm Booking</button>
          )}
          {util.renderIf(confirmed,
            <p className='confirmed'>Confirmed!</p>
          )}
      </li>
    )
  }
}

export default BookingItem;
