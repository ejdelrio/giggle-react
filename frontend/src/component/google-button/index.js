import './_google-button.scss';
import * as querystring from 'querystring';
import React from 'react';

class GoogleButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id_token: ''
    }

    this.onSignIn = this.onSignIn.bind(this);
  }

  componentDidMount() {
    console.log('button mounted');
  }

  onSignIn(googleUser) {
    console.log('success!');
    this.setState({ id_token: googleUser.getAuthResponse().id_token });
  }

  render() {
    let googleLoginBaseURL = 'https://accounts.google.com/o/oauth2/v2/auth';
    let googleLoginQuery = querystring.stringify({
      client_id: __GOOGLE_CLIENT_ID__,
      response_type: 'code',
      redirect_uri: `${__API_URL__}/oauth/google`,
      scope: 'openid profile email',
      prompt: __DEBUG__ ? 'consent' : undefined
    });

    let googleLoginURL = `${googleLoginBaseURL}?${googleLoginQuery}`;

    return (
      <div>
        <div className="g-signin2" data-onsuccess={this.onSignIn}>_</div>
      </div>
    )
  }
}

export default GoogleButton;