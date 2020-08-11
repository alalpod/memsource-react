import { Action } from '../types';

const initialState = {
  error: false,
};

const reducer = (state = initialState, action:Action) => {
  if (action.type.endsWith('_ERROR')) {
    return {
      error: true,
    }
  }

  return state;
};

export default reducer;
