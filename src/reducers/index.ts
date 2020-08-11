import { combineReducers } from 'redux';

import list, { ListReducer } from './list';
import overview, { OverviewReducer } from './overview';
import form, { FormReducer } from './form';
import error from './error';

export type RootReducer = {
  list: ListReducer,
  overview: OverviewReducer,
  form: FormReducer,
  error: { error: boolean },
}

export default combineReducers({
  list,
  overview,
  form,
  error,
})