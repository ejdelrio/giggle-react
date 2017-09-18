import React from 'react';
import {connect} from 'react-redux';

import SearchForm from '../../lib/searchForm';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section id='dashboard'>
        <SearchForm />
      </section>
    )
  }
}

let mapStateToProps = state => ({
  profile: state.profile
})

let mapDispatchToProps = dispatch => ( {

})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
