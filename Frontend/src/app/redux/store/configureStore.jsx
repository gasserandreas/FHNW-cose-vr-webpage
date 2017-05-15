import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';

const configureStore = preLoadedState =>
  createStore(
    reducers,
    { ...preLoadedState },
    applyMiddleware(
      thunkMiddleware,
    ),
  );

export default configureStore;
