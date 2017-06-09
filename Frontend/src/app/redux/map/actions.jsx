import axios from 'axios';

import { getBaseURL } from '../../utils/requestUtils';
import {
  MAP_DATA_LOAD_REQUEST,
  MAP_DATA_LOAD_REQUEST_SUCCESS,
  MAP_DATA_LOAD_REQUEST_FAILURE,
  MAP_DATA_LOAD_ALL_LOCATIONS,
  MAP_DATA_LOAD_ALL_LOCATIONS_SUCCESS,
  MAP_DATA_LOAD_ALL_LOCATIONS_FAILURE,
} from './consts';



import earthquake from '../../../../assets/data/earthquake.json';

// simple actions
const mapDataRequest = () => ({
  type: MAP_DATA_LOAD_REQUEST,
  earthquake: {},
});

const mapDataRequestSuccess = (earthquake) => {
  const earthquakeObject = {};
  const earthquakeIds = [];

  earthquake.forEach((item, i) => {
    const id = i + 1;
    earthquakeObject[id] = { ...item, id };
    earthquakeIds.push(id);
  });

  return ({
    type: MAP_DATA_LOAD_REQUEST_SUCCESS,
    earthquakeById: earthquakeObject,
    earthquakeIds,
  });
};

const mapDataRequestFailure = () => ({
  type: MAP_DATA_LOAD_REQUEST_FAILURE,
  earthquake: {},
});

const mapDataLoadAllLocations= () => ({
  type: MAP_DATA_LOAD_ALL_LOCATIONS,
  locations: [],
});

const mapDataLoadAllLocationsSuccess = (locations) => {
  const locationsObject = {};
  const locationsIds = [];

  locations.forEach((location) => {
    const { id } = location;
    locationsObject[id] = { ...location };
    locationsIds.push(id);
  });

  return ({
    type: MAP_DATA_LOAD_ALL_LOCATIONS_SUCCESS,
    locationsById: locationsObject,
    locationsIds,
  });
};

const mapDataLoadAllLocationsFailure = () => ({
  type: MAP_DATA_LOAD_ALL_LOCATIONS_FAILURE,
  locations: {},
});

// complex actions
const loadMapData = () => {
  return (dispatch) => {
    dispatch(mapDataRequest());
    dispatch(mapDataRequestSuccess(earthquake));
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

export {
  loadMapData,
  loadMapLocations,
}
