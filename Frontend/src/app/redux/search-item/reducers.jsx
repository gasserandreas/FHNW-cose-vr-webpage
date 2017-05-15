import {
  SEARCH_ITEMS_LOAD_REQUEST,
  SEARCH_ITEMS_LOAD_REQUEST_SUCCESS,
  SEARCH_ITEMS_LOAD_REQUEST_FAILURE,
} from './consts';

/*
const runsComparator = (a, b) => {
  if (a.dateFrom > b.dateFrom) return 1;
  else if (a.dateFrom < b.dateFrom) return -1;
  return 0;
};

const raceEvent = (state = {}, action) => {
  switch (action.type) {
    case consts.RACE_EVENT_CREATE_SUCCESS:
      return ({ [action.raceEvent.id]: action.raceEvent });
    case consts.RACE_EVENT_UPDATE_SUCCESS:
      return ({ ...state, [action.raceEvent.id]: action.raceEvent });
    default:
      return state;
  }
};

const raceEventById = (state = {}, action) => {
  switch (action.type) {
    case consts.RACE_EVENTS_LOAD_SUCCESS:
      return action.raceEvents;
    case consts.RACE_EVENT_CREATE_SUCCESS:
      return { ...state, ...raceEvent(undefined, action) };
    case consts.RACE_EVENT_UPDATE_SUCCESS:
      return { ...state, ...raceEvent(state[action.raceEvent.id], action) };
    case consts.RACE_EVENT_DELETE_SUCCESS: {
      const newState = { ...state };
      delete newState[action.idRaceEvent];
      return newState;
    }
    default:
      return state;
  }
};

const raceEventIds = (state = [], action) => {
  switch (action.type) {
    case consts.RACE_EVENTS_LOAD_SUCCESS:
      return action.raceEventIds;
    case consts.RACE_EVENT_CREATE_SUCCESS:
      return [...state, action.raceEvent.id];
    case consts.RACE_EVENT_DELETE_SUCCESS:
      return state.filter(id => id !== action.raceEvent.id);
    default:
      return state;
  }
};

const asyncRaceEvents = (state = {
  isFetching: false,
  error: '',
}, action) => {
  switch (action.type) {
    case consts.RACE_EVENTS_LOAD_REQUEST:
    case consts.RACE_EVENT_CREATE_REQUEST:
    case consts.RACE_EVENT_UPDATE_REQUEST:
    case consts.RACE_EVENT_DELETE_REQUEST:
      return {
        isFetching: true,
        error: '',
      };
    case consts.RACE_EVENTS_LOAD_SUCCESS:
    case consts.RACE_EVENT_CREATE_SUCCESS:
    case consts.RACE_EVENT_UPDATE_SUCCESS:
    case consts.RACE_EVENT_DELETE_SUCCESS:
      return {
        isFetching: false,
        error: '',
      };
    case consts.RACE_EVENTS_LOAD_FAILURE:
    case consts.RACE_EVENT_CREATE_FAILURE:
    case consts.RACE_EVENT_UPDATE_FAILURE:
    case consts.RACE_EVENT_DELETE_FAILURE:
      return {
        isFetching: false,
        error: action.message,
      };
    default:
      return state;
  }
};

const raceEventStepHandling = (state = {}, action) => {
  switch (action.type) {
    case consts.RACE_EVENT_OPEN_STEP:
      return { ...state, [action.idRaceEvent]: [...state[action.idRaceEvent] || [], action.step] };
    case consts.RACE_EVENT_CLOSE_STEP: {
      const openSteps = state[action.idRaceEvent];
      return !openSteps
        ? state
        : {
          ...state,
          [action.idRaceEvent]: [...openSteps.filter(id => id !== action.step)],
        };
    }
    case consts.RACE_EVENT_RESET_ALL_STEP:
      return {};
    default:
      return state;
  }
};

const raceEventCurrentHandling = (state = {}, action) => {
  switch (action.type) {
    case consts.RACE_EVENT_CURRENT:
      return { ...action.raceEvent };
    case consts.RACE_EVENT_CLEAR_CURRENT:
      return {};
    case consts.RACE_EVENT_ADD_RUN_TO_CURRENT_RACE_EVENT:
      return { ...state, runs: [...state.runs, action.run].sort(runsComparator) };
    case consts.RACE_EVENT_UPDATE_RUN_IN_CURRENT: {
      const newRuns = [...state.runs];
      newRuns[action.index] = action.run;
      return { ...state, runs: newRuns.sort(runsComparator) };
    }
    case consts.RACE_EVENT_REMOVE_RUN_FROM_CURRENT: {
      const newRuns = [...state.runs];
      newRuns.splice(action.index);
      return { ...state, runs: newRuns };
    }
    default:
      return state;
  }
};
*/

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
