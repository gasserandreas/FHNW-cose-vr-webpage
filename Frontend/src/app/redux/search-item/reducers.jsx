import {
  SEARCH_ITEMS_LOAD_REQUEST,
  SEARCH_ITEMS_LOAD_REQUEST_SUCCESS,
  SEARCH_ITEMS_LOAD_REQUEST_FAILURE,
} from './consts';

const itemById = (state = {}, action) => {
  switch (action.type) {
    case SEARCH_ITEMS_LOAD_REQUEST:
      return state;
    case SEARCH_ITEMS_LOAD_REQUEST_SUCCESS:
      return action.searchItems;
    default:
      return state;
  }
};

const itemIds = (state = [], action) => {
  switch (action.type) {
    case SEARCH_ITEMS_LOAD_REQUEST_SUCCESS:
      return action.searchItemIds;
    default:
      return state;
  }
};

const asyncItem = (state = {
  isFetching: false,
  error: '',
}, action) => {
  switch (action.type) {
    case SEARCH_ITEMS_LOAD_REQUEST:
      return {
        isFetching: true,
        error: '',
      };
    case SEARCH_ITEMS_LOAD_REQUEST_SUCCESS:
      return {
        isFetching: false,
        error: '',
      };
    case SEARCH_ITEMS_LOAD_REQUEST_FAILURE:
      return {
        isFetching: false,
        error: action.message,
      };
    default:
      return state;
  }
};

const raceEvents = (state = {}, action) => ({
  async: asyncItem(state.async, action),
  ids: itemIds(state.searchItemIds, action),
  byId: itemById(state.searchItems, action),
});

export default raceEvents;
