import {
  MAP_DATA_LOAD_DEVICES_REQUEST,
  MAP_DATA_LOAD_DEVICES_REQUEST_SUCCESS,
  MAP_DATA_LOAD_DEVICES_REQUEST_FAILURE,
  MAP_DATA_LOAD_ALL_LOCATIONS,
  MAP_DATA_LOAD_ALL_LOCATIONS_SUCCESS,
  MAP_DATA_LOAD_ALL_LOCATIONS_FAILURE,
  MAP_DATA_LOAD_ALL_ITEMS,
  MAP_DATA_LOAD_ALL_ITEMS_SUCCESS,
  MAP_DATA_LOAD_ALL_ITEMS_FAILURE,
} from './consts';

const devicesIds = (state = [], action) => {
  switch (action.type) {
    case MAP_DATA_LOAD_DEVICES_REQUEST_SUCCESS:
      return action.devicesIds;
    default:
      return state;
  }
};

const devicesById = (state = {}, action) => {
  switch (action.type) {
    case MAP_DATA_LOAD_DEVICES_REQUEST_SUCCESS:
      return action.devicesById;
    default:
      return state;
  }
};

const locationsIds = (state = [], action) => {
  switch (action.type) {
    case MAP_DATA_LOAD_ALL_LOCATIONS_SUCCESS:
      return action.locationsIds;
    default:
      return state;
  }
};

const locationsById = (state = {}, action) => {
  switch (action.type) {
    case MAP_DATA_LOAD_ALL_LOCATIONS_SUCCESS:
      return action.locationsById;
    default:
      return state;
  }
};

const itemIds = (state = [], action) => {
  console.log(action);
  switch (action.type) {
    case MAP_DATA_LOAD_ALL_ITEMS_SUCCESS:
      return action.itemsIds;
    default:
      return state;
  }
};

const itemById = (state = {}, action) => {
  switch (action.type) {
    case MAP_DATA_LOAD_ALL_ITEMS_SUCCESS:
      return action.itemsById;
    default:
      return state;
  }
};

const asyncItem = (state = {
  isFetching: false,
  error: '',
}, action) => {
  switch (action.type) {
    case MAP_DATA_LOAD_DEVICES_REQUEST:
    case MAP_DATA_LOAD_ALL_LOCATIONS:
    case MAP_DATA_LOAD_ALL_ITEMS:
      return {
        isFetching: true,
        error: '',
      };
    case MAP_DATA_LOAD_DEVICES_REQUEST_SUCCESS:
    case MAP_DATA_LOAD_ALL_LOCATIONS_SUCCESS:
    case MAP_DATA_LOAD_ALL_ITEMS_SUCCESS:
      return {
        isFetching: false,
        error: '',
      };
    case MAP_DATA_LOAD_DEVICES_REQUEST_FAILURE:
    case MAP_DATA_LOAD_ALL_LOCATIONS_FAILURE:
    case MAP_DATA_LOAD_ALL_ITEMS_FAILURE:
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
  devicesIds: devicesIds(state.devicesIds, action),
  devicesById: devicesById(state.devicesById, action),
  locationsIds: locationsIds(state.locationsIds, action),
  locationsById: locationsById(state.locationsById, action),
  itemIds: itemIds(state.itemIds, action),
  itemById: itemById(state.itemById, action),
});

export default mapReducer;
