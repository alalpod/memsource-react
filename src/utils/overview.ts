import config from '../config';
import { Project } from '../types';
import moment from 'moment';

export const getProjectCountsByStatuses = (list:Project[]) => config.projectStatuses.reduce((acc, status) => ({
  ...acc,
  [status]: list.filter((it) => it.status === status).length,
}), {});

export const getOverdueProjectsCount = (list:Project[]) => {
  const currentDate = moment(); // get current date only once to increase perfomance with big lists

  return list.reduce((sum, project) => {
    return project.status !== 'DELIVERED' && project.dateDue < currentDate ? sum + 1 : sum;
  }, 0);
};

export const getMostProminentLang = (list:Project[]) => {
  const langsCount = list.reduce((acc:{[key:string]: number}, project) => ({
    ...acc,
    [project.sourceLanguage]: (acc[project.sourceLanguage] || 0) + 1,
  }), {});

  const maxOccurrences = Math.max(...Object.values(langsCount));

  return Object.keys(langsCount).filter(it => langsCount[it] === maxOccurrences);
}


