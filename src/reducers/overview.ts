import { Action } from '../types';
import constants from '../constants';

import { getProjectCountsByStatuses, getOverdueProjectsCount, getMostProminentLang } from '../utils/overview';

import { Status } from '../types';

export type OverviewReducer = {
  projectStatusesCount: Record<Status, number>,
  overdueProjectsCount: number,
  mostProminentLangs: string[],
}

const initialState = {
  projectStatusesCount: {
    NOT_STARTED: 0,
    IN_PROGRESS: 0,
    DELIVERED: 0,
  },
  overdueProjectsCount: 0,
  mostProminentLangs: [],
}

const reducer = (state = initialState, action:Action) => {
  switch (action.type) {
    case constants.FETCH_PROJECTS_SUCCESS: {
      return {
        ...state,
        projectStatusesCount: getProjectCountsByStatuses(action.payload),
        overdueProjectsCount: getOverdueProjectsCount(action.payload),
        mostProminentLangs: getMostProminentLang(action.payload),
      }
    }

    default: {
      return state;
    }
  }
}

export default reducer;
