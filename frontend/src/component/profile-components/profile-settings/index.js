import React from 'react';

import ProfileForm from '../profile-form'

class ProfileSettings extends React.Component {
  construct(props) {
    super(props);

  }

  render() {
    return(
      <span id='profile-settings' />
        <p>Edit Profile:</p>
        <ProfileForm />
      </span>

    )
  }
}
