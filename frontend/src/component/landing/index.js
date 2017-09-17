import React from 'react';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as querystring from 'querystring';

import * as util from '../../lib/util.js';
import AuthForm from '../auth-form';
import * as authAction from '../../action/auth-action.js';


class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <section>
      </section>
    )
  }
}

export default HomePage;
