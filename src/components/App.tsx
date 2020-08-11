import React from 'react';
import Alert from '@material-ui/lab/Alert';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import List from './List/List';
import Form from './Edit/Form';

import './App.scss';
import { useSelector } from 'react-redux';
import { RootReducer } from '../reducers';

const App = () => {
  const error = useSelector((state:RootReducer) => state.error.error);

  return (
    <React.Fragment>
      { error && <Alert severity="error">Error occurred, please try reload page.</Alert> }
      <Router>
        <Switch>
          <Route exact path="/" component={List} />
          <Route path="/new" component={Form} />
          <Route path="/edit/:id" render={({ match }) => <Form id={match.params.id} />} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
