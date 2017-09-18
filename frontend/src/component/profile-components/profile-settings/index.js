import React from 'react';
import {connect} from 'react-redux';

import ProfileForm from '../profile-form'

class ProfileSettings extends React.Component {


  render() {
    return(
      <span id='profile-settings'>
        <p>Edit Profile:</p>
        <ProfileForm
          profile={this.props.profile}
        />
      </span>

    )
  }
}

let mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, undefined)(ProfileSettings)
