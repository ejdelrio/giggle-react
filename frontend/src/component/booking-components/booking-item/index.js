import React from 'react';
import {Link} from 'react-router-dom';

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
          <button onClick={this.onUpdate}>Update Booking</button>
          <button onClick={this.onConfirm}>Confirm Booking</button>
      </li>
    )
  }
}

export default BookingItem;
