import { Action, Project, Sort } from "../types";
import constants from "../constants";
import { getSortDirection, sortList, filterList } from '../utils/projects';

export type ListReducer = {
  originalList: Project[],
  filteredList: Project[],
  sort: Sort,
  filter: string,
};

const initialState:ListReducer = {
  originalList: [],
  filteredList: [],
  sort: {
    key: 'dateCreated',
    direction: 'desc',
  },
  filter: '',
}

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case constants.FETCH_PROJECTS_SUCCESS: {
      return {
        ...state,
        originalList: action.payload,
        filteredList: sortList(filterList(action.payload, state.filter), state.sort),
      }
    }

    case constants.HANDLE_SORT_CHANGE: {
      const header:keyof Project = action.payload;
      const sortObj = {
        key: header,
        direction: getSortDirection(header, state.sort),
      }

      return {
        ...state,
        sort: sortObj,
        filteredList: sortList(state.filteredList, sortObj),
      }
    }

    case constants.HANDLE_FILTER_CHANGE: {
      const filterValue:string = action.payload;

      return {
        ...state,
        filteredList: filterList(state.originalList, filterValue),
        filter: filterValue,
      }
    }

    default: {
      return state;
    }
  }
}

export default reducer;