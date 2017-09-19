import React from 'react';
import {connect} from 'react-redux';
import superagent from 'superagent'

import SearchForm from '../../lib/searchForm';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queryResults: []
    }
    this.executeSearch = this.executeSearch.bind(this);
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
      console.log(res)
      this.setState({queryResults: res.body})
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
        <ul>
          {this.state.queryResults.map((prof, ind) => {

            console.log(prof);
            return(
              <li key={ind}>
                <p>{prof.userName}</p>
                <p>{prof.genre.join(', ')}</p>
                <p>{`Location: ${prof.city}, ${prof.state}`}</p>
              </li>
            )
          })}
        </ul>
      </section>
    )
  }
}

let mapStateToProps = state => ({
  profile: state.profile,
  token: state.token
})

let mapDispatchToProps = dispatch => ( {

})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
