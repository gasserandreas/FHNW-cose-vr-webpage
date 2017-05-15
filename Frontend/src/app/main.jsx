import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import configureStore from './redux/store/configureStore';
import routes from './routes/routes';
import '../styles/styles.scss';

const rootElement = document.getElementById('application');
const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);
const routeConfig = routes();

const renderWithHotReload = () =>
  render(
    <AppContainer>
      <Provider store={store}>
        <Router history={history} routes={routeConfig} />
      </Provider>
    </AppContainer>
    ,
    rootElement,
  );

renderWithHotReload();
if (module.hot) {
  module.hot.accept('./routes/routes', () => {
    const routeNext = require('./routes/routes').default; // eslint-disable-line
    renderWithHotReload();
  });
}
