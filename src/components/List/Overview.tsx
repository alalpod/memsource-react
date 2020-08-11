import React from 'react';
import Paper from '@material-ui/core/Paper';

import { RootReducer } from '../../reducers';
import { shallowEqual, useSelector } from 'react-redux';
import config from '../../config';

import messages from '../../constants/messages';

const Overview = () => {
  const overview = useSelector((state: RootReducer) => state.overview, shallowEqual);

  return (
    <div className="Overview">
      <h2>Overview</h2>
      <h3>Projects</h3>
      <div>
        {config.projectStatuses.map((status) => (
          <Paper key={status} elevation={3}>
            <h4>{messages.status[status]}</h4>
            <p>{overview.projectStatusesCount[status]}</p>
          </Paper>
        ))}
      </div>
      <div>
        <Paper elevation={3}>
          <h4>Projects Overdue</h4>
          <p>{overview.overdueProjectsCount}</p>
        </Paper>
        <Paper elevation={3}>
          <h4>Most prominent language{overview.mostProminentLangs.length > 1 ? 's' : ''}</h4>
          <p>{overview.mostProminentLangs.join(', ')}</p>
        </Paper>
      </div>
    </div>
  );
};

export default Overview;
