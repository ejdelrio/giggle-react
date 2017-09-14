import React from 'react';
import * as querystring from 'querystring';

class GoogleMap extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('map mounted');
  }

  render() {
    let googleMapBaseURL = 'https://maps.googleapis.com/maps/api/js';
    let googleMapQuery = querystring.stringify({
      client: __GOOGLE_CLIENT_ID__,
      

    })
  }
}
