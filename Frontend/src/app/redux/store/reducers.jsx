import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// custom reducers
import searchItemReducer from '../search-item/reducers';

const reducers = combineReducers({
  routing: routerReducer,
  searchItem: searchItemReducer,
});

export default reducers;
