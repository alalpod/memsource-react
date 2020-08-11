import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Overview from './Overview';
import Table from './Table';
import Toolbar from './Toolbar';

import {fetchProjects} from '../../actions/list';
import { Paper } from '@material-ui/core';

const List = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  return (
    <div className="List-Page">
      <Overview />
      <Paper elevation={3}>
        <Toolbar />
        <Table />
      </Paper>
    </div>
  )
}

export default List;