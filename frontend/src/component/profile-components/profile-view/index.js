import React from 'react';
import ProfileForm from '../profile-form';

class ProfileView extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <section id='profile-view'>
        <ProfileForm />
      </section>
    )
  }
}

export default ProfileView;
