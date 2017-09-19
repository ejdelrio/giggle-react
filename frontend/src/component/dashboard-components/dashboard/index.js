import './_dashboard.scss';
import React from 'react';
import {connect} from 'react-redux';
import superagent from 'superagent'

import SearchForm from '../../lib/searchForm';
import SearchResults from '../../lib/search-results';
import * as queryActions from '../../../action/profile-query-action.js';

let singleResult = (val, ind) => {
  return (
    <li key={ind}>
      <p>{val.userName}</p>
      <p>{val.genre}</p>
      <p>{`Location: ${val.city}, ${val.state}`}</p>
    </li>
  )
}

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    let queryResults = this.props.profileQuery

    this.state =
    {queryResults: []};

    this.executeSearch = this.executeSearch.bind(this);
  }

  componentWillMount() {
    console.log(queryActions)
    if(this.props.profileQuery) {
      return this.setState({queryResults: this.props.profileQuery})
    }
  }

  executeSearch(query) {
    let type = this.props.profile.type === 'band' ?
    'venue':
    'band';
    query.type = type;
    query.genres = query.genres.join(' ');
    query.startDate = query.startDate.toString();
    query.endDate = query.endDate.toString();

    superagent.get(`${__API_URL__}/api/userQuery`)
    .set('Authorization', `Bearer ${this.props.token}`)
    .query(query)
    .then(res => {
      this.props.profileSearch(res.body);
      this.setState({queryResults: res.body});
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
        />
        <SearchResults
          data={this.state.queryResults}
          path='profile'
          keyName='userName'
          className='profile-search'
          template={singleResult}
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
