import { Moment } from 'moment';
import config from "../config";

export type Action = {
  type: string;
  payload: any;
};

export type Status = 'NEW' | 'COMPLETED' | 'DELIVERED';

type ProjectWithoutDate = {
  id: number,
  name: string,
  sourceLanguage: string,
  status: Status,
  _links?: {
    self: { href: string },
    project: { href: string },
  }
}

export type FetchedProject = ProjectWithoutDate & {
  dateCreated: string,
  dateDue: string,
  dateUpdated: string,
  targetLanguages: string[],
}

export type Project = ProjectWithoutDate & {
  dateCreated: Moment,
  dateDue: Moment,
  dateUpdated: Moment,
  targetLanguages: string,
}

export type Sort = {
  key: keyof Project,
  direction: 'asc' | 'desc',
}

export type SavedProject = {
  name: string,
  sourceLanguage: string,
  status: Status,
  dateCreated: string,
  dateDue: string,
  dateUpdated: string,
  targetLanguages: string[],
}
