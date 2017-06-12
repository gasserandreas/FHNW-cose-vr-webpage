import axios from 'axios';

import { getBaseURL } from '../../utils/requestUtils';
import {
  SEARCH_ITEMS_LOAD_REQUEST,
  SEARCH_ITEMS_LOAD_REQUEST_SUCCESS,
  SEARCH_ITEMS_LOAD_REQUEST_FAILURE,
} from './consts';

// simple actions
const searchItemsRequest = () => ({
  type: SEARCH_ITEMS_LOAD_REQUEST,
  searchItems: {},
  searchItemIds: [],
});

const searchItemsRequestSuccess = (searchItems) => {
  const searchItemsObject = {};
  const searchItemIds = [];

  searchItems.forEach((item) => {
    searchItemsObject[item.id] = item;
    searchItemIds.push(item.id);
  });

  return ({
    type: SEARCH_ITEMS_LOAD_REQUEST_SUCCESS,
    searchItems: searchItemsObject,
    searchItemIds,
  });
};

const searchItemsRequestFailure = () => ({
  type: SEARCH_ITEMS_LOAD_REQUEST_FAILURE,
  searchItems: {},
  searchItemIds: [],
});

// complex actions
const loadSearchItems = () => {
  const config = {
    method: 'get',
    baseURL: process.env.BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const url = `${getBaseURL()}/distinct/items`;
  return (dispatch) => {
    dispatch(searchItemsRequest());

    axios(url, config)
      .then((response) => {
        if (response.status !== 200) {
          dispatch(searchItemsRequestFailure(response.data));
          return Promise.reject(response.data);
        }

        return dispatch(searchItemsRequestSuccess(response.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(searchItemsRequestFailure(error));
      });
  };
};

export {
  loadSearchItems,
};
