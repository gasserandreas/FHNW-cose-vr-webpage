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
    searchItemsObject[item.ItemId] = item;
    searchItemIds.push(item.ItemId);
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
  const url = `${getBaseURL()}/searchitems`;
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

/*
const requestLoadingRaceEvents = () => ({
  type: consts.RACE_EVENTS_LOAD_REQUEST,
  raceEvents: [],
});

const successLoadingRaceEvents = (raceEvents) => {
  const raceEventsObject = {};
  const raceEventIds = [];
  raceEvents.forEach((raceEvent) => {
    raceEventsObject[raceEvent.id] = raceEvent;
    raceEventIds.push(raceEvent.id);
  });

  return ({
    type: consts.RACE_EVENTS_LOAD_SUCCESS,
    raceEvents: raceEventsObject,
    raceEventIds,
  });
};

const errorLoadingRaceEvents = message => ({
  type: consts.RACE_EVENTS_LOAD_FAILURE,
  message,
});

const requestCreateRaceEvent = raceEvent => ({
  type: consts.RACE_EVENT_CREATE_REQUEST,
  raceEvent,
});

const successCreateRaceEvent = raceEvent => ({
  type: consts.RACE_EVENT_CREATE_SUCCESS,
  raceEvent,
});

const errorCreateRaceEvent = message => ({
  type: consts.RACE_EVENT_CREATE_FAILURE,
  message,
});

const requestUpdateRaceEvent = raceEvent => ({
  type: consts.RACE_EVENT_UPDATE_REQUEST,
  raceEvent,
});

const successUpdateRaceEvent = raceEvent => ({
  type: consts.RACE_EVENT_UPDATE_SUCCESS,
  raceEvent,
});

const errorUpdateRaceEvent = message => ({
  type: consts.RACE_EVENT_UPDATE_FAILURE,
  message,
});

const requestDeleteRaceEvent = raceEvent => ({
  type: consts.RACE_EVENT_DELETE_REQUEST,
  raceEvent,
});

const successDeleteRaceEvent = idRaceEvent => ({
  type: consts.RACE_EVENT_DELETE_SUCCESS,
  idRaceEvent,
});

const errorDeleteRaceEvent = message => ({
  type: consts.RACE_EVENT_DELETE_FAILURE,
  message,
});

const openStep = (idRaceEvent, step) => ({
  type: consts.RACE_EVENT_OPEN_STEP,
  idRaceEvent,
  step,
});

const closeStep = (idRaceEvent, step) => ({
  type: consts.RACE_EVENT_CLOSE_STEP,
  idRaceEvent,
  step,
});

const resetAllSteps = () => ({
  type: consts.RACE_EVENT_RESET_ALL_STEP,
});

const currentCreatingRaceEvent = raceEvent => ({
  type: consts.RACE_EVENT_CURRENT,
  raceEvent,
});

const clearCurrentCreatingRaceEvent = () => ({
  type: consts.RACE_EVENT_CLEAR_CURRENT,
});

const addRunToCurrentRaceEvent = run => ({
  type: consts.RACE_EVENT_ADD_RUN_TO_CURRENT_RACE_EVENT,
  run,
});

const updateRunInCurrentRaceEvent = (index, run) => ({
  type: consts.RACE_EVENT_UPDATE_RUN_IN_CURRENT,
  index,
  run,
});

const removeRunFromCurrentRaceEvent = index => ({
  type: consts.RACE_EVENT_REMOVE_RUN_FROM_CURRENT,
  index,
});

const loadRaceEvents = (isOrganizer) => {
  const config = {
    method: 'get',
    baseURL: process.env.BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getJwtToken()}`,
    },
  };
  return (dispatch) => {
    dispatch(requestLoadingRaceEvents());

    axios(`${getBaseURL()}/raceevent${isOrganizer ? '/organizer' : ''}`, config)
      .then((response) => {
        if (response.status !== 200) {
          dispatch(errorLoadingRaceEvents(response.data));
          return Promise.reject(response.data);
        }

        return dispatch(successLoadingRaceEvents(response.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(errorLoadingRaceEvents(error));
      });
  };
};

const createRaceEvent = (raceEvent) => {
  const config = {
    method: 'post',
    baseURL: process.env.BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getJwtToken()}`,
    },
    data: raceEvent,
  };
  return (dispatch) => {
    dispatch(requestCreateRaceEvent(raceEvent));

    return axios(`${getBaseURL()}/raceevent`, config)
      .then((response) => {
        if (response.status !== 200) {
          dispatch(errorCreateRaceEvent(response.data));
          return Promise.reject(response.data);
        }

        dispatch(closeStep(response.data.id, 1));
        dispatch(openStep(response.data.id, 2));
        dispatch(currentCreatingRaceEvent(response.data));
        return dispatch(successCreateRaceEvent(response.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(errorCreateRaceEvent(error));
      });
  };
};

const updateRaceEvent = (raceEvent, step) => {
  const config = {
    method: 'put',
    baseURL: process.env.BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getJwtToken()}`,
    },
    data: raceEvent,
  };
  return (dispatch) => {
    dispatch(requestUpdateRaceEvent(raceEvent));

    return axios(`${getBaseURL()}/raceevent`, config)
      .then((response) => {
        if (response.status !== 200) {
          dispatch(errorUpdateRaceEvent(response.data));
          return Promise.reject(response.data);
        }

        // check for other steps to open
        if (step === 2 && (response.data.runs.filter(run => run.clients.length === 0).length > 0)) {
          dispatch(openStep(raceEvent.id, 3));
        }
        if (step === 3 && (false)) dispatch(openStep(raceEvent.id, 4)); // ToDo
        if (step === 4 && (false)) dispatch(openStep(raceEvent.id, 5)); // ToDo

        dispatch(closeStep(response.data.id, step));
        return dispatch(successUpdateRaceEvent(response.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(errorUpdateRaceEvent(error));
      });
  };
};

const deleteRaceEvent = (raceEvent) => {
  const config = {
    method: 'delete',
    baseURL: process.env.BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getJwtToken()}`,
    },
    data: raceEvent,
  };
  return (dispatch) => {
    dispatch(requestDeleteRaceEvent(raceEvent));

    return axios(`${getBaseURL()}/raceevent`, config)
      .then((response) => {
        if (response.status !== 200) {
          dispatch(errorDeleteRaceEvent(response.data));
          return Promise.reject(response.data);
        }

        console.log(response.data);
        return dispatch(successDeleteRaceEvent(response.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(errorDeleteRaceEvent(error));
      });
  };
};

export {
  loadRaceEvents,
  createRaceEvent,
  updateRaceEvent,
  deleteRaceEvent,
  openStep,
  closeStep,
  resetAllSteps,
  currentCreatingRaceEvent,
  clearCurrentCreatingRaceEvent,
  addRunToCurrentRaceEvent,
  updateRunInCurrentRaceEvent,
  removeRunFromCurrentRaceEvent,
};
*/
