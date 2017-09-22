import './_landing.scss';
import React from 'react';
import {Route, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import superagent from 'superagent';

import * as util from '../../lib/util.js';
import AuthForm from '../auth-form';
import * as authAction from '../../action/auth-action.js';
import SearchForm from '../lib/searchForm';
import SearchResults from '../lib/search-results';
import BookingItem from '../booking-components/booking-item'


class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queryResults: [],
      error: null
    }
    this.getBookings = this.getBookings.bind(this);
  }

  componentWillMount() {
    if(sessionStorage.queryResults) {
      let queryResults = JSON.parse(sessionStorage.queryResults);
      this.setState({queryResults})
    }
  }

  useCityLocation(prop) {
    let {state, city} = prop;
    return new Promise((resolve, reject) => {
      superagent.get(`https://maps.google.com/maps/api/geocode/json?address=\+${city},+${state}`)
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
        sessionStorage.queryResults = JSON.stringify(res.body);
        this.setState({queryResults: res.body});
      })
    })
  }


  render() {
    let headerClassName = this.state.queryResults.length > 0 ?
    'giggle-landing-hidden':
    'giggle-landing';

    let resultsclassName = !this.state.queryResults.length > 0 ?
    'booking-search-results-hidden':
    'booking-search-results';

    return(
      <section>
        <div className={headerClassName}>
          <h1>Giggle</h1>
        </div>

        <SearchForm
          className='search-form'
          type='booking'
          banner='Search for Shows'
          data={this.props.queryResults}
          onComplete={this.getBookings}
        />
        <section className={resultsclassName}>
          <ul>
            {this.state.queryResults.map((val, ind) => {
              return(
                <BookingItem
                  booking={val}
                  public={false}
                />
              )
            })}
          </ul>
        </section>
      </section>
    )
  }
}

export default HomePage;
