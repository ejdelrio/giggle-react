import './_landing.scss';
import React from 'react';
import {Route, Link} from 'react-router-dom';
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
      queryResults: [],
      error: null
    }
    this.executeSearch = this.executeSearch.bind(this);
  }

  executeSearch(query) {
    return superagent.get(`${__API_URL__}`)
    .send(query)
    .end((error, res) => {
      if(error) return this.setState({error});
      return this.setState({queryResults: res.body});
    })
  }

  componentDidUpdate() {
    console.log(this.state);
  }


  render() {

    return(
      <section>
        <div className="giggle-landing">
          <h1>Giggle</h1>
        </div>

        <SearchForm
          className='search-form'
          type='booking'
          banner='Search for Shows'
          data={this.props.queryResults}
          onComplete={this.executeSearch}
        />
      </section>
    )
  }
}

export default HomePage;
