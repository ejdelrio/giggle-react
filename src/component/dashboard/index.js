import React from 'react';
import {Link, Route} from 'react-router-dom';
import Landing from '../landing'

class Dashboard extends React.Component {
  render() {
    return(
      <span>
        <ul>
          <li><Link to='/signup'>Sign Up</Link></li>
          <li><Link to='/login'>login</Link></li>
        </ul>
        <Route path='/:auth' component={Landing} />
      </span>
    )
  }
}

export default Dashboard;
