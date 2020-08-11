import { combineReducers } from 'redux';

import list, { ListReducer } from './list';
import overview, { OverviewReducer } from './overview';
import form, { FormReducer } from './form';

export type RootReducer = {
  list: ListReducer,
  overview: OverviewReducer,
  form: FormReducer,
}

export default combineReducers({
  list,
  overview,
  form,
})