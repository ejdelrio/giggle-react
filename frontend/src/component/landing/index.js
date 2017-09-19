import './_landing.scss';
import React from 'react';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as querystring from 'querystring';

import * as util from '../../lib/util.js';
import AuthForm from '../auth-form';
import * as authAction from '../../action/auth-action.js';
import SearchForm from '../lib/searchForm';


class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: ''
    }
    this.testComplete = this.testComplete.bind(this);
  }

  testComplete(val) {
    this.setState(val);
  }

  render() {

    return(
      <section>
        <SearchForm />
      </section>
    )
  }
}

export default HomePage;
