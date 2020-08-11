import axios from 'axios';
import constants from '../constants';

import { remapProjects } from '../utils/projects';
import { Project } from '../types';

export const fetchProjects = () => ({
  type: constants.FETCH_PROJECTS,
  payload: axios('/projects').then(response => remapProjects(response.data?._embedded?.projects || [])),
});

export const handleSortChange = (header: keyof Project) => ({
  type: constants.HANDLE_SORT_CHANGE,
  payload: header,
})

export const handleFilterChange = (value: string) => ({
  type: constants.HANDLE_FILTER_CHANGE,
  payload: value,
})