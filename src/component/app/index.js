import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import createAppStore from '../../lib/create-store.js';

const store = createAppStore();

class App extends React.Component {
  render() {
    return(
      <span>
        <Provider store={store}>
          <BrowserRouter>
            <h2>hiiii</h2>
          </BrowserRouter>
        </Provider>
      </span>
    )
  }
}

export default App;
