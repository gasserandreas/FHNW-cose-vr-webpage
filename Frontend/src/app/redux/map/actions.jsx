import axios from 'axios';

import { getBaseURL } from '../../utils/requestUtils';
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

// simple actions
const mapLoadDevicesRequest = () => ({
  type: MAP_DATA_LOAD_DEVICES_REQUEST,
});

const mapLoadDevicesRequestSuccess = (devices) => {
  const devicesObject = {};
  const devicesIds = [];

  devices.forEach((device) => {
    const { id } = device;
    devicesObject[id] = { ...device, id };
    devicesIds.push(id);
  });

  return ({
    type: MAP_DATA_LOAD_DEVICES_REQUEST_SUCCESS,
    devicesById: devicesObject,
    devicesIds,
  });
};

const mapLoadDevicesRequestFailure = (message) => ({
  type: MAP_DATA_LOAD_DEVICES_REQUEST_FAILURE,
  message,
});

const mapDataLoadAllLocations= () => ({
  type: MAP_DATA_LOAD_ALL_LOCATIONS,
});

const mapDataLoadAllLocationsSuccess = (locations) => {
  const locationsObject = {};
  const locationsIds = [];

  locations.forEach((location, i) => {
    const id = i;
    locationsObject[id] = { ...location, id };
    locationsIds.push(id);
  });

  return ({
    type: MAP_DATA_LOAD_ALL_LOCATIONS_SUCCESS,
    locationsById: locationsObject,
    locationsIds,
  });
};

const mapDataLoadAllLocationsFailure = (message) => ({
  type: MAP_DATA_LOAD_ALL_LOCATIONS_FAILURE,
  message
});

const mapLoadAllItemsRequest = () => ({
  type: MAP_DATA_LOAD_ALL_ITEMS,
});

const mapLoadAllItemsRequestSuccess = (items) => {
  const itemsObject = {};
  const itemsIds = [];

  items.forEach((item) => {
    const { id } = item;
    itemsObject[id] = { ...item, id };
    itemsIds.push(id);
  });

  return ({
    type: MAP_DATA_LOAD_ALL_ITEMS_SUCCESS,
    itemsById: itemsObject,
    itemsIds,
  });
};

const mapLoadAllItemsRequestFailure = (message) => ({
  type: MAP_DATA_LOAD_ALL_ITEMS_FAILURE,
  message,
});

// complex actions
const loadDevices = () => {
  const config = {
    method: 'get',
    baseURL: process.env.BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const url = `${getBaseURL()}/device`;
  return (dispatch) => {
    dispatch(mapLoadDevicesRequest());

    axios(url, config)
      .then((response) => {
        if (response.status !== 200) {
          dispatch(mapLoadDevicesRequestFailure(response.data));
          return Promise.reject(response.data);
        }

        return dispatch(mapLoadDevicesRequestSuccess(response.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(mapLoadDevicesRequestFailure(error));
      });
  };
};

const loadMapLocations = () => {
  const config = {
    method: 'get',
    baseURL: process.env.BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const url = `${getBaseURL()}/locations`;
  return (dispatch) => {
    dispatch(mapDataLoadAllLocations());

    axios(url, config)
      .then((response) => {
        if (response.status !== 200) {
          dispatch(mapDataLoadAllLocationsFailure(response.data));
          return Promise.reject(response.data);
        }

        return dispatch(mapDataLoadAllLocationsSuccess(response.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(mapDataLoadAllLocationsFailure(error));
      });
  };
};

const loadItems = () => {
  const config = {
    method: 'get',
    baseURL: process.env.BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const url = `${getBaseURL()}/items`;
  return (dispatch) => {
    dispatch(mapLoadAllItemsRequest());

    axios(url, config)
      .then((response) => {
        if (response.status !== 200) {
          dispatch(mapLoadAllItemsRequestFailure(response.data));
          return Promise.reject(response.data);
        }

        return dispatch(mapLoadAllItemsRequestSuccess(response.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(mapLoadAllItemsRequestFailure(error));
      });
  };
};

export {
  loadItems,
  loadDevices,
  loadMapLocations,
}
