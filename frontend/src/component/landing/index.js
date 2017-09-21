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
    this.getBookings = this.getBookings.bind(this);
  }
  componentDidUpdate() {
    console.log(this.state);
  }
  useCityLocation(prop) {
    let {state, city} = prop;
    return new Promise((resolve, reject) => {
      superagent.get(`http://maps.google.com/maps/api/geocode/json?address=\+${city},+${state}`)
      .end((error, res) => {
        if(error) reject({error});
        let {lat, lng} = res.body.results[0].geometry.location;
        prop.location = [parseFloat(lng), parseFloat(lat)];
        resolve(prop);
      });
    });
  }

  getBookings(prop) {

    this.useCityLocation(prop)
    .then(queryObj => {
      queryObj.genres = queryObj.genres.join(' ');
      let {time, startDate} = queryObj;
      time = time.split(':').filter((val, ind) => ind !== 2).join(':');
      startDate = new Date(`${startDate}T${time}:00`);
      queryObj.startDate = startDate.toString();

      superagent.get(`${__API_URL__}/api/booking-query`)
      .query({...queryObj})
      .end((error, res) => {
        if(error) return this.setState({error});
        console.log(res);
        this.setState({queryResults: res.body});
      })
    })
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
          onComplete={this.getBookings}
        />
      </section>
    )
  }
}

export default HomePage;
