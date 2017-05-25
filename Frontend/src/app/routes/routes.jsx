import React from 'react';
import { Route, IndexRoute } from 'react-router';

import NotFound from '../pages/main/components/NotFound';

import MainViewContainer from '../pages/main/containers/MainViewContainer';
import IndexViewContainer from '../pages/index/containers/IndexViewContainer';
import SearchItemViewContainer from '../pages/search-item/containers/SearchItemViewContainer';
import MapViewContainer from '../pages/map/containers/MapViewContainer';

import {
  PATH_INDEX,
  PATH_SEARCH_ITEM,
  PATH_MAP,
} from '../paths';

const routes = () => (
  <Route path={PATH_INDEX} component={MainViewContainer}>
    <IndexRoute component={IndexViewContainer} />
    <Route path={PATH_SEARCH_ITEM} component={SearchItemViewContainer} />
    <Route path={PATH_MAP} component={MapViewContainer} />
    <Route path="*" component={NotFound} />
  </Route>
);

export default routes;
