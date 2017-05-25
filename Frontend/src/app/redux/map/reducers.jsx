import {
  MAP_DATA_LOAD_REQUEST,
  MAP_DATA_LOAD_REQUEST_SUCCESS,
  MAP_DATA_LOAD_REQUEST_FAILURE,
} from './consts';

const earthquakeIds = (state = [], action) => {
  switch (action.type) {
    case MAP_DATA_LOAD_REQUEST_SUCCESS:
      return action.earthquakeIds;
    default:
      return state;
  }
};

const earthquakeById = (state = {}, action) => {
  switch (action.type) {
    case MAP_DATA_LOAD_REQUEST_SUCCESS:
      return action.earthquakeById;
    default:
      return state;
  }
};

const asyncItem = (state = {
  isFetching: false,
  error: '',
}, action) => {
  switch (action.type) {
    case MAP_DATA_LOAD_REQUEST:
      return {
        isFetching: true,
        error: '',
      };
    case MAP_DATA_LOAD_REQUEST_SUCCESS:
      return {
        isFetching: false,
        error: '',
      };
    case MAP_DATA_LOAD_REQUEST_FAILURE:
      return {
        isFetching: false,
        error: action.message,
      };
    default:
      return state;
  }
};

const mapReducer = (state = {}, action) => ({
  async: asyncItem(state.async, action),
  earthquakeIds: earthquakeIds(state.earthquakeIds, action),
  earthquakeById: earthquakeById(state.earthquakeById, action),
});

export default mapReducer;
