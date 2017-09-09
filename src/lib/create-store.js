import {createStore, applyMiddleware} from 'redux';
import reducer from '../reducer';

const createAppStore = () => {
  return createStore(reducer, applyMiddleware());
};

module.exports = createAppStore;
