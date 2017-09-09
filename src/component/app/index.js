import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Link} from 'react-router-dom';

import createAppStore from '../../lib/create-store.js';
import Dashboard from '../dashboard';

const store = createAppStore();

class App extends React.Component {
  render() {
    return(
      <Provider store={store}>
        <BrowserRouter>
          <Route path='/' component={Dashboard} />
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App;
