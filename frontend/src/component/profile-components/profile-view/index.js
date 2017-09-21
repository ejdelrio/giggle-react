import './_profile-view.scss';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import superagent from 'superagent';

import * as util from '../../../lib/util';
import * as bookingAction from '../../../action/booking-action.js';

import Modal from '../../lib/modal';
import BookingForm from '../booking-form';


class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      target: null,
      bookingModalToggle: false,
      error: null
    }

    this.requestBooking = this.requestBooking.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }
  componentDidUpdate() {
    console.log(this.state);
  }
  componentDidMount() {
    let { params } = this.props.match;
    superagent.get(`${__API_URL__}/api/profile/${params.userName}`)
      .end((error, res) => {
        if (error) return this.setState({ error });
        this.setState({ target: res.body });
      })
  }

  requestBooking() {
    let newState = this.state.bookingModalToggle ? false : true;
    this.setState({ bookingModalToggle: newState });
  }

  sendMessage() {

  }
  render() {
    if (!this.state.target) return (<section></section>)
    let profile = this.state.target;
    return (

      <section id='profile-view'>

        {util.renderIf(this.state.bookingModalToggle,
          <Modal
            closeModal={this.requestBooking}
          >
            <BookingForm
              target={this.state.target}
              buttonText='Request Booking'
              createBooking={this.props.createBooking}
            />
          </Modal>
        )}
        <div id='profile-view'>
          <div className="profile-header">

            <div className="container">
              <div className="ident-content">
              <div className="circle photo-ident">

                <button className="photo-update">
                  Update image
                </button>
              </div>
              <div className="text-ident">
                <h2>{profile.userName}</h2>

                <p className='city-state'>{`${profile.city}, ${profile.state}`}</p>
              </div>

              </div>
              <div className="profile-contact">
                <div className="contact-buttons">
                  <button onClick={this.requestBooking}>Request Booking</button>
                  <button onClick={this.sendMessage}>Send Message</button>
                </div>


              </div>


            </div>




            <p>{`${profile.genre.join(', ')}`}</p>
          </div>

          <div className="profile-main">
            <div id='my-bookings'>
              <ul>
                {//Bookigs will be mapped here :D
                }
              </ul>
            </div>

            <div className="bio">
              <h2>Bio:</h2>
              <p>{profile.bio}</p>

            </div>

            <div className="media">

              <h2>Media</h2>
              <ul>
                <Link to={`/profile/photos-${profile.userName}`}>
                  <li>
                    {/* <img src='https://assets3.thrillist.com/v1/image/1531235/size/tmg-slideshow_l.jpg' /> */}
                  </li>
                </Link>
                <Link to={`/profile/videos-${profile.userName}`}>
                  <li>
                    <img src='' />
                  </li>
                </Link>
                <Link to={`/profile/tracks-${profile.userName}`}>
                  <li>
                    <img src='' />
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

let mapStateToProps = state => ({
  profile: state.profile
})

let mapDispatchToProps = dispatch => ({
  createBooking: booking => dispatch(bookingAction.requestBooking(booking))
})


export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);
