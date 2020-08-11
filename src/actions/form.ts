import constants from '../constants';
import axios from 'axios';
import { remapSingleProject } from '../utils/projects';
import { SavedProject } from '../types';

export const initNewProject = () => ({
  type: constants.INIT_NEW_PROJECT,
});

export const handleFormChange = (name: string, value: any) => ({
  type: constants.HANDLE_FORM_CHANGE,
  payload: {name, value},
});

export const createNewProject = (data:SavedProject) => ({
  type: constants.PROMISE_CREATE_NEW_PROJECT,
  payload: axios.post('/projects', data),
});

export const fetchExistingProject = (id:string) => ({
  type: constants.FETCH_EXISTING_PROJECT,
  payload: axios(`/projects/${id}`).then((response) => remapSingleProject(response.data)),
});

export const editExistingProject = (data:SavedProject, id:string) => ({
  type: constants.PROMISE_EDIT_EXISTING_PROJECT,
  payload: axios.put(`/projects/${id}`, data),
});
