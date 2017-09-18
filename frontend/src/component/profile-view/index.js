import './_profile-view.scss';
import React from 'react';
import ProfileForm from '../profile-form';

class ProfileView extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <ProfileForm />
    )
  }
}

export default ProfileView;
