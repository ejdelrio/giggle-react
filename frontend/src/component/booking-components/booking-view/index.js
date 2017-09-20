import React from 'react';
import {connect} from 'react-redux';
import superagent from 'superagent'
import {Link} from 'react-router-dom';

import * as util from '../../../lib/util.js';
import * as bookingAction from '../../../action/booking-action.js';


import SearchResults from '../../lib/search-results';
import BookingItem from '../booking-item';
import Modal from '../../lib/modal';
import BookingForm from '../../profile-components/booking-form'


class BookingView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      owner: false,
      bookingProfile: null,
      modalBooking: null,
      modalSwitch: false,
      bookings: [],
      error: false
    }
    this.onUpdate = this.onUpdate.bind(this);
    this.modalToggle = this.modalToggle.bind(this);
    this.updateBookingAndRenderModal = this.updateBookingAndRenderModal.bind(this);
  }

  componentWillMount() {
    let {match, history} = this.props;
    let params = match.params;
    let owner = params.userName === this.props.profile.userName;
    if(owner) {
      return this.setState({
        bookingProfile: this.props.profile,
        bookings: this.props.bookings,
        owner
      });
    }
    superagent.get(`${__API_URL__}/api/profile/${params.userName}`)
    .end((error, res) => {
      if(error) return this.setState({error});
      return this.setState({
        bookingProfile: res.body,
        bookings: res.body.bookings
      });
    })
  }


  onUpdate(booking) {
    this.setState({
      modalSwitch: true,
      modalBooking: booking
    })
  }

  modalToggle() {
    let newState = this.state.modalSwitch === true ?
    false : true;
    this.setState({modalSwitch: newState});
  }
  updateBookingAndRenderModal(booking) {
    this.props.updateBooking(booking);
    this.modalToggle();
  }

  render() {
    return(
      <section id='booking-view'>
        {util.renderIf(this.state.modalSwitch,
          <Modal closeModal={this.modalToggle}>
            <BookingForm
              booking={this.state.modalBooking}
              createBooking={this.updateBookingAndRenderModal}
              buttonText='Update Booking'
            />
          </Modal>
        )}
        <h5>Bookings</h5>
        <ul>
          {this.props.bookings.map((val, ind) => {
            return(
              <BookingItem
                booking={val}
                ind={ind}
                renderModal={this.onUpdate}
                confirmBooking={this.props.confirmBooking}
              />
            )
          })}
        </ul>
      </section>
    )
  }
}

let mapStateToProps = state => ({
  profile: state.profile,
  bookings: state.booking
})

let mapDispatchToProps = dispatch => ({
  updateBooking: booking => dispatch(bookingAction.requestUpdateBooking(booking)),
  confirmBooking: booking => dispatch(bookingAction.confirmBooking(booking))
})
export default connect(mapStateToProps, mapDispatchToProps)(BookingView);
