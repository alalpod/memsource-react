import { Action } from '../types';
import constants from '../constants';
import statuses from '../constants/statuses';
import moment, { Moment } from 'moment';

export type FormReducer = {
  name: string,
  sourceLanguage: string,
  targetLanguages: string,
  status: {[key: string]: string},
  dateCreated?: string,
  dateDue: Moment,
}

const initialState:FormReducer = {
  name: '',
  sourceLanguage: '',
  targetLanguages: '',
  status: statuses[0],
  dateDue: moment().add(14, 'days'),
}

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case constants.INIT_NEW_PROJECT: {
      return initialState;
    }

    case constants.HANDLE_FORM_CHANGE: {
      const { name, value } = action.payload;

      return {
        ...state,
        [name]: value,
      }
    }

    case constants.FETCH_EXISTING_PROJECT_SUCCESS: {
      
      return {
        ...action.payload,
      }
    }


    default: {
      return state;
    }
  }
}

export default reducer;