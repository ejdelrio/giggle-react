import './_dashboard.scss';
import React from 'react';
import {connect} from 'react-redux';
import superagent from 'superagent'
import {Link} from 'react-router-dom';

import SearchForm from '../../lib/searchForm';
import SearchResults from '../../lib/search-results';
import * as queryActions from '../../../action/profile-query-action.js';

let newLink = (url, path, val, ind) => {
  return(
    <Link to={`${path}/${url}`}>
      <li key={ind}>
        <div className='profile-search-image'>
          <img src={val.avatar}/>
        </div>
        <p>{`User Name: ${val.userName}`}</p>
        <p>{`User Genres: ${val.genre}`}</p>
        <p>{`Location: ${val.city}, ${val.state}`}</p>
      </li>
    </Link>
  )
}

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    let queryResults = this.props.profileQuery

    this.state =
    {queryResults: []};

    this.executeSearch = this.executeSearch.bind(this);
    this.useCityLocation = this.useCityLocation.bind(this);
  }

  componentWillMount() {
    if(this.props.profileQuery) {
      return this.setState({queryResults: this.props.profileQuery})
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

  executeSearch(query) {
    let type = this.props.profile.type === 'band' ?
    'venue':
    'band';
    query.type = type;
    query.genres = query.genres.join(' ');
    query.startDate = query.startDate.toString();
    query.endDate = query.endDate.toString();

    this.useCityLocation(query)
    .then(queryObj => {
      return superagent.get(`${__API_URL__}/api/userQuery`)
      .set('Authorization', `Bearer ${this.props.token}`)
      .query(query)
      .then(res => {
        this.props.profileSearch(res.body);
        this.setState({queryResults: res.body});
      })
    })
  }

  render() {
    let queryType = this.props.profile.type === 'band' ?
    'venue':
    'band';
    return (
      <section id='dashboard'>
        <SearchForm
          banner='Search for Venues'
          onComplete={this.executeSearch}
          className='search-form'
        />
        <SearchResults
          data={this.state.queryResults}
          path='profile'
          keyName='userName'
          className='profile-search'
          template={newLink}
        />
      </section>
    )
  }
}

let mapStateToProps = state => ({
  profile: state.profile,
  token: state.token,
  profileQuery: state.profileQuery
})

let mapDispatchToProps = dispatch => ({
  profileSearch: results => dispatch(queryActions.createProfileQuery(results))
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
