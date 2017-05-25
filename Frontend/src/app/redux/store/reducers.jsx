import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// custom reducers
import searchItemReducer from '../search-item/reducers';
import mapReducer from '../map/reducers';

const reducers = combineReducers({
  routing: routerReducer,
  searchItem: searchItemReducer,
  map: mapReducer,
});

export default reducers;
