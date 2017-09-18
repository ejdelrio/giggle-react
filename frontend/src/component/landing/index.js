import './_landing.scss';
import React from 'react';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as querystring from 'querystring';

import * as util from '../../lib/util.js';
import AuthForm from '../auth-form';
import * as authAction from '../../action/auth-action.js';
import CustomDropDown from '../lib/custom-dropdown';


class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: ''
    }
    this.testComplete = this.testComplete.bind(this);
  }

  testComplete(val) {
    console.log(val, 'x')
    this.setState(val)
  }

  render() {
    let testObj = {};
    for (let i = 10; i < 101; i+=10) {
      testObj[i] = i;
    }
    console.log(this.state);

    return(
      <section>
        <CustomDropDown
          name='test'
          placeholder='some stuff'
          data={testObj}
          onComplete={this.testComplete}
          className='test-drop'
        />
      </section>
    )
  }
}

export default HomePage;
