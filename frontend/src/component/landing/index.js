import './_landing.scss';
import React from 'react';
import { Route, Link } from 'react-router-dom';
import {connect} from 'react-redux';
import superagent from 'superagent';

import * as util from '../../lib/util.js';
import AuthForm from '../auth-form';
import * as authAction from '../../action/auth-action.js';
import SearchForm from '../lib/searchForm';


class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queryResults: []
    }
    this.executeSearch = this.executeSearch.bind(this);
  }

  executeSearch(query) {

  }


  render() {

    return(
      <section>
        <SearchForm
          type='booking'
          banner='Search for Shows'
          onComplete={this.executeSearch}
        />
      </section>
    )
  }
}

export default HomePage;
