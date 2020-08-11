import { FetchedProject, Project, Sort, Status } from "../types";
import moment from 'moment';
import { FormReducer } from "../reducers/form";
import statuses from "../constants/statuses";

export const remapProjects = (list:FetchedProject[]):Project[] => list.map(it => ({
  ...it,
  dateCreated: moment(it.dateCreated),
  dateDue: moment(it.dateDue),
  dateUpdated: moment(it.dateUpdated),
  targetLanguages: it.targetLanguages.slice().sort().join(', '),
}));

export const remapSingleProject = (project:FetchedProject) => ({
  name: project.name,
  sourceLanguage: project.sourceLanguage,
  targetLanguages: project.targetLanguages.join(', '),
  status: statuses.find(it => it.value === project.status),
  dateCreated: project.dateCreated,
  dateDue: moment(project.dateDue),
})

const compare = (a:any, b:any) => {
  if (typeof a === 'string' && typeof b === 'string') return a.localeCompare(b);

  return a > b ? 1 : -1;
}

export const sortList = (list:Project[], sortObj:Sort) => list.slice().sort((a, b) => {
  if (!a[sortObj.key]) return -1;
  if (!b[sortObj.key]) return -1;

  return sortObj.direction === 'asc' ? compare(a[sortObj.key], b[sortObj.key]) : compare(b[sortObj.key], a[sortObj.key])
});

export const getSortDirection = (header: string, sortObj: Sort):('asc' | 'desc') => {
  if (header !== sortObj.key) return 'asc';
  return sortObj.direction === 'asc' ? 'desc' : 'asc';
}

export const filterList = (list:Project[], filterValue:string) => list.filter(project => {
  return project.name.toLowerCase().includes(filterValue.toLowerCase()) || project.status.toLowerCase().includes(filterValue.toLowerCase());
});

export const prepareDataForSubmit = (data:FormReducer) => ({
  ...data,
  targetLanguages: data.targetLanguages.split(',').map(it => it.trim()),
  status: data.status.value as Status,
  dateCreated: data.dateCreated ?? moment().toISOString(),
  dateUpdated: moment().toISOString(),
  dateDue: data.dateDue.toISOString(),
})