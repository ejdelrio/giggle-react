import './_gear.scss';
import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import * as util from '../../../lib/util.js'

let newLink = (link, text) => (
  <li>
    <Link to={`/${link}`}>
      {text}
    </Link>
  </li>
)

class GearMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var userName;
    if(this.props.profile) userName = this.props.profile.userName;
    return(
      <ul className={this.props.className}>
        {newLink('settings', 'Settings')}
        {util.renderIf(userName, newLink(`profile/${userName}`, 'My Profile'))}
        {newLink('bookings', 'My Bookings')}
        {newLink('media', 'My Media')}
        <li onClick={this.props.logout}>
          Logout
        </li>
      </ul>
    )
  }
}
let mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, undefined)(GearMenu);
