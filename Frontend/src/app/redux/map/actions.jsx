import {
  MAP_DATA_LOAD_REQUEST,
  MAP_DATA_LOAD_REQUEST_SUCCESS,
  MAP_DATA_LOAD_REQUEST_FAILURE,
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

// complex actions
const loadMapData = () => {
  return (dispatch) => {
    dispatch(mapDataRequest());
    dispatch(mapDataRequestSuccess(earthquake));
  };
};

export {
  loadMapData,
}
